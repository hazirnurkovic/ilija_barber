<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Http\Request;

/**
 * Class ReportService.
 */
class ReportService
{
    public function __construct(private AppointmentService $appointmentService, private CosmeticService $cosmeticService)
    {
    }

    public function getReportData(Request $request)
    {
        $daily_report_appointments_data = $this->appointmentService->getAppointments($request);
        $daily_report_cosmetics_data = $this->cosmeticService->getCosmeticsData($request);

        return [
            'date' => Carbon::createFromFormat('Y-m-d', $request->date)->format('d.m.Y'),
            'appointments' => $daily_report_appointments_data,
            'cosmetics_price' => $daily_report_cosmetics_data
        ];
    }
}
