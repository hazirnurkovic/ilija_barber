<?php

namespace App\Services;

use App\Models\CosmeticsWarehouse;
use Illuminate\Http\Request;

/**
 * Class CosmeticsWarehouseService.
 */
class CosmeticsWarehouseService
{
    public static function createFromObserver(Request $request)
    {
        $warehouse = CosmeticsWarehouse::create([
            'cosmetics_procurements_id' => $request->cosmetics_procurements_id,
            'cosmetics_id'              => $request->cosmetics_id,
            'quantity'                  => $request->quantity,
            'purchase_price'            => $request->purchase_price,
            'date'                      => $request->date
        ]);
        $warehouse->save();
    }
}
