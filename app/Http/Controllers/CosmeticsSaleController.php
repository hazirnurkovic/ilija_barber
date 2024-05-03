<?php

namespace App\Http\Controllers;

use App\Models\CosmeticsSale;
use Carbon\Carbon;
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
        //
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
