<?php

namespace App\Services;

use App\Models\BarberDetails;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

/**
 * Class BarberService.
 */
class BarberService
{


    public function calculateBarberDetails($appointment): void
    {
        //check if record exists
        $user_id = $appointment->user_id;
        $date = Carbon::createFromFormat('Y-m-d', $appointment->date);
        $month = $date->month;
        $year = $date->year;

        //barber's target amount
        $target = User::where('id', $user_id)->value('bank_amount');

        $query = BarberDetails::where('user_id', $user_id)->where('month', $month)
            ->where('year', $year)->first();

        //if no record create one
        if (!$query)
        {
            $insert = BarberDetails::create([
                'user_id' => $appointment->user_id,
                'month' => $month,
                'year' => $year,
                'total' => $appointment->price
            ]);
            $insert->save();
        }
        else
        {
            if (empty($query->target_achieved_at)) {
                $query->total += $appointment->price;
                $query->update();


                if ($query->total >= $target) {
                    $query->update([
                        'target_achieved_at' => now(),
                        'appointment_id' => $appointment->id,
                        'difference_amount' => $query->total - $target
                    ]);
                }
            }
            else {
                $query->total += $appointment->price;
                $query->update();
               }
        }
    }

}
