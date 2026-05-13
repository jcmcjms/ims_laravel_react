<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\WarehouseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\StockMovementController;
use App\Http\Controllers\PurchaseOrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
    Route::resource('suppliers', SupplierController::class);
    Route::resource('warehouses', WarehouseController::class);
    Route::resource('inventory', InventoryController::class);
    Route::resource('purchase-orders', PurchaseOrderController::class);
    Route::resource('stock-movements', StockMovementController::class);
    Route::get('stock-movements/adjust', [StockMovementController::class, 'getAdjustForm'])->name('stock-movements.adjust');
    Route::post('stock-movements/adjust', [StockMovementController::class, 'adjust'])->name('stock-movements.adjust-store');

    // Report routes
    Route::get('reports/inventory-valuation', [ReportController::class, 'inventoryValuation']);
    Route::get('reports/low-stock', [ReportController::class, 'lowStock']);
    Route::get('reports/stock-movements', [ReportController::class, 'stockMovements']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
