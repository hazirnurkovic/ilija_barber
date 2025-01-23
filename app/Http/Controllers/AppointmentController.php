<?php

namespace App\Http\Controllers;

use App\Enums\AppointmentStatusEnum;
use App\Http\Requests\AppointmentRequest;
use App\Http\Requests\ConcludeAppointmentRequest;
use App\Models\Appointment;
use App\Models\BarberDetails;
use App\Models\User;
use App\Services\BarberService;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function __construct(private BarberService $barberService)
    {}

    public function index()
    {
        return Appointment::all();
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

        $appointment = Appointment::create($data);
        if (!$appointment) {
            return response()->json(['message' => 'Desila se greška! Molimo Vas pokušajte ponovo!'], 400);
        }
        return response()->json(['message' => 'Uspješno ste kreirali termin!'], 200);
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

        return response()->json(['message' => 'Termin uspješno ažuriran', 'appointment' => $appointment], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appointment $appointment)
    {
        $delete = $appointment->delete();
        if (!$delete) {
            return response()->json(['message' => 'Došlo je do greške. Molimo Vas pokušajte ponovo!'], 400);
        }
        return response()->json(['message' => 'Uspješno obrisan termin.'], 200);
    }

    /**
     * Get appointments for the given date
     */

    public function getAllAppointmentsForSpecificDate(Request $request)
    {
        $date = $request->date;
        if (empty($date)) {
            return response()->json(['message' => 'Datum mora biti unijet!'], 404);
        }
        
        $month = Carbon::parse($date)->format('n');
        $users = User::with(['barberDetails' => function($query) use ($month) {
            $query->where('month', $month);
        }])->get();

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
        $user = User::find($user_id);
        $appointments = Appointment::where('date', $date)
            ->where('user_id', $user_id)
            ->get();

        $barber_target = BarberDetails::where('user_id', $user_id)->value('target_achieved_at');

        return response()->json(['users' => $user, 'appointments' => $appointments, 'target' => $barber_target], 200);
    }

    public function concludeAppointment(ConcludeAppointmentRequest $request)
    {
        $request->validated();
        try {

            $appointment = Appointment::find($request->appointment_id);

            if (empty($appointment)) {
                return response()->json(['message' => "Termin ne postoji!"], 404);
            }

            if ($appointment->status === AppointmentStatusEnum::CONCLUDED) {
                return response()->json(['message' => 'Termin je već zaključen'], 500);
            }

            $user = User::find($appointment->user_id);
            $appointment->update([
                'status' => AppointmentStatusEnum::CONCLUDED,
                'customer_name' => $request->customer_name,
                'price' => $request->price,
                'barber_total' => $request->price * $user->percentage
            ]);
            $appointment->save();

            $this->barberService->calculateBarberDetails($appointment);

            return response()->json(['message' => 'Uspješno zaključen termin!'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => "Greška: " . $e->getMessage()], 403);
        }
    }
}
