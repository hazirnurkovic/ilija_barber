<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComseticsProcurement extends Model
{
    use HasFactory;

    protected $fillable = [
        'cosmetics_id',
        'quantity',
        'purchase_price',
        'date'
    ];

    public function cosmetics()
    {
        return $this->belongsTo(Cosmetic::class);
    }
}
