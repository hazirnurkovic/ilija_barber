<?php

namespace App\Http\Controllers;

use App\Http\Requests\FinanceStoreRequest;
use App\Models\Expense;
use App\Models\Finance;
use App\Services\BarberService;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinanceController extends Controller
{

    public function __construct(private BarberService $barberService)
    {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Finances');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FinanceStoreRequest $request)
    {
        $data = $request->validated();

        $finance = Finance::where('date', $data['date'])->first();
        if($finance) {
            return response()->json(['message' => 'Finansijski obračun je već odrađen !'], 500);
        }

        $appointments_total = $this->barberService->calculateAppointmentsTotal($request);
        $cosmetics_total = $this->barberService->calculateCosmeticsTotal($request);

        $barberEarnings = $this->barberService->calculateBarbersEarnings($request);
        $barberShopFinances = $this->barberService->calculateBarberShopEarnings($appointments_total, $barberEarnings);

        $expense_amount = Expense::where('date', $data['date'])->sum('price');

        $total = $barberShopFinances['total_earnings_for_barber_shop'] + $cosmetics_total;
        $cash = $total - $data['amount'];
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
        $request->validate(['date' => 'required|date'], ['date.required' => 'Molimo unesite datum']);
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 10);
        $date = Carbon::createFromFormat('Y-m-d', $request->date);
        $month = $date->month;

         $offset = ($page - 1) * $limit;

         $totalRecords = Finance::whereMonth('date', $month)->count();

         $finances = Finance::whereMonth('date', $month)
            ->offset($offset)
            ->limit($limit)
            ->get();

         return response()->json([
            'finances' => $finances,
            'totalRecords' => $totalRecords,
            'currentPage' => $page,
            'totalPages' => ceil($totalRecords / $limit),
        ]);
    }
}
