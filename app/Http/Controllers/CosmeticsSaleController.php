<?php

namespace App\Http\Controllers;

use App\Models\CosmeticsSale;
use App\Models\CosmeticsWarehouse;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class CosmeticsSaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        try {
            $request['date'] = Carbon::parse($request->date)->format('Y-m-d');
            $warehouse = CosmeticsWarehouse::where('id', $request->cosmetics_warehouse_id)->first();
            if (!$warehouse) {
                return response()->json(['message' => 'Nema podataka u magacinu!'], 400);
            }
            $request['cosmetics_id'] = $warehouse->cosmetics_id;
            $total = $request->sell_price * $request->quantity;
            if($warehouse->quantity < $request->quantity) {
                return response()->json(['message' => 'Nema dovoljno na stanju. Na raspolaganju imate '.$warehouse->quantity], 400);
            }
            $sale= CosmeticsSale::create([
                'cosmetics_warehouse_id' => $request->cosmetics_warehouse_id,
                'quantity' => $request->quantity,
                'sell_price' => $request->sell_price,
                'date' => $request->date,
                'cosmetics_id' => $request->cosmetics_id,
                'total' => $total
            ]);

            if (!$sale) {
                return response()->json(['message' => 'Desila se greška! Molimo Vas pokušajte ponovo!'], 400);
            }
            $sale->load('cosmetics');
            return response()->json(['message' => 'Uspješno ste unijeli nabavku!', 'sale' => $sale], 200);
        } catch(Exception $e) {
            return response()->json(['message' => 'Greška!'.$e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(CosmeticsSale $cosmeticsSale)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CosmeticsSale $cosmeticsSale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CosmeticsSale $cosmeticsSale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CosmeticsSale $cosmeticsSale)
    {
        //
    }

    public function getSalesData(Request $request)
    {
        $month = Carbon::parse($request->date)->month;
        $sales = CosmeticsSale::with('cosmetics')->whereMonth('date', $month)->get();

        if ($sales->isEmpty()) {
            return response()->json(['message' => 'Nema podataka za ovaj datum'], 200);
        }

        return response()->json(['sales' => $sales], 200);
    }
}
