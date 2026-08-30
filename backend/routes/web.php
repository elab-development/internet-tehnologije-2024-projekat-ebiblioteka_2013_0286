<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Route::middleware(['guest'])->group(function () {
//     Route::get('/', [HomeController::class, 'index'])->name('home');
//     Route::get('/login', [HomeCpntroller::class, 'login'])->name('login');
// });

// Route::middleware(['auth'])->group(function () {
//     Route::get('/dashboard', [UserController::class, 'index'])->name('dashboard');
// });
