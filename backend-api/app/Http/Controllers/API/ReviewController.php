<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ReviewService;
use App\Models\Package;
use App\Models\TourGuide;

class ReviewController extends Controller
{
    protected $reviewService;

    public function __construct(ReviewService $reviewService)
    {
        $this->reviewService = $reviewService;
    }

    // Method to get all reviews for a package or tour guide
    public function index(Request $request, $reviewableType, $reviewableId)
    {
        if ($reviewableType == 'package') {
            return $this->indexPackageReviews($reviewableId);
        } elseif ($reviewableType == 'tour_guide') {
            return $this->indexTourGuideReviews($reviewableId);
        }

        return response()->json(['message' => 'No valid parameter provided'], 400);
    }

    // Method to get all reviews for a package
    public function indexPackageReviews($packageId)
    {
        $reviews = $this->reviewService->getReviewsByPackage($packageId);
        return response()->json([
            'reviews' => $reviews,
        ]);
    }

    // Method to get all reviews for a tour guide
    public function indexTourGuideReviews($tourGuideId)
    {
        $reviews = $this->reviewService->getReviewsByTourGuide($tourGuideId);
        return response()->json([
            'reviews' => $reviews,
        ]);
    }

    // Method to create a new review for a package or tour guide
    public function create(Request $request, $reviewableType, $reviewableId)
    {
        $request->validate([
            'user_id' => 'required|integer', // Assuming you have a users table and user is logged in
            'rating' => 'required|integer|min:1|max:5', // Rating between 1 and 5
            'review' => 'nullable|string',
        ]);

        if ($reviewableType == 'package') {
            return $this->createPackageReview($request, $reviewableId);
        } elseif ($reviewableType == 'tour_guide') {
            return $this->createTourGuideReview($request, $reviewableId);
        }

        return response()->json(['message' => 'Invalid reviewable type'], 400);
    }

    // Method to create a new review for a package
    public function createPackageReview(Request $request, $packageId)
{
    $package = Package::find($packageId);

    if (!$package) {
        return response()->json(['message' => 'Package not found'], 404);
    }

    $review = $this->reviewService->createReviewForPackage(
        $packageId,
        $request->user_id,
        $request->rating,
        $request->review
    );

    return response()->json([
        'message' => 'Review added successfully!',
        'review' => $review
    ], 201); // Ensure 201 is returned
}
    // Method to create a new review for a tour guide
    public function createTourGuideReview(Request $request, $tourGuideId)
    {
        $tourGuide = TourGuide::find($tourGuideId);

        if (!$tourGuide) {
            return response()->json(['message' => 'Tour guide not found'], 404);
        }

        $review = $this->reviewService->createReviewForTourGuide($tourGuideId, $request->user_id, $request->rating, $request->review);

        return response()->json([
            'message' => 'Review added successfully!',
            'review' => $review
        ], 201);
    }

    // Method to update a review
    public function update(Request $request, $reviewId)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string',
        ]);

        $review = $this->reviewService->getReviewById($reviewId);

        if (!$review) {
            return response()->json(['message' => 'Review not found'], 404);
        }

        $updatedReview = $this->reviewService->updateReview($reviewId, $request->rating, $request->review);

        return response()->json([
            'message' => 'Review updated successfully!',
            'review' => $updatedReview
        ]);
    }

    // Method to delete a review
    public function destroy($reviewId)
    {
        $deleted = $this->reviewService->deleteReview($reviewId);

        if (!$deleted) {
            return response()->json(['message' => 'Review not found'], 404);
        }

        return response()->json(['message' => 'Review deleted successfully']);
    }
}
