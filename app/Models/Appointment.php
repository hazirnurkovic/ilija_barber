<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'customer_name',
        'start_date',
        'end_date',
        'price',
        'status',
        'date'
    ];

    protected $casts = [
        'date' => 'd.m.Y'
    ];
}
