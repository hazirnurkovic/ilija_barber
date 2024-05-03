<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CosmeticsSale extends Model
{
    use HasFactory;

    protected $fillable = [
        'cosmetics_warehouse_id',
        'quantity',
        'sell_price',
        'date',
        'cosmetics_id'
    ];
}
