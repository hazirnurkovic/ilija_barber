<?php

namespace App\Services;

use App\Models\Appointment;
use App\Models\BarberDetails;
use App\Models\CosmeticsSale;
use App\Models\Expense;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        $user = User::where('id', $user_id)->select('bank_amount', 'percentage')->first();


        if ($user) {
            $bankAmount = $user->bank_amount;
            $percentage = $user->percentage;
         }
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


                if ($query->total >= $bankAmount) {

                    $difference_amount = ($percentage != 0) ? ($query->total - $bankAmount) * $percentage : 0;

                    $query->update([
                        'target_achieved_at' => now(),
                        'appointment_id' => $appointment->id,
                        'start_date' => $appointment->start_date,
                        'difference_amount' => $difference_amount
                    ]);
                }
            }
            else {
                $query->total += $appointment->price;
                $query->update();
               }
        }
    }

    public function calculateBarbersEarnings($request) : array
    {

        $barberDetails = BarberDetails::whereNotNull('appointment_id')
            ->get(['user_id', 'start_date', 'difference_amount'])
            ->keyBy('user_id');

         $query = Appointment::query()
            ->select('appointments.user_id', DB::raw('SUM(appointments.barber_total) as total_barber_earned'))
            ->groupBy('appointments.user_id');

        // Apply filter for specific date or date range
        if ($request->has('date')) {
            $query->where('appointments.date', $request->date);
        } elseif ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('appointments.date', [$request->start_date, $request->end_date]);
        }
         $query->where(function ($query) use ($barberDetails) {
            foreach ($barberDetails as $userId => $details) {
                $startDate = $details->start_date;
                $query->orWhere(function ($q) use ($userId, $startDate) {
                      $q->where('appointments.user_id', $userId)
                        ->where('appointments.start_date', '>', $startDate);
                });
            }
        });

         // Step 3: Get the res  ults and map difference amount

          $results = $query->get()->map(function ($appointment) use ($barberDetails, $request) {
             $differenceAmount = 0;
            $appointmentDate = $request->input('date');
            $startDate = $request->input('start_date');
               if (isset($barberDetails[$appointment->user_id])) {
                $barberDetail = $barberDetails[$appointment->user_id];
                 if (($appointmentDate && $barberDetail->start_date->toDateString() === $appointmentDate) ||
                    ($startDate && $barberDetail->start_date->toDateString() === $startDate)) {
                    $differenceAmount = $barberDetail->difference_amount;
                }
            }

            $appointment->total_barber_earned += $differenceAmount;
            return $appointment;
        });
          $resultsArray = $results->toArray();

        $allUserIds = array_unique(array_column($resultsArray, 'user_id'));

        // Get user IDs with barber details
        $userIdsWithBarberDetails = $barberDetails->keys()->toArray();
        // Create a map of user IDs to their earnings
        $earningsMap = [];
        foreach ($resultsArray as $result) {
            $earningsMap[$result['user_id']] = $result['total_barber_earned'];
        }


        // Add users with 0 total_barber_earned where they don't have barber details
        foreach ($allUserIds as $userId) {
            if (!in_array($userId, $userIdsWithBarberDetails)) {
                $earningsMap[$userId] = 0;
            }
        }

        foreach ($barberDetails as $userId => $details) {
            if (!isset($earningsMap[$userId]) || $earningsMap[$userId] == 0) {
                $earningsMap[$userId] = $details->difference_amount;
            }
        }


        //if percentage = 0, barber_total is always 0


        // Convert the earnings map back to an array
        $finalResultsArray = [];
        foreach ($earningsMap as $userId => $totalBarberEarned) {
            $finalResultsArray[] = [
                'user_id' => $userId,
                'total_barber_earned' => $totalBarberEarned,
            ];
        }

        return $finalResultsArray;
    }

    public function calculateAppointmentsTotal($request) : array
    {
        $total = Appointment::with('user:id,first_name,last_name,percentage')
            ->orderBy('user_id')
            ->selectRaw('user_id, SUM(price) as price, sum(barber_total) as barber_total')
            ->groupBy('user_id');

        if ($request->has('date')) {
            $total->where('date', $request->date);
        } elseif ($request->has('start_date') && $request->has('end_date')) {
            $total->whereBetween('date', [$request->start_date, $request->end_date]);
        }

        return $total->get()->toArray();
    }

    public function calculateCosmeticsTotal($request)
    {
        $query = CosmeticsSale::query();

        if ($request->has('date')) {
            $query->where('date', $request->date);
        } elseif ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('date', [$request->start_date, $request->end_date]);
        }

        return $query->sum('total');

    }

    public function calculateBarberShopEarnings(array $appointments, array $barberEarnings)
    {

        $totalEarningsForBarberShop = 0;
        $barberShopEarnings = [];

         $barberEarningsMap = [];
        foreach ($barberEarnings as $earning) {
            $barberEarningsMap[$earning['user_id']] = $earning['total_barber_earned'];
        }
          // Calculate earnings for each barber and the total for the barber shop
        foreach ($appointments as $appointment) {
            $userId = $appointment['user_id'];
            $price = $appointment['price'];
            $totalBarberEarned = $barberEarningsMap[$userId] ?? 0;
            $barberShopEarning = $price - $totalBarberEarned;

            $barberShopEarnings[] = [
                'user_id' => $userId,
                'total' => $price,
                'barber_total' => $totalBarberEarned,
                'barber_shop_earning' => $barberShopEarning,
                'user' => $appointment['user']

            ];

            $totalEarningsForBarberShop += $barberShopEarning;
        }


        return [
            'barber_shop_earnings' => $barberShopEarnings,
            'total_earnings_for_barber_shop' => $totalEarningsForBarberShop,
        ];

    }

}
