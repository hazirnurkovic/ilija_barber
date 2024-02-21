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

    public function getDailyReportData(Request $request)
    {
        $report_data = $this->getReportData($request);
        $report_data['date'] = Carbon::createFromFormat('Y-m-d', $request->date)->format('d.m.Y');

        return $report_data;
    }

    public function getData(Request $request)
    {
        $report_data = $this->getReportData($request);
        $report_data['start_date'] = Carbon::createFromFormat('Y-m-d', $request->start_date)->format('d.m.Y');
        $report_data['end_date'] = Carbon::createFromFormat('Y-m-d', $request->end_date)->format('d.m.Y');

        return $report_data;
    }

    public function getReportData(Request $request)
    {
        $daily_report_appointments_data = $this->appointmentService->getAppointments($request);
        $daily_report_cosmetics_data = $this->cosmeticService->getCosmeticsData($request);

        return [
            'appointments' => $daily_report_appointments_data,
            'cosmetics_price' => $daily_report_cosmetics_data
        ];
    }
}
