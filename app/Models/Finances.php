<?php

namespace App\Models;

use Hashemi\QueryFilter\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Finances extends Model
{
    use HasFactory, Filterable;

        protected $fillable = [
            'date',
            'cash_amount',
            'register_amount',
            'total',
        ];
}
