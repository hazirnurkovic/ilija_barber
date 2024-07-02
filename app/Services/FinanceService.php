<?php

namespace App\Services;

use App\Filters\FinanceFilter;
use App\Models\Finance;
use Illuminate\Http\Request;

/**
 * Class FinanceService.
 */
class FinanceService
{
    public function __construct(
        private Finance $finance,
        private FinanceFilter $financeFilter
    ) {}

    public function getFinanceData(Request $request)
    {
        return $this->finance::query()
            ->filter($this->financeFilter)
            ->get()
            ->toArray();
    }
}
