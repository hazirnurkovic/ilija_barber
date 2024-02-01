<?php

namespace App\Http\Controllers;

use App\Http\Requests\CosmeticsRequest;
use App\Models\Cosmetic;
use Carbon\Carbon;
use Exception;
use http\Env\Response;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CosmeticsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cosmetics =  Cosmetic::all();
        return Inertia::render('Cosmetics', [
            '$cosmetics' => $cosmetics,
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
        $data['sell_date'] = Carbon::parse($data['sell_date'])->format('Y-m-d');
        try {
             Cosmetic::create($data);
            return response()->json(['message' => 'Uspjesno kreirano'], 200);
        } catch (Exception $e){

            return response()->json(['message'=> 'Desila se greska '.$e->getMessage() .' Pokusajte ponovo'], 400);
        }


    }
    public function getCosmeticsData(Request $request)
    {
        $date = $request->date;
        $cosmetics = Cosmetic::where('sell_date', $date)->get();
        if(!$cosmetics) {
            return response()->json(['message' => 'Nema podataka za ovaj datum'], 400);
        } else {
            return  response()->json(['cosmetics' => $cosmetics], 200);
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