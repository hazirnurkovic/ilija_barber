<?php

namespace App\Models;

use Carbon\Carbon;
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

    protected function getDateAttribute($value)
    {
        return Carbon::parse($value)->format('d.m.Y');
    }

    public function cosmetics()
    {
        return $this->belongsTo(Cosmetic::class);
    }
}
