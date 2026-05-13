<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Product;
use App\Models\StockMovement;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockMovementController extends Controller
{
    public function index(Request $request)
    {
        $movements = StockMovement::with(['product', 'warehouse'])
            ->when($request->movement_type, function ($query) use ($request) {
                $query->where('movement_type', $request->movement_type);
            })
            ->when($request->product_id, function ($query) use ($request) {
                $query->where('product_id', $request->product_id);
            })
            ->when($request->warehouse_id, function ($query) use ($request) {
                $query->where('warehouse_id', $request->warehouse_id);
            })
            ->when($request->date_from, function ($query) use ($request) {
                $query->whereDate('created_at', '>=', $request->date_from);
            })
            ->when($request->date_to, function ($query) use ($request) {
                $query->whereDate('created_at', '<=', $request->date_to);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('StockMovements/Index', [
            'movements' => $movements,
            'products' => Product::all(),
            'warehouses' => Warehouse::all(),
            'filters' => $request->only(['movement_type', 'product_id', 'warehouse_id', 'date_from', 'date_to']),
        ]);
    }

    public function adjust(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'warehouse_id' => 'required|exists:warehouses,id',
            'quantity' => 'required|integer|min:1',
            'type' => 'required|in:add,remove',
            'notes' => 'nullable|string',
        ]);

        $inventory = Inventory::where('product_id', $validated['product_id'])
            ->where('warehouse_id', $validated['warehouse_id'])
            ->first();

        if (!$inventory) {
            return back()->withErrors(['message' => 'No inventory record found for this product and warehouse.']);
        }

        if ($validated['type'] === 'remove' && $inventory->quantity < $validated['quantity']) {
            return back()->withErrors(['message' => 'Insufficient stock available.']);
        }

        $quantity = $validated['type'] === 'add' ? $validated['quantity'] : -$validated['quantity'];

        StockMovement::create([
            'product_id' => $validated['product_id'],
            'warehouse_id' => $validated['warehouse_id'],
            'movement_type' => StockMovement::TYPE_ADJUSTMENT,
            'quantity' => abs($validated['quantity']),
            'notes' => ($validated['type'] === 'add' ? 'Added: ' : 'Removed: ') . ($validated['notes'] ?? 'Stock adjustment'),
        ]);

        $inventory->quantity += $quantity;
        $inventory->save();

        return redirect()->route('stock-movements.index')->with('success', 'Stock adjusted successfully.');
    }

    public function getAdjustForm()
    {
        return Inertia::render('StockMovements/Adjust', [
            'products' => Product::all(),
            'warehouses' => Warehouse::all(),
        ]);
    }
}