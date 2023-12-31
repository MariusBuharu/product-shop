<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id',
        'price',
        'qty',
        'total',
    ];

    public function product(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return$this->belongsTo(Product::class);
    }
    public function order(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return$this->belongsTo(Order::class);
    }
}
