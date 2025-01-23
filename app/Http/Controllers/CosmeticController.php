<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCosmeticsRequest;
use App\Http\Requests\UpdateCosmeticsRequest;
use App\Models\Cosmetic;
use Exception;
use Inertia\Inertia;

class CosmeticController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cosmetics =  Cosmetic::all();
        return Inertia::render('Cosmetics', [
            'cosmetics' => $cosmetics,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateCosmeticsRequest $request)
    {
        $data = $request->validated();
        try {
            Cosmetic::create([
                'name' => $data['name'],
                'status' => $data['status'],
            ]);
            return response()->json(['message' => 'Uspješno kreirano'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Desila se greška ' . $e->getMessage() . ' Pokusajte ponovo'], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCosmeticsRequest $request, $id)
    {
        try {
            $data = $request->validated();

            $cosmetic = Cosmetic::find($id);
            if (!$cosmetic) {
                return response()->json(['message' => 'Podaci nisu pronađeni!'], 404);
            }
            $cosmetic->update($data);

            return response()->json(['message' => 'Uspješno ažurirani podaci!'], 200);
        } catch (Exception $e) {
            // Return an error response if something goes wrong
            return response()->json(['message' => 'Desila se greška! Pokušajte ponovo.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cosmetic $cosmetic)
    {
        try {
            $cosmetic->delete();
            return redirect('/cosmetics')->with('success', 'Uspješno ste obrisali podatke');
        } catch (\Exception $e) {
            return redirect('/cosmetics')->with('error', 'Desila se greška! Pokušajte ponovo' . $e->getMessage());
        }
    }
}
