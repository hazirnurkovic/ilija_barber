<?php

namespace App\Services;

use App\Filters\ExpensesFilter;
use App\Models\Expense;
use Illuminate\Http\Request;

/**
 * Class ExpenseService.
 */
class ExpenseService
{
    public function __construct(
        private Expense $expense,
        private ExpensesFilter $expensesFilter
    ) {}

    public function getExpensesForReports(Request $request)
    {
        return $this->expense::select('name', 'price')
            ->filter($this->expensesFilter)
            ->get()
            ->toArray();
    }
}
