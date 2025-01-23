<?php

namespace App\Http\Controllers;

use App\Models\CosmeticsWarehouse;

class CosmeticsWarehouseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $warehouses = CosmeticsWarehouse::with('cosmetics')
            ->where('quantity', '>', 0)
            ->get();

        if ($warehouses->isEmpty()) {
            return response()->json(['message' => 'Nema artikala u magacinu'], 200);
        }

        return response()->json(['warehouses' => $warehouses], 200);
    }

    public function getWarehouseDataForSales()
    {
        $warehouses = CosmeticsWarehouse::with('cosmetics')
            ->where('quantity', '>', 0)
            ->orderBy('cosmetics_id')
            ->get();

        if ($warehouses->isEmpty()) {
            return response()->json(['message' => 'Nema podataka u magacinu'], 200);
        }

        return response()->json(['warehouses' => $warehouses], 200);
    }
}
