<?php

namespace App\Http\Controllers;

use App\Models\BarberDetails;
use App\Models\Expense;
use App\Models\Finance;
use App\Services\BarberService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\ReportService;

class FinanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function __construct(private BarberService $barberService)
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
        $appointments_total = $this->barberService->calculateAppointmentsTotal($request);
        $cosmetics_total = $this->barberService->calculateCosmeticsTotal($request);

        $barberEarnings = $this->barberService->calculateBarbersEarnings($request);
        $barberShopFinances = $this->barberService->calculateBarberShopEarnings($appointments_total, $barberEarnings);

        $expense_amount = Expense::where('date', $request->date)->sum('price');

        $cash = $barberShopFinances['total_earnings_for_barber_shop'] - $data['amount'] + $cosmetics_total;
        $total = $barberShopFinances['total_earnings_for_barber_shop'] + $cosmetics_total;
        $envelope = $cash - $expense_amount;

        try {
            $insert = Finance::create([

                'date' => $data['date'],
                'cash_amount' => $cash,
                'register_amount' => $data['amount'],
                'total' => $total,
                'expense_amount' => $expense_amount,
                'envelope' => $envelope
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
