<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\TourGuidesController;
use App\Http\Controllers\API\SkillsController;
use App\Http\Controllers\API\PackagesController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ReviewController;
use App\Http\Controllers\API\PaymentController;
use App\Http\Controllers\API\AdminController;

Route::group(['middleware' => 'api'], function () {

    // User Routes
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/profile', [UserController::class, 'profile']);
    Route::get('/tour_guides/profile', [TourGuidesController::class, 'profile']);

    // Tour Guides Routes
    Route::post('/tour_guides/register', [TourGuidesController::class, 'register']);
    Route::post('/tour_guides/login', [TourGuidesController::class, 'login']);
    Route::post('/tour_guides/logout', [TourGuidesController::class, 'logout']);
    Route::get('/tour_guides', [TourGuidesController::class, 'getAllTourGuides']);

    // Skills Routes
    Route::prefix('skills')->group(function () {
        Route::post('/create', [SkillsController::class, 'create']); // Create Skill
        Route::get('/guide/{guideId}', [SkillsController::class, 'index']); // Get Skills for a Guide
        Route::get('/all', [SkillsController::class, 'getSkillsWithGuides']); // Get Skills with Guide Details
        Route::put('/update/{id}', [SkillsController::class, 'update']); // Update Skill
        Route::delete('/delete/{id}', [SkillsController::class, 'destroy']); // Delete Skill
    });

    // Packages Routes
    Route::post('/package', [PackagesController::class, 'create']);  // Create a new package
    Route::get('/package', [PackagesController::class, 'index']);  // Get all packages
    Route::put('/package/{id}', [PackagesController::class, 'update']);  // Update package by ID
    Route::delete('/package/{id}', [PackagesController::class, 'destroy']);  // Delete package by ID

    // Review Routes
    Route::get('/package/{packageId}/reviews', [ReviewController::class, 'index']); // Get all reviews for a package
    Route::post('/package/{packageId}/reviews', [ReviewController::class, 'create']); // Create a review
    Route::put('/reviews/{id}', [ReviewController::class, 'update']); // Update a review
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']); // Delete a review

    // Payment Routes
    Route::post('/payment/create', [PaymentController::class, 'createPayment']);
    Route::post('/payment/execute', [PaymentController::class, 'executePayment']);
    Route::get('/payment/{paymentId}', [PaymentController::class, 'getPayment']);
    Route::get('/payments/success', [PaymentController::class, 'getSuccessfulPayments']);
    Route::delete('/payments/failed', [PaymentController::class, 'deleteFailedPayments']);
    Route::get('/payment/verify/{trxId}', [PaymentController::class, 'verifyTransaction']);

// Admin Routes
Route::prefix('admin')->group(function () {
    Route::post('/register', [AdminController::class, 'register']);
    Route::post('/login', [AdminController::class, 'login']);
    Route::delete('/tour-guide/{id}', [AdminController::class, 'deleteTourGuide']);
    Route::get('/payments', [AdminController::class, 'getAllPayments']);
    Route::delete('/payment/{id}', [AdminController::class, 'deletePayment']);
    Route::put('/payment/{id}', [AdminController::class, 'updatePayment']);
    Route::get('/payment/{id}', [AdminController::class, 'getPayment']);
});   

});
