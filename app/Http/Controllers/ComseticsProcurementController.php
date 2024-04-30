<?php

namespace App\Http\Controllers;

use App\Models\ComseticsProcurement;
use App\Http\Requests\StoreComseticsProcurementRequest;
use App\Http\Requests\UpdateComseticsProcurementRequest;
use Carbon\Carbon;
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
        $data = $request->validated();
        $data['date'] = Carbon::parse($data['date'])->format('Y-m-d');

        $procurements = ComseticsProcurement::create($data);
        if (!$procurements) {
            return response()->json(['message' => 'Desila se greška! Molimo Vas pokušajte ponovo!'], 400);
        }
        return response()->json(['message' => 'Uspješno ste unijeli nabavku!'], 200);
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
    public function destroy(ComseticsProcurement $cosmetics_procurement)
    {
        try {
            $cosmetics_procurement->delete();
            return redirect('/cosmetics')->with('success', 'Uspješno ste obrisali nabavku');
        } catch (\Exception $e) {
            return redirect('/cosmetics')->with('error', 'Desila se greška! Pokušajte ponovo' . $e->getMessage());
        }
    }

    public function getProcurements(Request $request)
    {
        $date = $request->date;
        $procurements = ComseticsProcurement::with('cosmetics')->where('date', $date)->get();
        if (!$procurements) {
            return response()->json(['message' => 'Nema podataka za ovaj datum'], 400);
        } else {
            return  response()->json(['procurements' => $procurements], 200);
        }
    }
}
