<?php

namespace App\Observers;

use App\Models\CosmeticsSale;
use App\Models\CosmeticsWarehouse;
use App\Services\CosmeticsWarehouseService;
use Illuminate\Http\Request;

class CosmeticsSalesObserver
{
    /**
     * Handle the CosmeticsSale "created" event.
     */
    public function created(CosmeticsSale $cosmeticsSale): void
    {
        $request = new Request();
        $request->merge([
            'id'            => $cosmeticsSale->cosmetics_warehouse_id,
            'quantity'      => $cosmeticsSale->quantity,
            'sell_price'    => $cosmeticsSale->sell_price
        ]);

        CosmeticsWarehouseService::updateFromSaleCreation($request);
    }

    /**
     * Handle the CosmeticsSale "updated" event.
     */
    public function updated(CosmeticsSale $cosmeticsSale): void
    {
        //
    }

    /**
     * Handle the CosmeticsSale "deleted" event.
     */
    public function deleted(CosmeticsSale $cosmeticsSale): void
    {
        $warehouse = CosmeticsWarehouse::where('id', $cosmeticsSale->cosmetics_warehouse_id)->first();
        if($warehouse) {
            $warehouse->sell_price = null;
            $warehouse->quantity = $warehouse->quantity + $cosmeticsSale->quantity;
            $warehouse->update();
        }
    }

    /**
     * Handle the CosmeticsSale "restored" event.
     */
    public function restored(CosmeticsSale $cosmeticsSale): void
    {
        //
    }

    /**
     * Handle the CosmeticsSale "force deleted" event.
     */
    public function forceDeleted(CosmeticsSale $cosmeticsSale): void
    {
        //
    }
}
