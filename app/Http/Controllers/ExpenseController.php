<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExpenseStoreRequest;
use App\Models\CosmeticsProcurement;
use App\Models\Expense;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $success = Session::get('success');
        $error = Session::get('error');
        $expenses = Expense::all();

        return Inertia::render('Expenses', [
            'initialExpenses' => $expenses,
            'success' => $success,
            'error' => $error
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ExpenseStoreRequest $request)
    {
        $data = $request->validated();

        $data['date'] = Carbon::parse($data['date'])->format('Y-m-d');

        try {
            Expense::create([
                'name' => $data['name'],
                'price' => $data['price'],
                'date' => $data['date']
            ]);

            return response()->json(['message' => 'Uspješno unijet trošak'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Desila se greška ' . $e->getMessage() . ' Pokušajte ponovo'], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        try {
            $expense->delete();
            return redirect()->route('expenses.index')->with('success', 'Uspješno obrisan trošak!');
        } catch (Exception $e) {
            return redirect()->route('expenses.index')->with('error', 'Desila se greška: ' . $e->getMessage());
        }
    }

    public function getExpenses(Request $request)
    {
        // validate request
        $expenses = Expense::where('date', $request->date)->get();

        return response()->json(['expenses' => $expenses]);
    }

    public static function createFromObserver(Request $request)
    {
        $validated_request = $request->validate([
            'cosmetics_procurements_id' => 'required|integer',
            'total'                    => 'required|numeric',
            'date'                     => 'required',
        ]);
        $date = Carbon::parse($validated_request['date'])->format('Y.m.d');

        $expense = Expense::where('name', 'Nabavka kozmetike')->where('date', $date)->first();
        if (!$expense) {
            Expense::create([
                'name'                      => 'Nabavka kozmetike',
                'price'                     => $validated_request['total'],
                'date'                      => $date,
                'cosmetics_procurements_id'  => $validated_request['cosmetics_procurements_id']
            ]);
        } else {
            $expense->price += $validated_request['total'];
            $expense->update();
        }
    }

    public static function updateFromObserver(Request $request)
    {
        $date = Carbon::parse($request->date_expenses)->format('Y.m.d');
        $procurements_sum = CosmeticsProcurement::where('date', $date)->sum('total');
        $expense = Expense::where('date', $date)->where('name', 'Nabavka kozmetike')->first();
        $expense->price = $procurements_sum;
        $expense->save();
        return $expense;
    }

    public static function deleteIfPriceIsNull($expense)
    {
        if($expense->price == 0) {
            $expense->delete();
        }
    }
}
