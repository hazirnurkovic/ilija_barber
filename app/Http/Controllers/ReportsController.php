<?php

namespace App\Http\Controllers;

use App\Services\CosmeticService;
use App\Services\DailyReportService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class ReportsController extends Controller
{
    public function __construct(private CosmeticService $cosmeticService)
    {
    }

    public function generateDailyReport(Request $request, DailyReportService $dailyReportService)
    {
        $data = $dailyReportService->getReportData($request);

        $pdf = Pdf::loadView('reports.daily_report', [
            'data' => $data
        ]);
        return $pdf->output();
    }
}
