<?php

namespace App\Http\Controllers;

use App\Models\CosmeticsProcurement;
use App\Http\Requests\StoreCosmeticsProcurementRequest;
use App\Http\Requests\UpdateCosmeticsProcurementRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CosmeticsProcurementController extends Controller
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
    public function store(StoreCosmeticsProcurementRequest $request)
    {
        $validated_request = $request->validated();
        $validated_request['date'] = Carbon::parse($validated_request['date'])->format('Y-m-d');
        $validated_request['total'] = $validated_request['purchase_price'] * $validated_request['quantity'];

        $procurement = CosmeticsProcurement::create($validated_request);
        if (!$procurement) {
            return response()->json(['message' => 'Desila se greška! Molimo Vas pokušajte ponovo!'], 400);
        }
        $procurement->load('cosmetics');
        return response()->json(['message' => 'Uspješno ste unijeli nabavku!', 'procurement' => $procurement], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(CosmeticsProcurement $cosmeticsProcurement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CosmeticsProcurement $cosmeticsProcurement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCosmeticsProcurementRequest $request, $id)
    {
        try {
            $validated_request = $request->validated();
            $validated_request['total'] = $validated_request['purchase_price'] * $validated_request['quantity'];
            
            if ($validated_request['date']) {
                unset($validated_request['date']);
            }
            
            $cosmeticsProcurement = CosmeticsProcurement::findOrFail($id);
            $cosmeticsProcurement->update($validated_request);
            $cosmeticsProcurement->load('cosmetics');

            return response()->json(['message' => 'Uspješno ste ažurirali nabavku', 'procurement' => $cosmeticsProcurement], 200);
        } catch(\Exception $e) {
            return response()->json(['message' => 'Desila se greška! Pokušajte ponovo!'. $e->getMessage()],400);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($procurement_id)
    {
        try {
            $cosmetics_procurement = CosmeticsProcurement::findOrFail($procurement_id);
            $cosmetics_procurement->delete();
            return response()->json(['message' => 'Uspješno ste obrisali nabavku']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Desila se greška! Pokušajte ponovo!'. $e->getMessage()]);
        }
    }

    public function getProcurements(Request $request)
    {
        $date = $request->date;
        $procurements = CosmeticsProcurement::with('cosmetics')->where('date', $date)->get();
        
        if (!$procurements) {
            return response()->json(['message' => 'Nema podataka za ovaj datum'], 400);
        }
        
        return response()->json(['procurements' => $procurements], 200);
    }
}
