<?php

namespace App\Services;

use App\Filters\CosmeticsSaleFilter;
use App\Models\CosmeticsSale;
use Illuminate\Http\Request;

/**
 * Class CosmeticService.
 */
class CosmeticService
{
    public function __construct(private CosmeticsSale $cosmetic, private CosmeticsSaleFilter $cosmeticFilter)
    {
    }

    public function getCosmeticsSaleData(Request $request)
    {
        return $this->cosmetic::query()
            ->with(['cosmetics', 'cosmetics_warehouse'])
            ->filter($this->cosmeticFilter)
            ->get()
            ->toArray();
    }
}
