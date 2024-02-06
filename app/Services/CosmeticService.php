<?php

namespace App\Services;

use App\Filters\CosmeticFilter;
use App\Models\Cosmetic;
use Illuminate\Http\Request;

/**
 * Class CosmeticService.
 */
class CosmeticService
{
    public function __construct(private Cosmetic $cosmetic, private CosmeticFilter $cosmeticFilter)
    {
    }

    public function getCosmeticsData(Request $request)
    {
        return $this->cosmetic::query()->filter($this->cosmeticFilter)->sum('price');
    }
}
