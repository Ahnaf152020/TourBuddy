<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\TourGuidesController;
use App\Http\Controllers\API\SkillsController;
use App\Http\Controllers\API\PackagesController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ReviewController;



Route::group(['middleware' => 'api'], function () {

    Route::post('/register', [UserController::class,'register']);
    Route::post('/login', [UserController::class,'login']);
    Route::post('/logout', [UserController::class,'logout']);

    Route::post('/tour_guides/register', [TourGuidesController::class, 'register']);
    Route::post('/tour_guides/login', [TourGuidesController::class, 'login']);
    Route::post('/tour_guides/logout', [TourGuidesController::class, 'logout']);
    Route::get('/tour_guides', [TourGuidesController::class, 'getAllTourGuides']);

    Route::prefix('skills')->group(function () {
        Route::post('/create', [SkillsController::class, 'create']); // Create Skill
        Route::get('/guide/{guideId}', [SkillsController::class, 'index']); // Get Skills for a Guide
        Route::get('/all', [SkillsController::class, 'getSkillsWithGuides']); // Get Skills with Guide Details
        Route::put('/update/{id}', [SkillsController::class, 'update']); // Update Skill
        Route::delete('/delete/{id}', [SkillsController::class, 'destroy']); // Delete Skill
    });

    // Packages routes
    Route::post('/package', [PackagesController::class, 'create']);  // Create a new package
    Route::get('/package', [PackagesController::class, 'index']);  // Get all packages
    Route::put('/package/{id}', [PackagesController::class, 'update']);  // Update package by ID
    Route::delete('/package/{id}', [PackagesController::class, 'destroy']);  // Delete package by ID


    Route::get('/package/{packageId}/reviews', [ReviewController::class, 'index']); // Get all reviews for a package
    Route::post('/package/{packageId}/reviews', [ReviewController::class, 'create']); // Create a review
    Route::put('/reviews/{id}', [ReviewController::class, 'update']); // Update a review
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']); // Delete a review
    

    });




