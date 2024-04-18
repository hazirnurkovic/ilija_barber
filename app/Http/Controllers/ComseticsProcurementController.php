<?php

namespace App\Http\Controllers;

use App\Models\ComseticsProcurement;
use App\Http\Requests\StoreComseticsProcurementRequest;
use App\Http\Requests\UpdateComseticsProcurementRequest;
use Illuminate\Http\Request;

class ComseticsProcurementController extends Controller
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
    public function store(StoreComseticsProcurementRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ComseticsProcurement $comseticsProcurement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ComseticsProcurement $comseticsProcurement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateComseticsProcurementRequest $request, ComseticsProcurement $comseticsProcurement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ComseticsProcurement $comseticsProcurement)
    {
        //
    }

    public function getProcurements(Request $request)
    {
        $date = $request->date;
        $procurements = ComseticsProcurement::where('date', $date)->get();
        if (!$procurements) {
            return response()->json(['message' => 'Nema podataka za ovaj datum'], 400);
        } else {
            return  response()->json(['procurements' => $procurements], 200);
        }
    }
}
