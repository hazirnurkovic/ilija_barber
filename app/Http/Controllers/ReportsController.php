<?php

namespace App\Http\Controllers;

use App\Mail\DailyReportMail;
use App\Services\ReportService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ReportsController extends Controller
{
    public function __construct(private ReportService $reportService)
    {
    }

    public function sendDailyReportEmail(Request $request)
    {
        $data = $this->getDailyReportData($request);
        Mail::to('hari_n99@gmail.com')->send(new DailyReportMail($data));

        return true;
    }

    public function getDailyReportData(Request $request)
    {
        $data = $this->reportService->getReportData($request);

        $pdf = Pdf::loadView('reports.daily_report', [
            'data' => $data
        ]);
        return $pdf->output();
    }
}
