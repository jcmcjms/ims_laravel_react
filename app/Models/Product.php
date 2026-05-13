<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class Product extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'sku',
        'description',
        'category_id',
        'unit_price',
        'cost_price',
        'image',
    ];

    /**
     * Get the category that owns the product.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the inventory for the product.
     */
    public function inventory(): HasMany
    {
        return $this->hasMany(\App\Models\Inventory::class);
    }

    /**
     * Get the purchase order items for the product.
     */
    public function purchaseOrderItems(): HasMany
    {
        return $this->hasMany(\App\Models\PurchaseOrderItem::class);
    }

    /**
     * Get the stock movements for the product.
     */
    public function stockMovements(): HasMany
    {
        return $this->hasMany(\App\Models\StockMovement::class);
    }

    /**
     * Scope to search products by name or SKU.
     */
    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        if ($search) {
            return $query->where(function (Builder $query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%");
            });
        }

        return $query;
    }

    /**
     * Get the image URL attribute.
     */
    public function getImageUrlAttribute(): ?string
    {
        if ($this->image) {
            return asset('storage/' . $this->image);
        }

        return null;
    }
}