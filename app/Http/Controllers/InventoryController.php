<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Product;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    public function index(Request $request)
    {
        $inventories = Inventory::with(['product', 'warehouse'])
            ->when($request->warehouse_id, function ($query) use ($request) {
                $query->where('warehouse_id', $request->warehouse_id);
            })
            ->when($request->search, function ($query) use ($request) {
                $query->whereHas('product', function ($q) use ($request) {
                    $q->where('name', 'like', "%{$request->search}%")
                        ->orWhere('sku', 'like', "%{$request->search}%");
                });
            })
            ->orderBy('quantity', 'asc')
            ->paginate(15);

        $lowStockCount = Inventory::whereRaw('quantity <= min_stock_level')->count();

        return Inertia::render('Inventory/Index', [
            'inventories' => $inventories,
            'warehouses' => Warehouse::all(),
            'lowStockCount' => $lowStockCount,
            'filters' => $request->only(['search', 'warehouse_id']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Inventory/Create', [
            'products' => Product::all(),
            'warehouses' => Warehouse::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'warehouse_id' => 'required|exists:warehouses,id',
            'quantity' => 'required|integer|min:0',
            'min_stock_level' => 'required|integer|min:0',
        ]);

        $existing = Inventory::where('product_id', $validated['product_id'])
            ->where('warehouse_id', $validated['warehouse_id'])
            ->first();

        if ($existing) {
            return back()->withErrors(['message' => 'Inventory record already exists for this product and warehouse.']);
        }

        Inventory::create($validated);

        return redirect()->route('inventory.index')->with('success', 'Inventory record created successfully.');
    }

    public function edit(Inventory $inventory)
    {
        return Inertia::render('Inventory/Edit', [
            'inventory' => $inventory->load(['product', 'warehouse']),
            'products' => Product::all(),
            'warehouses' => Warehouse::all(),
        ]);
    }

    public function update(Request $request, Inventory $inventory)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:0',
            'min_stock_level' => 'required|integer|min:0',
        ]);

        $inventory->update($validated);

        return redirect()->route('inventory.index')->with('success', 'Inventory updated successfully.');
    }

    public function destroy(Inventory $inventory)
    {
        $inventory->delete();

        return redirect()->route('inventory.index')->with('success', 'Inventory record deleted successfully.');
    }
}