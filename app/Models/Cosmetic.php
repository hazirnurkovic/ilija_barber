<?php

namespace App\Models;

use Hashemi\QueryFilter\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cosmetic extends Model
{

    use HasFactory, Filterable;

    protected $fillable = [
        'name',
        'price',
        'quantity',
        'sell_date',
        'total',
    ];
}
