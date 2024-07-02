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
    ) {}

    public function getAppointments(Request $request)
    {
        return $this->appointment::with('user:id,first_name,last_name,percentage')
            ->filter($this->appointmentFilter)
            ->orderBy('user_id')
            ->selectRaw('user_id, SUM(price) as price, sum(barber_total) as barber_total')
            ->groupBy('user_id')
            ->get();
    }
}
