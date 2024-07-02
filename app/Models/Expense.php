<?php

namespace App\Models;

use Hashemi\QueryFilter\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory, Filterable;

    protected $fillable = [
        'name',
        'price',
        'date',
        'cosmetics_procurement_id'
    ];
}
