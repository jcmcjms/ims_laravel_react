<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('purchase_order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('purchase_order_id')
                ->constrained('purchase_orders')
                ->onDelete('cascade');
            $table->foreignId('product_id')
                ->constrained('products')
                ->onDelete('restrict');
            $table->integer('quantity')->check('quantity > 0');
            $table->decimal('unit_price', 10, 2)->default(0);
            $table->integer('received_quantity')->default(0)->check('received_quantity >= 0');
            $table->timestamps();

            $table->index('purchase_order_id');
            $table->index('product_id');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_order_items');
    }
};