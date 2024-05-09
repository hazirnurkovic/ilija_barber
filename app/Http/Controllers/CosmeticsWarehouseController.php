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
        $warehouses = CosmeticsWarehouse::with('cosmetics')->get();

        if ($warehouses->isEmpty()) {
            return response()->json(['message' => 'Nema artikala u magacinu'], 200);
        }

        return response()->json(['warehouses' => $warehouses], 200);
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

    public function getWarehouseDataForSales()
    {
        $warehouses = CosmeticsWarehouse::with('cosmetics')
            ->orderBy('cosmetics_id')
            ->get();

        if ($warehouses->isEmpty()) {
            return response()->json(['message' => 'Nema podataka u magacinu'], 200);
        }

        return response()->json(['warehouses' => $warehouses], 200);
    }
}
