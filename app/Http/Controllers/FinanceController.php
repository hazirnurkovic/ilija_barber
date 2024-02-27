<?php

namespace App\Http\Controllers;

use App\Models\Finance;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\ReportService;

class FinanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function __construct(private ReportService $reportService)
    {
    }
    public function index()
    {
        return Inertia::render('Finances');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $data = $request->all();
        $barbers_total_and_cosmetics = $this->reportService->getDailyReportData($request);
        $barbers_total = $barbers_total_and_cosmetics['appointments'] ?? 0;
        $cosmetics_total = $barbers_total_and_cosmetics['cosmetics_price'] ?? 0;
        $sum = $cosmetics_total;
        foreach ($barbers_total as $total) {
            $sum += $total['barber_total'];
        }
        try {
            $insert = Finance::create([
                'date' => $data['date'],
                'cash_amount' => $sum - $data['amount'],
                'register_amount' => $data['amount'],
                'total' => $sum
            ]);

            $insert->save();
            return response()->json(['message' => 'Uspješno kreirano'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Desila se greška' . $e->getMessage()], 500);
        }
    }

    public function getFinancesReport(Request $request)
    {
        return Finance::where('date', $request->date)->get();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
