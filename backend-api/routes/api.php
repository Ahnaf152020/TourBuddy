<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\TourGuidesController;
use App\Http\Controllers\API\SkillsController;
use App\Http\Controllers\API\PackagesController;
use App\Http\Controllers\API\UserController;


Route::group(['middleware' => 'api'], function () {

    Route::post('/register', [UserController::class,'register']);
    Route::post('/login', [UserController::class,'login']);
    Route::post('/logout', [UserController::class,'logout']);

    Route::post('/tour_guides/register', [TourGuidesController::class, 'register']);
    Route::post('/tour_guides/login', [TourGuidesController::class, 'login']);
    Route::post('/tour_guides/logout', [TourGuidesController::class, 'logout']);

    Route::post('/skills', [SkillsController::class, 'create']);  // Create a new skill
    Route::get('/skills/{guideId}', [SkillsController::class, 'index']);  // Get skills by guide
    Route::put('/skills/{id}', [SkillsController::class, 'update']);  // Update skill by ID
    Route::delete('/skills/{id}', [SkillsController::class, 'destroy']);  // Delete skill by ID

    // Packages routes
    Route::post('/packages', [PackagesController::class, 'create']);  // Create a new package
    Route::get('/packages', [PackagesController::class, 'index']);  // Get all packages
    Route::put('/packages/{id}', [PackagesController::class, 'update']);  // Update package by ID
    Route::delete('/packages/{id}', [PackagesController::class, 'destroy']);  // Delete package by ID


    });




