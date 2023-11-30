<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
     * Get appointments for the given date
     */

    public function getAllAppointmentsForSpecificDate(Request $request)
    {
        $date = $request->date;
        $users = User::all();
        $appointments = Appointment::where('date', $date)->get();
        return response()->json(['users' => $users, 'appointments' => $appointments], 200);
    }

    /**
     * Get appointments for the given date for logged user
     */
    public function getAllAppointmentsForSpecificDateForUser(Request $request)
    {
        $date = $request->date;
        $user_id = auth()->user()->id;
        return Appointment::where('date', $date)
            ->where('user_id', $user_id)
            ->get();
    }
}
