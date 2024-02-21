<?php

namespace App\Http\Controllers;

use App\Mail\DailyReportMail;
use App\Services\ReportService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function __construct(private ReportService $reportService)
    {
    }

    public function index()
    {
        return Inertia::render('Reports');
    }

    public function getReportsDataForRangeOfDates(Request $request)
    {
        return $this->reportService->getData($request);
    }

    public function sendDailyReportEmail(Request $request)
    {
        $data = $this->getDailyReportData($request);
        Mail::to('hari_n99@gmail.com')->send(new DailyReportMail($data));

        return true;
    }

    public function getDailyReportData(Request $request)
    {
        $data = $this->reportService->getDailyReportData($request);

        $pdf = Pdf::loadView('reports.daily_report_pdf', [
            'data' => $data
        ]);
        return $pdf->output();
    }
}
