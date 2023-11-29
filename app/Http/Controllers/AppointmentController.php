<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Appointment::all();
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
        $createRequest = $request->all();
        return Appointment::create($createRequest);
    }

    /**
     * Display the specified resource.
     */
    public function show(Appointment $appointment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Appointment $appointment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Appointment $appointment)
    {
        $updateRequest = $request->all();
        return $appointment->update($updateRequest);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appointment $appointment)
    {
        return $appointment->delete();
    }

    /**
     * Show appointments for the given date
     */

    public function getAllAppointmentsForSpecificDate($date)
    {
        return Appointment::where('date', $date)
            ->groupBy('user_id')
            ->get();
    }

    /**
     * Show appointments for the given date for logged user
     */
    public function getAllAppointmentsForSpecificDateForUser($date)
    {
        $user_id = auth()->user()->id;
        return Appointment::where('date', $date)
            ->where('user_id', $user_id)
            ->get();
    }
}
