<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VacantController;
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

Route::get('/dashboard', [VacantController::class, 'index'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // vacants
    Route::get('/vacants/create', [VacantController::class, 'create'])->name('vacants.create');
    Route::post('/vacants/store', [VacantController::class, 'store'])->name('vacants.store');

    // postulates
    Route::get('/vacants/postulates', [VacantController::class, 'index'])->name('vacants.postulates');

});

require __DIR__.'/auth.php';
