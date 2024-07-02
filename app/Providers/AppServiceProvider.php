<?php

namespace App\Providers;

use App\Models\CosmeticsProcurement;
use App\Models\CosmeticsSale;
use App\Models\Finance;
use App\Observers\CosmeticsProcurementObserver;
use App\Observers\CosmeticsSalesObserver;
use App\Observers\FinanceObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        CosmeticsProcurement::observe(CosmeticsProcurementObserver::class);
        CosmeticsSale::observe(CosmeticsSalesObserver::class);
        Finance::observe(FinanceObserver::class);
    }
}
