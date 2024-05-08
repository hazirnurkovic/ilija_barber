<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\CosmeticsProcurementController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CosmeticController;
use App\Http\Controllers\CosmeticsSaleController;
use App\Http\Controllers\CosmeticsWarehouseController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {

    return Inertia::render('Auth/Login', [
        'canResetPassword' => Route::has('password.request'),
        'status' => session('status'),
    ]);
})->name('welcome');

Route::get('/dashboard', function () {

    $successMessage = Session::get('success');
    $errorrMessage = Session::get('error');
    return Inertia::render('Dashboard', [
        'success' => $successMessage,
        'error' => $errorrMessage,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::resource('appointments', AppointmentController::class);
    Route::post('getAllAppointmentsForSpecificDateForUser', [AppointmentController::class, 'getAllAppointmentsForSpecificDateForUser']);
    Route::post('concludeAppointment', [AppointmentController::class, 'concludeAppointment']);
    Route::post('sendDailyReportEmail', [ReportController::class, 'sendDailyReportEmail'])->name('send_daily_report_email');
    Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
    Route::post('getReportsDataForRangeOfDates', [ReportController::class, 'getReportsDataForRangeOfDates']);
});

Route::middleware(['is_admin'])->group(function () {
    Route::resource('create_barber', UserController::class);
    Route::post('delete_barber', [UserController::class, 'delete_barber']);


    Route::post('getAllAppointmentsForSpecificDate', [AppointmentController::class, 'getAllAppointmentsForSpecificDate']);

    Route::resource('cosmetics', CosmeticController::class);

    Route::resource('finances', FinanceController::class);
    Route::post('getFinancesReport', [FinanceController::class, 'getFinancesReport']);

    Route::post('getDailyReportData', [ReportController::class, 'getDailyReportData']);

    Route::resource('expenses', ExpenseController::class);
    Route::post('getExpenses', [ExpenseController::class, 'getExpenses']);

    Route::resource('cosmetics_procurements', CosmeticsProcurementController::class);
    Route::post('getProcurements', [CosmeticsProcurementController::class, 'getProcurements']);

    Route::resource('warehouse', CosmeticsWarehouseController::class);
    Route::get('getWarehouseDataForSales', [CosmeticsWarehouseController::class, 'getWarehouseDataForSales']);

    Route::resource('cosmetics_sales', CosmeticsSaleController::class);
    Route::post('getSalesData', [CosmeticsSaleController::class, 'getSalesData']);
});

require __DIR__ . '/auth.php';
