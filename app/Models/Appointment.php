<?php

namespace App\Models;

use Hashemi\QueryFilter\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory, Filterable;

    protected $fillable = [
        'user_id',
        'customer_name',
        'start_date',
        'end_date',
        'price',
        'status',
        'date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
