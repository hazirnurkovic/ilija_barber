<?php

namespace App\Observers;

use App\Http\Controllers\ReportController;
use App\Models\Finance;
use Illuminate\Http\Request;

class FinanceObserver
{
    /**
     * Handle the Finance "created" event.
     */
    public function __construct(
        private ReportController $reportController
    ) {}

    public function created(Finance $finance): void
    {
        $date = $finance->date;
        $request = new Request();
        $request->merge(['date' => $date]);
        $this->reportController->sendDailyReportEmail($request);
    }

    /**
     * Handle the Finance "updated" event.
     */
    public function updated(Finance $finance): void
    {
        $date = $finance->date;
        $request = new Request();
        $request->merge(['date', $date]);
        $this->reportController->sendDailyReportEmail($request);
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
