<?php

namespace App\Http\Controllers;

use App\Mail\DailyReportMail;
use App\Services\BarberService;
use App\Services\CosmeticService;
use App\Services\ExpenseService;
use App\Services\FinanceService;
use Barryvdh\DomPDF\Facade\PDF;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function __construct(
        private CosmeticService $cosmeticService,
        private BarberService $barberService,
        private ExpenseService $expenseService,
        private FinanceService $financeService
    ) {
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

        $appointments_total = $this->barberService->calculateAppointmentsTotal($request);
        $cosmetics_sales = $this->cosmeticService->getCosmeticsSaleData($request);
        $cosmetics_total = $this->barberService->calculateCosmeticsTotal($request);
        $expenses = $this->expenseService->getExpensesForReports($request);
        $finances = $this->financeService->getFinanceData($request);

        $barberEarnings = $this->barberService->calculateBarbersEarnings($request);
        $barberShopFinances = $this->barberService->calculateBarberShopEarnings($appointments_total, $barberEarnings);

        return [
            'expenses' => $expenses,
            'cosmetics_sales' => $cosmetics_sales,
            'cosmetics' => $cosmetics_total,
            'earnings' => $barberShopFinances,
            'finances' => $finances
        ];
    }

    public function sendDailyReportEmail(Request $request)
    {
        try {
            $data =  self::getDailyReportData($request);
            $date = Carbon::createFromFormat('Y-m-d', $request->date)->format('d.m.Y');

            Mail::to('hazir.nurkovic@gmail.com')->send(new DailyReportMail($data, $date));

            return redirect()->route('dashboard')->with('success', 'Uspješno poslat izvještaj!');
        } catch (\Exception $e) {
            Log::error('Failed to send daily report email: ' . $e->getMessage());
            return redirect()->route('dashboard')->with('error', $e->getMessage());
        }
    }

    public function getDailyReportData(Request $request)
    {
        $data = $this->getReportsDataForRangeOfDates($request);
        if (isset($data['start_date']) && isset($data['end_date'])) {
            $data['start_date'] = Carbon::parse($request->start_date)->format('d.m.Y');
            $data['end_date'] = Carbon::parse($request->end_date)->format('d.m.Y');
        } else {
            $data['date'] = Carbon::parse($request->date)->format('d.m.Y');
        }
        $pdf = PDF::loadView('reports.daily_report_pdf', [
            'data' => $data
        ]);
        return $pdf->output();
    }
}
