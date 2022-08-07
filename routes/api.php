<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//// ADMIN
// GET
Route::get('/admin/places', 'App\Http\Controllers\AdminController@sendPlaceData');
Route::get('/admin/bands', 'App\Http\Controllers\AdminController@sendLineUpData');
Route::get('/admin/year', 'App\Http\Controllers\AdminController@sendYearData');
Route::get('/admin/bands/rank', 'App\Http\Controllers\HomeController@sendSortedBands');

// POST
Route::post('/admin/bands', 'App\Http\Controllers\AdminController@storeBands');
Route::post('/admin/year', 'App\Http\Controllers\AdminController@storeYear');

// PUT
Route::put('/admin/year/{id}/update', 'App\Http\Controllers\AdminController@updateYear');
Route::put('/admin/band/{id}', 'App\Http\Controllers\AdminController@updateBand');

// DELETE
Route::delete('/admin/band/{id}', 'App\Http\Controllers\AdminController@deleteBand');
