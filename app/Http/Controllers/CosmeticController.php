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
                'status' => $data['price'],
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
