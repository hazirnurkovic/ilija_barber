<?php

namespace App\Observers;

use App\Http\Controllers\ExpenseController;
use App\Models\CosmeticsProcurement;
use App\Models\CosmeticsWarehouse;
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
            'total'                     => $cosmeticsProcurement->total,
            'date'                      => $cosmeticsProcurement->date,
        ]);

        CosmeticsWarehouseService::createFromProcurementObserver($request);
        ExpenseController::createFromObserver($request);
    }

    /**
     * Handle the CosmeticsProcurement "updated" event.
     */
    public function updated(CosmeticsProcurement $cosmeticsProcurement): void
    {
        $request = new Request();
        $request->merge([
            'cosmetics_procurements_id' => $cosmeticsProcurement->id,
            'cosmetics_id'              => $cosmeticsProcurement->cosmetics_id,
            'quantity'                  => $cosmeticsProcurement->quantity,
            'purchase_price'            => $cosmeticsProcurement->purchase_price,
            'total'                     => $cosmeticsProcurement->total,
        ]);

        CosmeticsWarehouseService::updateFromProcurementObserver($request);
    }

    /**
     * Handle the CosmeticsProcurement "deleted" event.
     */
    public function deleted(CosmeticsProcurement $cosmeticsProcurement): void
    {
        CosmeticsWarehouse::where('cosmetics_procurements_id', $cosmeticsProcurement->id)->delete();
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
