<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BarberDetails extends Model
{
    use HasFactory;
    protected $fillable = [
      'user_id',
      'appointment_id',
      'month',
      'year',
      'total',
      'target_achieved_at',
      'difference_amount'
    ];
}
