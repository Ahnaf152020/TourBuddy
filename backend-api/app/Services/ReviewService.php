<?php

namespace App\Services;

use App\Models\Review;

class ReviewService
{
    // Get all reviews for a package
    public function getReviewsByPackage($packageId)
    {
        return Review::where('package_id', $packageId)->get();
    }

    // Get all reviews for a tour guide
    public function getReviewsByTourGuide($tourGuideId)
    {
        return Review::where('tour_guide_id', $tourGuideId)->get();
    }

    // Create a review for a package
    public function createReviewForPackage($packageId, $userId, $rating, $review)
    {
        return Review::create([
            'package_id' => $packageId,
            'user_id' => $userId,
            'rating' => $rating,
            'review' => $review,
        ]);
    }

    // Create a review for a tour guide
    public function createReviewForTourGuide($tourGuideId, $userId, $rating, $review)
    {
        return Review::create([
            'tour_guide_id' => $tourGuideId,
            'user_id' => $userId,
            'rating' => $rating,
            'review' => $review,
        ]);
    }

    // Get a review by ID
    public function getReviewById($reviewId)
    {
        return Review::find($reviewId);
    }

    // Update an existing review
    public function updateReview($id, $rating, $reviewText)
    {
        $review = Review::find($id);
        if ($review) {
            $review->update([
                'rating' => $rating,
                'review' => $reviewText,
            ]);
            return $review;
        }
        return null;
    }

    // Delete a review
    public function deleteReview($id)
    {
        return Review::destroy($id);
    }
}
