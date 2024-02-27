<?php

namespace App\Http\Controllers;

use App\Mail\DailyReportMail;
use App\Services\ReportService;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
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
        if (!auth()->user()->is_admin) {
            $request->merge(['user_id' => auth()->user()->id]);
        }
        return $this->reportService->getData($request);
    }

    public static function sendDailyReportEmail(Request $request)
    {
        try {
            $data = self::getDailyReportData($request);
            $date = Carbon::createFromFormat('Y-m-d', $request->date)->format('d.m.Y');
            Mail::to('dusanvuletic24@gmail.com')->send(new DailyReportMail($data, $date));

            return redirect()->route('dashboard')->with('success', 'Uspješno poslat izvještaj!');
        } catch (\Exception $e) {
            return redirect()->route('dashboard')->with('error', $e->getMessage());
        }
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
