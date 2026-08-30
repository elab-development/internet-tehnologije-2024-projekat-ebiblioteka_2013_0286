<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\BookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/books', [BookController::class, 'index']);
    Route::get('/books/{book}', [BookController::class, 'show']);
});


Route::resource('books', BookController::class);


//admin

Route::group(['middleware' => ['auth:admin-api']], function () {
    Route::get('/admin/profile', function (Request $request) {
        return auth('admin-api')->user();
    });
    Route::get('/admin/books', [BookController::class, 'index']);
});
Route::post('/admin/login', [AuthController::class, 'loginAdmin']);
