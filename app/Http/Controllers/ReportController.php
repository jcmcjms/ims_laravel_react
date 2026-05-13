<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Product;
use App\Models\Warehouse;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Inventory Valuation Report
     * Returns all inventory with product info, quantity, cost price, total value (sum)
     */
    public function inventoryValuation(Request $request)
    {
        $inventories = Inventory::with(['product', 'warehouse'])
            ->where('quantity', '>', 0)
            ->orderBy('warehouse_id')
            ->orderBy('product_id')
            ->get()
            ->map(function ($inventory) {
                $costPrice = $inventory->product ? $inventory->product->cost_price : 0;
                return [
                    'id' => $inventory->id,
                    'product_name' => $inventory->product ? $inventory->product->name : 'N/A',
                    'product_sku' => $inventory->product ? $inventory->product->sku : 'N/A',
                    'warehouse_name' => $inventory->warehouse ? $inventory->warehouse->name : 'N/A',
                    'quantity' => $inventory->quantity,
                    'cost_price' => $costPrice,
                    'total_value' => $inventory->quantity * $costPrice,
                ];
            });

        $grandTotal = $inventories->sum('total_value');

        return Inertia::render('Reports/InventoryValuation', [
            'inventories' => $inventories,
            'grandTotal' => $grandTotal,
            'warehouses' => Warehouse::all(),
            'filters' => $request->only(['warehouse_id']),
        ]);
    }

    /**
     * Low Stock Report
     * Returns all inventory where quantity <= min_stock_level, filter by warehouse
     */
    public function lowStock(Request $request)
    {
        $inventories = Inventory::with(['product', 'warehouse'])
            ->whereRaw('quantity <= min_stock_level')
            ->when($request->warehouse_id, function ($query) use ($request) {
                $query->where('warehouse_id', $request->warehouse_id);
            })
            ->orderBy('warehouse_id')
            ->orderBy('quantity', 'asc')
            ->get()
            ->map(function ($inventory) {
                $deficit = $inventory->min_stock_level - $inventory->quantity;
                return [
                    'id' => $inventory->id,
                    'product_name' => $inventory->product ? $inventory->product->name : 'N/A',
                    'product_sku' => $inventory->product ? $inventory->product->sku : 'N/A',
                    'warehouse_name' => $inventory->warehouse ? $inventory->warehouse->name : 'N/A',
                    'current_quantity' => $inventory->quantity,
                    'min_stock_level' => $inventory->min_stock_level,
                    'deficit' => $deficit,
                ];
            });

        return Inertia::render('Reports/LowStock', [
            'inventories' => $inventories,
            'warehouses' => Warehouse::all(),
            'filters' => $request->only(['warehouse_id']),
        ]);
    }

    /**
     * Stock Movements Report
     * Returns stock movements with date range filter, type filter, product filter
     */
    public function stockMovements(Request $request)
    {
        $movements = StockMovement::with(['product', 'warehouse'])
            ->when($request->start_date, function ($query) use ($request) {
                $query->whereDate('created_at', '>=', $request->start_date);
            })
            ->when($request->end_date, function ($query) use ($request) {
                $query->whereDate('created_at', '<=', $request->end_date);
            })
            ->when($request->movement_type, function ($query) use ($request) {
                $query->where('movement_type', $request->movement_type);
            })
            ->when($request->product_id, function ($query) use ($request) {
                $query->where('product_id', $request->product_id);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(20)
            ->withQueryString();

        $mappedMovements = $movements->getCollection()->map(function ($movement) {
            return [
                'id' => $movement->id,
                'date' => $movement->created_at->format('Y-m-d H:i:s'),
                'product_name' => $movement->product ? $movement->product->name : 'N/A',
                'product_sku' => $movement->product ? $movement->product->sku : 'N/A',
                'warehouse_name' => $movement->warehouse ? $movement->warehouse->name : 'N/A',
                'movement_type' => $movement->movement_type,
                'quantity' => $movement->quantity,
                'reference_type' => $movement->reference_type,
                'reference_id' => $movement->reference_id,
                'notes' => $movement->notes,
            ];
        });

        // Replace collection with mapped data
        $movements->setCollection($mappedMovements);

        return Inertia::render('Reports/StockMovements', [
            'movements' => $movements,
            'products' => Product::all(),
            'warehouses' => Warehouse::all(),
            'filters' => $request->only(['start_date', 'end_date', 'movement_type', 'product_id']),
        ]);
    }
}