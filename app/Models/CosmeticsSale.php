<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CosmeticsSale extends Model
{
    use HasFactory;

    protected $fillable = [
        'cosmetics_warehouse_id',
        'quantity',
        'sell_price',
        'date',
        'cosmetics_id',
        'total'
    ];

    public function cosmetics(): BelongsTo
    {
        return $this->belongsTo(Cosmetic::class);
    }

    public function cosmetics_warehouse(): BelongsTo
    {
        return $this->belongsTo(CosmeticsWarehouse::class);
    }
}
