import { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No authentication token found!");

        console.log("Token found:", token); // Debugging

        // Decode JWT token
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        console.log("Decoded Token:", decodedToken); // Debugging

        const userRole = decodedToken?.userRole || decodedToken?.role || "user"; 
        console.log("Extracted Role:", userRole); // Debugging

        if (!userRole) throw new Error("Invalid token, no role found.");

        // Fetch profile based on user role
        const profileUrl =
          userRole === "tour_guide"
            ? "http://127.0.0.1:8000/api/tour_guides/profile"
            : "http://127.0.0.1:8000/api/profile";

        const response = await axios.get(profileUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setUser(response.data.user || null);
        } else {
          throw new Error(response.data.msg || "Failed to fetch profile");
        }
      } catch (err) {
        console.error("Error fetching profile:", err); // Debugging
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="mt-10 text-lg text-center">Loading...</div>;
  if (error) return <div className="mt-10 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-center">Profile</h2>
      <div className="text-lg">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role || "user"}</p>

        {/* Display extra fields if user is a tour guide */}
        {user?.role === "tour_guide" && (
          <>
            <p><strong>Phone:</strong> {user?.phone}</p>
            <p><strong>Experience:</strong> {user?.experience} years</p>
            <p><strong>Language:</strong> {user?.language}</p>
            <p><strong>Location:</strong> {user?.location}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
