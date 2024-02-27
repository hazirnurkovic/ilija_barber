<?php

namespace App\Observers;

use App\Http\Controllers\ReportController;
use App\Models\Appointment;
use App\Models\Finance;
use Exception;
use Illuminate\Http\Request;

class FinanceObserver
{
    /**
     * Handle the Finance "created" event.
     */
    public function created(Finance $finance): void
    {
        $date = $finance->date;

        Appointment::where('date', $date)
            ->where('status', '!=', 3)
            ->update([
                'status' => 3
            ]);

        $request = new Request();
        $request->merge(['date', $date]);
        ReportController::sendDailyReportEmail($request);
    }

    /**
     * Handle the Finance "updated" event.
     */
    public function updated(Finance $finance): void
    {
        $date = $finance->date;
        $request = new Request();
        $request->merge(['date', $date]);
        ReportController::sendDailyReportEmail($request);
    }

    /**
     * Handle the Finance "deleted" event.
     */
    public function deleted(Finance $finance): void
    {
        //
    }

    /**
     * Handle the Finance "restored" event.
     */
    public function restored(Finance $finance): void
    {
        //
    }

    /**
     * Handle the Finance "force deleted" event.
     */
    public function forceDeleted(Finance $finance): void
    {
        //
    }
}
