<?php

namespace App\Services;

use App\Models\CosmeticsWarehouse;
use Carbon\Carbon;
use Illuminate\Http\Request;

/**
 * Class CosmeticsWarehouseService.
 */
class CosmeticsWarehouseService
{
    public static function createFromProcurementObserver(Request $request)
    {
        $date = Carbon::parse($request->date)->format('Y.m.d');
        $warehouse = CosmeticsWarehouse::create([
            'cosmetics_procurements_id' => $request->cosmetics_procurements_id,
            'cosmetics_id'              => $request->cosmetics_id,
            'quantity'                  => $request->quantity,
            'purchase_price'            => $request->purchase_price,
            'date'                      => $date,
            'name'                      => $request->name
        ]);
        $warehouse->save();
    }

    public static function updateFromProcurementObserver(Request $request)
    {
        $warehouse = CosmeticsWarehouse::where('cosmetics_procurements_id', $request->cosmetics_procurements_id);

        $warehouse->update([
            'cosmetics_id'      => $request->cosmetics_id,
            'quantity'          => $request->quantity,
            'purchase_price'    => $request->purchase_price,
            'name'              => $request->name
        ]);
    }

    public static function updateFromSaleCreation(Request $request)
    {
        $warehouse = CosmeticsWarehouse::where('id', $request['id'])->first();
        $warehouse->quantity = $warehouse->quantity - $request['quantity'];
        $warehouse->sell_price = $request['sell_price'];
        $warehouse->save();
    }

    public static function updateFromSaleUpdate(Request $request)
    {
    }
}
