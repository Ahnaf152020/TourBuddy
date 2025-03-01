<?php

namespace App\Services;

use App\Models\Review;
use App\Models\Package;

class ReviewService
{
    // Get all reviews for a specific package
    public function getReviewsByPackage($packageId)
    {
        return Review::where('package_id', $packageId)->get();
    }

    // Create a new review
    public function createReview($packageId, $userId, $rating, $reviewText)
    {
        return Review::create([
            'package_id' => $packageId,
            'user_id' => $userId,
            'rating' => $rating,
            'review' => $reviewText,
        ]);
    }

    // Update an existing review
    public function updateReview($id, $rating, $reviewText)
    {
        $review = Review::find($id);

        if (!$review) {
            return null; // Review not found
        }

        // Update the review
        $review->rating = $rating;
        $review->review = $reviewText;
        $review->save();

        return $review;
    }

    // Delete a review
    public function deleteReview($id)
    {
        $review = Review::find($id);

        if (!$review) {
            return false; // Review not found
        }

        $review->delete();
        return true; // Review deleted successfully
    }
}
