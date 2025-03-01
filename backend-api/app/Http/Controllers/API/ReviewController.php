<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ReviewService;
use App\Models\Review;
use App\Models\Package;

class ReviewController extends Controller
{
    protected $reviewService;

    public function __construct(ReviewService $reviewService)
    {
        $this->reviewService = $reviewService;
    }

    // Method to get all reviews for a package
    public function index($packageId)
    {
        $reviews = $this->reviewService->getReviewsByPackage($packageId);

        return response()->json([
            'reviews' => $reviews,
        ]);
    }

    // Method to create a new review
    public function create(Request $request, $packageId)
    {
        $request->validate([
            'user_id' => 'required|integer', // Assuming you have a users table and user is logged in
            'rating' => 'required|integer|min:1|max:5', // Rating between 1 and 5
            'review' => 'nullable|string',
        ]);

        $package = Package::find($packageId);

        if (!$package) {
            return response()->json(['message' => 'Package not found'], 404);
        }

        $review = $this->reviewService->createReview($packageId, $request->user_id, $request->rating, $request->review);

        return response()->json([
            'message' => 'Review added successfully!',
            'review' => $review
        ], 201);
    }

    // Method to update a review
    public function update(Request $request, $id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json(['message' => 'Review not found'], 404);
        }

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string',
        ]);

        $review = $this->reviewService->updateReview($id, $request->rating, $request->review);

        return response()->json([
            'message' => 'Review updated successfully!',
            'review' => $review
        ]);
    }

    // Method to delete a review
    public function destroy($id)
    {
        $deleted = $this->reviewService->deleteReview($id);

        if (!$deleted) {
            return response()->json(['message' => 'Review not found'], 404);
        }

        return response()->json(['message' => 'Review deleted successfully']);
    }
}
