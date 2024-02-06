<?php

namespace App\Filters;

use Hashemi\QueryFilter\QueryFilter;

class AppointmentFilter extends QueryFilter
{
    public function applyUserIdsProperty($users_ids)
    {
        return $this->builder->whereIn('user_id', $users_ids);
    }

    public function applyFromProperty($from)
    {
        return $this->builder->where('date', '>=', $from);
    }

    public function applyToProperty($to)
    {
        return $this->builder->where('date', '<=', $to);
    }

    public function applyDateProperty($date)
    {
        return $this->builder->where('date', $date);
    }
}
