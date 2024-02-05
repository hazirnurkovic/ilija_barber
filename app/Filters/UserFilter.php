<?php

namespace App\Filters;

use Hashemi\QueryFilter\QueryFilter;

class UserFilter extends QueryFilter
{
    public function applyUserIdsProperty($users_ids)
    {
        return $this->builder->whereIn('id', $users_ids);
    }
}
