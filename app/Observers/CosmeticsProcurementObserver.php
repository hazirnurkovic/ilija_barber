<?php

namespace App\Observers;

use App\Models\CosmeticsProcurement;
use App\Services\CosmeticsWarehouseService;
use Illuminate\Http\Request;

class CosmeticsProcurementObserver
{
    /**
     * Handle the CosmeticsProcurement "created" event.
     */
    public function created(CosmeticsProcurement $cosmeticsProcurement): void
    {
        $request = new Request();
        $request->merge([
            'cosmetics_procurements_id' => $cosmeticsProcurement->id,
            'cosmetics_id'              => $cosmeticsProcurement->cosmetics_id,
            'quantity'                  => $cosmeticsProcurement->quantity,
            'purchase_price'            => $cosmeticsProcurement->purchase_price,
            'date'                      => $cosmeticsProcurement->date
        ]);

        CosmeticsWarehouseService::createFromObserver($request);
    }

    /**
     * Handle the CosmeticsProcurement "updated" event.
     */
    public function updated(CosmeticsProcurement $cosmeticsProcurement): void
    {
        //
    }

    /**
     * Handle the CosmeticsProcurement "deleted" event.
     */
    public function deleted(CosmeticsProcurement $cosmeticsProcurement): void
    {
        //
    }

    /**
     * Handle the CosmeticsProcurement "restored" event.
     */
    public function restored(CosmeticsProcurement $cosmeticsProcurement): void
    {
        //
    }

    /**
     * Handle the CosmeticsProcurement "force deleted" event.
     */
    public function forceDeleted(CosmeticsProcurement $cosmeticsProcurement): void
    {
        //
    }
}
