<?php

namespace App\Http\Controllers;

use App\Http\Requests\AppointmentRequest;
use App\Models\Appointment;
use App\Models\User;
use Carbon\Carbon;
use Exception;
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
    public function store(AppointmentRequest $request)
    {
        $data = $request->validated();
        $data['date'] = Carbon::parse($data['start_date'])->format('Y-m-d');
        $data['start_date'] = Carbon::parse($data['start_date'])->setTimezone('Europe/Podgorica')->toDateTimeString();
        $data['end_date'] = Carbon::parse($data['end_date'])->setTimezone('Europe/Podgorica')->toDateTimeString();

        return Appointment::create($data);
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
        $data = $request->all();
        $data['date'] = Carbon::parse($data['start_date'])->format('Y-m-d');
        $data['start_date'] = Carbon::parse($data['start_date'])->setTimezone('Europe/Podgorica')->toDateTimeString();
        $data['end_date'] = Carbon::parse($data['end_date'])->setTimezone('Europe/Podgorica')->toDateTimeString();
        $appointment->update($data);
        $appointment->save();

        return response()->json(['message' => 'Appointment updated successfully', 'appointment' => $appointment]);
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

    public function concludeAppointment(Request $request)
    {
        if (empty($request->appointment_id)) {
            return response()->json(['message' => 'Pogrešan termin!'], 404);
        }

        try {

            $appointment = Appointment::find($request->appointment_id);

            if (empty($appointment)) {
                return response()->json(['message' => "Termin ne postoji!"], 404);
            }

            $appointment->update(['status' => 3]);
            $appointment->save();

            return response()->json(['message' => 'Uspješno zaključen termin!'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => "Greška: " . $e], 403);
        }
    }
}
