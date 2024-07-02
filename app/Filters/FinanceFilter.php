<?php

namespace App\Filters;

use Hashemi\QueryFilter\QueryFilter;

class FinanceFilter extends QueryFilter
{
    public function applyStartDateProperty($start_date)
    {
        return $this->builder->where('date', '>=', $start_date);
    }

    public function applyEndDateProperty($end_date)
    {
        return $this->builder->where('date', '<=', $end_date);
    }

    public function applyDateProperty($date)
    {
        return $this->builder->where('date', $date);
    }
}
