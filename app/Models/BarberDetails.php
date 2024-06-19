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
      'start_date',
      'month',
      'year',
      'total',
      'target_achieved_at',
      'difference_amount'
    ];

    protected $casts = [
        'start_date' => 'datetime',
    ];

    public function appointment()
    {
     return $this->belongsTo(Appointment::class, 'appointment_id');
    }
}

