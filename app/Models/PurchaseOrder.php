<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PurchaseOrder extends Model
{
    protected $fillable = [
        'supplier_id',
        'order_date',
        'expected_delivery',
        'status',
        'notes',
    ];

    protected $casts = [
        'order_date' => 'date',
        'expected_delivery' => 'date',
    ];

    public const STATUS_PENDING = 'pending';
    public const STATUS_ORDERED = 'ordered';
    public const STATUS_RECEIVED = 'received';
    public const STATUS_CANCELLED = 'cancelled';

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(PurchaseOrderItem::class);
    }

    public function getTotalAttribute()
    {
        return $this->items->sum(fn($item) => $item->quantity * $item->unit_price);
    }
}