<?php

namespace App\Services;

use App\Filters\CosmeticFilter;
use App\Models\Cosmetic;
use App\Models\CosmeticsSale;
use Illuminate\Http\Request;

/**
 * Class CosmeticService.
 */
class CosmeticService
{
    public function __construct(private CosmeticsSale $cosmetic, private CosmeticFilter $cosmeticFilter)
    {
    }

    public function getCosmeticsData(Request $request)
    {
        return $this->cosmetic::query()->filter($this->cosmeticFilter)->sum('total');
    }
}
