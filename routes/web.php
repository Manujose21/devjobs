<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VacantController;
use App\Http\Controllers\NotificationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware('auth', 'verified')->group(function () {
    Route::get('/dashboard', [VacantController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // vacants
    Route::get('/vacants/create', [VacantController::class, 'create'])->name('vacants.create');
    Route::post('/vacants/store', [VacantController::class, 'store'])->name('vacants.store');
    Route::get('/vacants/search', [VacantController::class, 'search'])->name('vacants.search');
    Route::post('/vacants/{vacant}/apply', [VacantController::class, 'apply'])->name('vacants.apply');
    Route::get('/vacants/{vacant}/postulate', [VacantController::class, 'postulateShow'])->name('vacants.postulate');
    Route::get('/vacants/{vacant}', [VacantController::class, 'show'])->name('vacants.show');
    Route::delete('/vacants/{vacant}', [VacantController::class, 'destroy'])->name('vacants.destroy');
    Route::put('/vacants/{vacant}', [VacantController::class, 'update'])->name('vacants.update');

    // notifications
    Route::get('/notifications', NotificationController::class)->name('notifications');
    // postulates
    Route::get('/vacants/postulates', [VacantController::class, 'index'])->name('vacants.postulates');

});

require __DIR__.'/auth.php';
