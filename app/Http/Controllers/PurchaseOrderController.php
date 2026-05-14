<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Product;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderItem;
use App\Models\StockMovement;
use App\Models\Supplier;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseOrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = PurchaseOrder::with(['supplier', 'items'])
            ->when($request->status, function ($query) use ($request) {
                $query->where('status', $request->status);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('PurchaseOrders/Index', [
            'orders' => $orders,
            'filters' => $request->only(['status']),
        ]);
    }

    public function create()
    {
        return Inertia::render('PurchaseOrders/Create', [
            'suppliers' => Supplier::all(),
            'products' => Product::all(),
            'warehouses' => Warehouse::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'order_date' => 'required|date',
            'expected_delivery' => 'nullable|date',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
        ]);

        $order = PurchaseOrder::create([
            'supplier_id' => $validated['supplier_id'],
            'order_date' => $validated['order_date'],
            'expected_delivery' => $validated['expected_delivery'] ?? null,
            'status' => PurchaseOrder::STATUS_PENDING,
            'notes' => $validated['notes'] ?? null,
        ]);

        foreach ($validated['items'] as $item) {
            $order->items()->create([
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'received_quantity' => 0,
            ]);
        }

        return redirect()->route('purchase-orders.index')->with('success', 'Purchase order created successfully.');
    }

    public function show(PurchaseOrder $purchaseOrder)
    {
        $purchaseOrder->load(['supplier', 'items.product']);

        return Inertia::render('PurchaseOrders/Show', [
            'order' => $purchaseOrder,
            'warehouses' => Warehouse::all(),
        ]);
    }

    public function edit(PurchaseOrder $purchaseOrder)
    {
        $purchaseOrder->load(['supplier', 'items']);

        return Inertia::render('PurchaseOrders/Edit', [
            'order' => $purchaseOrder,
            'suppliers' => Supplier::all(),
            'products' => Product::all(),
        ]);
    }

    public function update(Request $request, PurchaseOrder $purchaseOrder)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'order_date' => 'required|date',
            'expected_delivery' => 'nullable|date',
            'status' => 'required|in:pending,ordered,received,cancelled',
            'notes' => 'nullable|string',
            'items' => 'nullable|array',
            'items.*.id' => 'nullable|exists:purchase_order_items,id',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*._destroy' => 'nullable|boolean',
        ]);

        $purchaseOrder->update([
            'supplier_id' => $validated['supplier_id'],
            'order_date' => $validated['order_date'],
            'expected_delivery' => $validated['expected_delivery'] ?? null,
            'status' => $validated['status'],
            'notes' => $validated['notes'] ?? null,
        ]);

        // Handle items if provided
        if (isset($validated['items'])) {
            $existingItemIds = $purchaseOrder->items()->pluck('id')->toArray();
            $submittedItemIds = [];

            foreach ($validated['items'] as $itemData) {
                if (isset($itemData['_destroy']) && $itemData['_destroy']) {
                    // Delete item if marked for destruction
                    if (!empty($itemData['id'])) {
                        PurchaseOrderItem::where('id', $itemData['id'])
                            ->where('purchase_order_id', $purchaseOrder->id)
                            ->delete();
                    }
                    continue;
                }

                $itemId = $itemData['id'] ?? null;
                $submittedItemIds[] = $itemId;

                $itemPayload = [
                    'product_id' => $itemData['product_id'],
                    'quantity' => $itemData['quantity'],
                    'unit_price' => $itemData['unit_price'],
                ];

                if ($itemId && in_array($itemId, $existingItemIds)) {
                    // Update existing item
                    PurchaseOrderItem::where('id', $itemId)
                        ->where('purchase_order_id', $purchaseOrder->id)
                        ->update($itemPayload);
                } else {
                    // Create new item
                    $purchaseOrder->items()->create($itemPayload);
                }
            }
        }

        return redirect()->route('purchase-orders.index')->with('success', 'Purchase order updated successfully.');
    }

    public function destroy(PurchaseOrder $purchaseOrder)
    {
        if ($purchaseOrder->status !== PurchaseOrder::STATUS_PENDING) {
            return back()->withErrors(['message' => 'Only pending purchase orders can be deleted.']);
        }

        $purchaseOrder->delete();

        return redirect()->route('purchase-orders.index')->with('success', 'Purchase order deleted successfully.');
    }

    public function receive(Request $request, PurchaseOrder $purchaseOrder)
    {
        $validated = $request->validate([
            'warehouse_id' => 'required|exists:warehouses,id',
        ]);

        $warehouseId = $validated['warehouse_id'];
        $receivedItems = $request->input('items', []);

        foreach ($purchaseOrder->items as $item) {
            $receiveQty = $receivedItems[$item->id] ?? 0;
            $receiveQty = min($receiveQty, $item->quantity - $item->received_quantity);

            if ($receiveQty > 0) {
                $item->received_quantity += $receiveQty;
                $item->save();

                $inventory = Inventory::firstOrNew([
                    'product_id' => $item->product_id,
                    'warehouse_id' => $warehouseId,
                ]);

                $inventory->quantity = ($inventory->quantity ?? 0) + $receiveQty;
                $inventory->save();

                StockMovement::create([
                    'product_id' => $item->product_id,
                    'warehouse_id' => $warehouseId,
                    'movement_type' => StockMovement::TYPE_PURCHASE,
                    'quantity' => $receiveQty,
                    'reference_type' => PurchaseOrder::class,
                    'reference_id' => $purchaseOrder->id,
                    'notes' => 'Received from PO #' . $purchaseOrder->id,
                ]);
            }
        }

        $purchaseOrder->refresh();
        if ($purchaseOrder->items->every(fn($i) => $i->received_quantity >= $i->quantity)) {
            $purchaseOrder->update(['status' => PurchaseOrder::STATUS_RECEIVED]);
        } elseif ($purchaseOrder->items->some(fn($i) => $i->received_quantity > 0)) {
            $purchaseOrder->update(['status' => PurchaseOrder::STATUS_ORDERED]);
        }

        return redirect()->route('purchase-orders.index')->with('success', 'Items received successfully.');
    }
}