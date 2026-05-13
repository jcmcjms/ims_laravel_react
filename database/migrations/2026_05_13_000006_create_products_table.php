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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('sku', 100)->unique();
            $table->text('description')->nullable();
            $table->foreignId('category_id')
                ->nullable()
                ->constrained('categories')
                ->onDelete('set null');
            $table->decimal('unit_price', 10, 2)->default(0);
            $table->decimal('cost_price', 10, 2)->default(0);
            $table->string('image', 500)->nullable();
            $table->timestamps();

            $table->index('category_id');
            $table->index('sku');
            $table->index('name');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};