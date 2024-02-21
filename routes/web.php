<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\FinancesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CosmeticsController;
use App\Http\Controllers\ReportsController;
use Illuminate\Support\Facades\Route;
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
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
    return Inertia::render('Auth/Login', [
        'canResetPassword' => Route::has('password.request'),
        'status' => session('status'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('appointments', AppointmentController::class);
    Route::post('getAllAppointmentsForSpecificDateForUser', [AppointmentController::class, 'getAllAppointmentsForSpecificDateForUser']);
    Route::post('concludeAppointment', [AppointmentController::class, 'concludeAppointment']);
});

Route::middleware(['is_admin'])->group(function () {
    Route::resource('create_barber', UserController::class);
    Route::post('delete_barber', [UserController::class, 'delete_barber']);
    Route::post('getAllAppointmentsForSpecificDate', [AppointmentController::class, 'getAllAppointmentsForSpecificDate']);
    Route::resource('cosmetics', CosmeticsController::class);
    Route::resource('reports', ReportsController::class);
    Route::resource('finances', FinancesController::class);
    Route::post('getCosmetics', [CosmeticsController::class, 'getCosmeticsData']);
    Route::post('getReports', [ReportsController::class, 'getReports']);
});

Route::post('sendDailyReportEmail', [ReportsController::class, 'sendDailyReportEmail']);

require __DIR__ . '/auth.php';
