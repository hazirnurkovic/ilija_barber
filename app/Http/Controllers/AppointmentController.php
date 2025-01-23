<?php

namespace App\Http\Controllers;

use App\Enums\AppointmentStatusEnum;
use App\Http\Requests\CreateAppointmentRequest;
use App\Http\Requests\ConcludeAppointmentRequest;
use App\Http\Requests\UpdateAppointmentRequest;
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
    public function store(CreateAppointmentRequest $request)
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
    public function update(UpdateAppointmentRequest $request, Appointment $appointment)
    {
        $data = $request->validated();
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
        $request->validate(['date' => 'required'], ['date.required' => 'Datum mora biti unijet!']);

        $date = $request->date;
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
        $request->validate(['date' => 'required'], ['date.required' => 'Datum mora biti unijet!']);
        $user_id = auth()->user()->id;
        $user = User::find($user_id);
        $appointments = Appointment::where('date', $request->date)
            ->where('user_id', $user_id)
            ->get();

        $barber_target = BarberDetails::where('user_id', $user_id)->value('target_achieved_at');

        return response()->json(['users' => $user, 'appointments' => $appointments, 'target' => $barber_target], 200);
    }

    public function concludeAppointment(ConcludeAppointmentRequest $request)
    {
        $data = $request->validated();
        try {

            $appointment = Appointment::find($data['appointment_id']);

            if (empty($appointment)) {
                return response()->json(['message' => "Termin ne postoji!"], 404);
            }

            if ($appointment->status === AppointmentStatusEnum::CONCLUDED) {
                return response()->json(['message' => 'Termin je već zaključen'], 500);
            }

            $user = User::find($appointment->user_id);
            if (empty($user)) {
                return response()->json(['message' => "Korisnik ne postoji!"], 404);
            }
            
            $appointment->update([
                'status' => AppointmentStatusEnum::CONCLUDED,
                'customer_name' => $data['customer_name'],
                'price' => $data['price'],
                'barber_total' => $data['price'] * $user->percentage
            ]);

            $this->barberService->calculateBarberDetails($appointment);

            return response()->json(['message' => 'Uspješno zaključen termin!'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => "Greška: " . $e->getMessage()], 403);
        }
    }
}
