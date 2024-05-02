<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CosmeticsWarehouse extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'quantity',
        'purchase_price',
        'sell_price',
        'cosmetics_id',
        'cosmetics_procurements_id',
        'total',
        'date'
    ];
}
