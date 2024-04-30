<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CosmeticsProcurement extends Model
{
    use HasFactory;

    protected $fillable = [
        'cosmetics_id',
        'quantity',
        'purchase_price',
        'total',
        'date'
    ];

    public function cosmetics()
    {
        return $this->belongsTo(Cosmetic::class);
    }
}
