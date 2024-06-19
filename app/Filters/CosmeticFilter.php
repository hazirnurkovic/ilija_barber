<?php

namespace App\Filters;

use Hashemi\QueryFilter\QueryFilter;

class CosmeticFilter extends QueryFilter
{
    public function applyDateProperty($date)
    {
        return $this->builder->where("date", $date);
    }

    public function applyStartDateProperty($from)
    {
        return $this->builder->where("date", ">=", $from);
    }

    public function applyEndDateProperty($to)
    {
        return $this->builder->where("date", "<=", $to);
    }
}
