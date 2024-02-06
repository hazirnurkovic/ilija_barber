<?php

namespace App\Filters;

use Hashemi\QueryFilter\QueryFilter;

class CosmeticFilter extends QueryFilter
{
    public function applyDateProperty($date)
    {
        return $this->builder->where("sell_date", $date);
    }

    public function applyFromProperty($from)
    {
        return $this->builder->where("sell_date", ">=", $from);
    }

    public function applyToProperty($to)
    {
        return $this->builder->where("sell_date", "<=", $to);
    }
}
