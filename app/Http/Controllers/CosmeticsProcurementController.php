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
     * Update the specified resource in storage.
     */
    public function update(UpdateCosmeticsProcurementRequest $request, $id)
    {
        try {
            $validated_request = $request->validated();
            $validated_request['total'] = $validated_request['purchase_price'] * $validated_request['quantity'];

            if (isset($validated_request['date'])) {
                unset($validated_request['date']);
            }

            $cosmeticsProcurement = CosmeticsProcurement::find($id);
            if (!$cosmeticsProcurement) {
                return response()->json(['message' => 'Nabavka nije pronađena!'], 404);
            }
            $cosmeticsProcurement->update($validated_request);
            $cosmeticsProcurement->load('cosmetics');

            return response()->json(['message' => 'Uspješno ste ažurirali nabavku', 'procurement' => $cosmeticsProcurement], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Desila se greška! Pokušajte ponovo!' . $e->getMessage()], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($procurement_id)
    {
        try {
            $cosmetics_procurement = CosmeticsProcurement::find($procurement_id);
            if (!$cosmetics_procurement) {
                return response()->json(['message' => 'Nabavka nije pronađena!'], 404);
            }
            $cosmetics_procurement->delete();
            return response()->json(['message' => 'Uspješno ste obrisali nabavku'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Desila se greška! Pokušajte ponovo!' . $e->getMessage()]);
        }
    }

    public function getProcurements(Request $request)
    {
        $request->validate(['date' => 'required|date'], ['date.required' => 'Datum je obavezan',]);
        $month = Carbon::parse($request->date)->month;
        $procurements = CosmeticsProcurement::with('cosmetics')->whereMonth('date', $month)->get();

        if (!$procurements) {
            return response()->json(['message' => 'Nema podataka za ovaj datum', 'procurements' => $procurements], 200);
        }

        return response()->json(['procurements' => $procurements], 200);
    }
}
