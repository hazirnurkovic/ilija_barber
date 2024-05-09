<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CosmeticsWarehouse extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'quantity',
        'purchase_price',
        'cosmetics_id',
        'cosmetics_procurements_id',
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

    public function procurements()
    {
        return $this->belongsTo(CosmeticsProcurement::class);
    }
}
