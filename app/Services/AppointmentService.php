<?php

namespace App\Services;

use App\Filters\AppointmentFilter;
use App\Models\Appointment;
use Illuminate\Http\Request;

/**
 * Class AppointmentService.
 */
class AppointmentService
{
    public function __construct(
        private Appointment $appointment,
        private AppointmentFilter $appointmentFilter
    ) {
    }

    public function getDailyAppointments(Request $request)
    {
        return $this->appointment::with('user:id,first_name,last_name')
            ->filter($this->appointmentFilter)
            ->orderBy('user_id')
            ->selectRaw('user_id, SUM(price) as price')
            ->groupBy('user_id')
            ->get();
    }

    public function getMonthlyAppointments(Request $request)
    {
        return $this->appointment::with('user:id,first_name,last_name')
            ->filter($this->appointmentFilter)
            ->orderBy('user_id')
            ->selectRaw('user_id, SUM(price) as price')
            ->groupBy('user_id')
            ->get();
    }
}
