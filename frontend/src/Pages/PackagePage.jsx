import { useState } from "react"; // Removed useEffect import
import { useLocation, useNavigate } from "react-router-dom";
import { createReview } from "../api/api"; // Assuming you have an API function for creating reviews

const PackagePage = () => {
  const { state } = useLocation();
  const { package: pkg } = state; // Access the package data passed via navigation
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmitReview = async () => {
    if (!reviewText || rating === 0) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await createReview("package", pkg.id, { review: reviewText, rating });
      setSuccess("Review submitted successfully!");
      setError("");
      setReviewText("");
      setRating(0);
    } catch (err) {
      setError(err.message || "Failed to submit review.");
    }
  };

  return (
    <div className="min-h-screen py-10 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-blue-700">{pkg.description}</h2>
        <p className="mt-2 text-gray-600">Location: {pkg.location}</p>
        <p className="mt-2 text-gray-600">Duration: {pkg.duration} days</p>
        <p className="mt-2 text-gray-600">Price: ৳{pkg.price}</p>

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

export default PackagePage;