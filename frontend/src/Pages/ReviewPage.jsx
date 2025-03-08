import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReviews, createReview, updateReview, deleteReview } from "../api/api";

const ReviewPage = () => {
  const { id } = useParams(); // Get package ID from the URL
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null); // Track the review being edited
  const navigate = useNavigate();

  // Fetch reviews when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews("package", id); // Fetch reviews for this package
        setReviews(data.reviews); // Ensure the response matches the backend structure
      } catch (err) {
        setError(err.message || "Failed to load reviews.");
      }
    };

    fetchReviews();
  }, [id]);

  // Handle submitting a new review
  const handleSubmitReview = async () => {
    if (!reviewText || rating === 0) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const reviewData = {
        user_id: 1, // Replace with the actual user ID (e.g., from authentication)
        rating: rating,
        review: reviewText,
      };

      await createReview("package", id, reviewData);
      setSuccess("Review submitted successfully!");
      setError("");
      setReviewText("");
      setRating(0);
      // Refresh reviews after submission
      const data = await getReviews("package", id);
      setReviews(data.reviews);
    } catch (err) {
      setError(err.message || "Failed to submit review.");
    }
  };

  // Handle editing a review
  const handleEditReview = async (reviewId, updatedReview) => {
    try {
      await updateReview(reviewId, updatedReview);
      setSuccess("Review updated successfully!");
      setError("");
      setEditingReviewId(null); // Stop editing
      // Refresh reviews after update
      const data = await getReviews("package", id);
      setReviews(data.reviews);
    } catch (err) {
      setError(err.message || "Failed to update review.");
    }
  };

  // Handle deleting a review
  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReview(reviewId);
        setSuccess("Review deleted successfully!");
        setError("");
        // Refresh reviews after deletion
        const data = await getReviews("package", id);
        setReviews(data.reviews);
      } catch (err) {
        setError(err.message || "Failed to delete review.");
      }
    }
  };

  return (
    <div className="min-h-screen py-10 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-blue-700">Reviews for Package #{id}</h2>

        {/* Review List */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Customer Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="p-4 mt-4 border rounded-lg shadow-sm">
                {editingReviewId === review.id ? (
                  // Edit Review Form
                  <div className="space-y-4">
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Write your review..."
                      className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                      rows="4"
                    />
                    <div className="mt-2">
                      <label className="block text-gray-700">Rating:</label>
                      <select
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                        className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                      >
                        <option value={0}>Select Rating</option>
                        <option value={1}>1 Star</option>
                        <option value={2}>2 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={5}>5 Stars</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleEditReview(review.id, { review: reviewText, rating })
                        }
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingReviewId(null)}
                        className="w-full px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // Display Review
                  <>
                    <p className="text-gray-700">{review.review}</p>
                    <p className="mt-2 text-yellow-500">Rating: {"★".repeat(review.rating)}</p>
                    <div className="mt-4 space-x-2">
                      <button
                        onClick={() => {
                          setEditingReviewId(review.id);
                          setReviewText(review.review);
                          setRating(review.rating);
                        }}
                        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="mt-4 text-gray-500">No reviews yet.</p>
          )}
        </div>

        {/* Review Form */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Leave a Review</h3>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            className="w-full p-3 mt-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
            rows="4"
          />
          <div className="mt-2">
            <label className="block text-gray-700">Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
            >
              <option value={0}>Select Rating</option>
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
          {error && <p className="mt-2 text-red-500">{error}</p>}
          {success && <p className="mt-2 text-green-500">{success}</p>}
          <button
            onClick={handleSubmitReview}
            className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Submit Review
          </button>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Back to Packages
        </button>
      </div>
    </div>
  );
};

export default ReviewPage;