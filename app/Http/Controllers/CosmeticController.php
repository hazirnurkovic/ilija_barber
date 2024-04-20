<?php

namespace App\Http\Controllers;

use App\Models\Cosmetic;
use Exception;
use Illuminate\Http\Request;
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
        $data = $request->all();
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
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $validate_data = $request->validate([
                'name' => 'required|string',
                'status' => 'required|integer'
            ]);

            $cosmetic = Cosmetic::findOrFail($id);
            $cosmetic->update($validate_data);

            return response()->json(['message' => 'Uspješno ažurirani podaci!'], 200);
        } catch (\Exception $e) {
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
