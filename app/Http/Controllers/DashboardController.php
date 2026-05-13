<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Inventory;
use App\Models\StockMovement;
use App\Models\PurchaseOrder;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with key metrics.
     */
    public function index()
    {
        // Total Products count
        $totalProducts = Product::count();

        // Total Categories count
        $totalCategories = Category::count();

        // Low Stock Items count (quantity <= min_stock_level)
        $lowStockItems = Inventory::whereColumn('quantity', '<=', 'min_stock_level')->count();

        // Total Inventory Value (sum of quantity * cost_price)
        $totalInventoryValue = Inventory::join('products', 'inventory.product_id', '=', 'products.id')
            ->sum(DB::raw('inventory.quantity * products.cost_price'));

        // Recent Stock Movements (last 10)
        $recentMovements = StockMovement::with(['product', 'warehouse'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($movement) {
                return [
                    'id' => $movement->id,
                    'product_name' => $movement->product->name ?? 'Unknown Product',
                    'product_sku' => $movement->product->sku ?? 'N/A',
                    'warehouse_name' => $movement->warehouse->name ?? 'Unknown Warehouse',
                    'type' => $movement->movement_type,
                    'quantity' => $movement->quantity,
                    'created_at' => $movement->created_at->toISOString(),
                ];
            });

        // Recent Purchase Orders (last 5)
        $recentOrders = PurchaseOrder::with('supplier')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'supplier_name' => $order->supplier->name ?? 'Unknown Supplier',
                    'order_date' => $order->order_date?->toISOString(),
                    'expected_delivery' => $order->expected_delivery?->toISOString(),
                    'status' => $order->status,
                    'total' => $order->total,
                ];
            });

        // Top Categories by Product Count (top 5)
        $topCategories = Category::withCount('products')
            ->orderBy('products_count', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'product_count' => $category->products_count,
                ];
            });

        // Low Stock Alerts (inventory items below threshold with product and warehouse info)
        $lowStockAlerts = Inventory::with(['product', 'warehouse'])
            ->whereColumn('quantity', '<=', 'min_stock_level')
            ->orderBy('quantity', 'asc')
            ->get()
            ->map(function ($inventory) {
                return [
                    'id' => $inventory->id,
                    'product_name' => $inventory->product->name ?? 'Unknown Product',
                    'product_sku' => $inventory->product->sku ?? 'N/A',
                    'warehouse_name' => $inventory->warehouse->name ?? 'Unknown Warehouse',
                    'current_quantity' => $inventory->quantity,
                    'min_stock_level' => $inventory->min_stock_level,
                    'shortage' => $inventory->min_stock_level - $inventory->quantity,
                ];
            });

        return Inertia::render('dashboard', [
            'totalProducts' => $totalProducts,
            'totalCategories' => $totalCategories,
            'lowStockItems' => $lowStockItems,
            'totalInventoryValue' => $totalInventoryValue,
            'recentMovements' => $recentMovements,
            'recentOrders' => $recentOrders,
            'topCategories' => $topCategories,
            'lowStockAlerts' => $lowStockAlerts,
        ]);
    }
}