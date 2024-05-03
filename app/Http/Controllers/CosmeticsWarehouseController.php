<?php

namespace App\Http\Controllers;

use App\Models\CosmeticsWarehouse;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CosmeticsWarehouseController extends Controller
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
    public function show(CosmeticsWarehouse $cosmeticsWarehouse)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CosmeticsWarehouse $cosmeticsWarehouse)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CosmeticsWarehouse $cosmeticsWarehouse)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CosmeticsWarehouse $cosmeticsWarehouse)
    {
        //
    }

    public function getWarehouseData(Request $request)
    {
        $month = Carbon::parse($request->date)->month;
        $warehouses = CosmeticsWarehouse::with('cosmetics')->whereMonth('date', $month)->get();
        
        if ($warehouses->isEmpty()) {
            return response()->json(['message' => 'Nema podataka za ovaj datum'], 200);
        }

        return response()->json(['warehouses' => $warehouses], 200);
    }

    public function getWarehouseDataForSales()
    {
        $warehouses = CosmeticsWarehouse::with('cosmetics')
            ->where('quantity', '>', 0)
            ->get();

        if($warehouses->isEmpty()) {
            return response()->json(['message' => 'Nema podataka u magacinu'], 200);
        }

        return response()->json(['warehouses' => $warehouses], 200);
    }
}
