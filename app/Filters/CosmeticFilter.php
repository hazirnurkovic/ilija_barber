<?php

namespace App\Filters;

use Hashemi\QueryFilter\QueryFilter;

class CosmeticFilter extends QueryFilter
{
    public function applyDateProperty($date)
    {
        $this->builder->where('sell_date', $date);
    }
}
