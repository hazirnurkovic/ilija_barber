<?php

namespace App\Models;

use Carbon\Carbon;
use Hashemi\QueryFilter\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CosmeticsSale extends Model
{
    use HasFactory, Filterable;

    protected $fillable = [
        'cosmetics_warehouse_id',
        'quantity',
        'sell_price',
        'date',
        'cosmetics_id',
        'total'
    ];

    protected function getDateAttribute($value)
    {
        return Carbon::parse($value)->format('d.m.Y');
    }

    public function cosmetics(): BelongsTo
    {
        return $this->belongsTo(Cosmetic::class);
    }

    public function cosmetics_warehouse(): BelongsTo
    {
        return $this->belongsTo(CosmeticsWarehouse::class);
    }
}
