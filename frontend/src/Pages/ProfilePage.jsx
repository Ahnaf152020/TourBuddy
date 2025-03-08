import { useEffect, useState } from "react";
import axios from "axios";
import profileBG from "../assets/profileBG.JPG";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No authentication token found!");

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userRole = decodedToken?.userRole || decodedToken?.role || "user";
        if (!userRole) throw new Error("Invalid token, no role found.");

        const profileUrl =
          userRole === "tour_guide"
            ? "http://127.0.0.1:8000/api/tour_guides/profile"
            : "http://127.0.0.1:8000/api/profile";

        const response = await axios.get(profileUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setUser(response.data.user || null);
          setBio(response.data.user?.bio || "");
        } else {
          throw new Error(response.data.msg || "Failed to fetch profile");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        "http://127.0.0.1:8000/api/profile",
        { bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser((prev) => ({ ...prev, bio }));
      setEditing(false);
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  if (loading) return <div className="mt-10 text-lg text-center">Loading...</div>;
  if (error) return <div className="mt-10 text-center text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen bg-cover bg-center p-8 relative" style={{ backgroundImage: `url(${profileBG})` }}>
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-xl"></div>

      <div className="max-w-6xl mx-auto p-12 rounded-lg shadow-xl flex gap-10 w-full relative z-10 backdrop-blur-md bg-white/80">
        {/* Left Section */}
        <div className="flex-1">
          <h2 className="text-6xl font-extrabold text-blue-700 font-roboto">Profile</h2>

          {/* Short Bio */}
          <p className="text-gray-600 text-lg font-serif">
            {user?.role === "tour_guide"
              ? "I am a passionate tour guide, eager to turn your travels into memorable experiences!"
              : "I am a travel enthusiast, excited to help you discover the best places for your next journey!"}
          </p>

          {/* Profile Details */}
          <div className="mt-6 text-lg font-medium">
            <h3 className="text-3xl font-bold font-[Playfair Display] text-gray-800 mb-4 border-b-2 border-gray-400 pb-2">Details</h3>

            <p className="font-[Montserrat] text-gray-700 text-lg"><strong>Name:</strong> <span className="font-[Caveat] text-2xl text-gray-900">{user?.name}</span></p>
            <p className="font-[Montserrat] text-gray-700 text-lg"><strong>Email:</strong> <span className="font-[Caveat] text-2xl text-gray-900">{user?.email}</span></p>
            <p className="font-[Montserrat] text-gray-700 text-lg"><strong>Role:</strong> <span className="font-[Caveat] text-2xl text-gray-900">{user?.role || "User"}</span></p>

            {/* Conditionally Rendered Fields */}
            {user?.role === "tour_guide" && (
              <>
                <p className="font-[Montserrat] text-gray-700 text-lg"><strong>Phone:</strong> <span className="font-[Caveat] text-2xl text-gray-900">{user?.phone || "Not specified"}</span></p>
                <p className="font-[Montserrat] text-gray-700 text-lg"><strong>Experience:</strong> <span className="font-[Caveat] text-2xl text-gray-900">{user?.experience || "Not specified"}</span></p>
                <p className="font-[Montserrat] text-gray-700 text-lg"><strong>Language:</strong> <span className="font-[Caveat] text-2xl text-gray-900">{user?.language || "Not specified"}</span></p>
                <p className="font-[Montserrat] text-gray-700 text-lg"><strong>Location:</strong> <span className="font-[Caveat] text-2xl text-gray-900">{user?.location || "Not specified"}</span></p>
              </>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-96 bg-gradient-to-b from-orange-500 to-red-500 text-white p-8 rounded-lg text-center">
          <div className="w-28 h-28 rounded-full bg-gray-300 mx-auto overflow-hidden mb-4 border-4 border-white">
            <img src={user?.profileImage || "https://via.placeholder.com/150"} alt="" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-2xl font-bold">HELLO, I'M {user?.name?.toUpperCase()}</h3>

          {/* Detailed Bio Section */}
          {user?.role === "tour_guide" ? (
            <p className="text-lg font-mono mt-2 bg-white/40 p-2 rounded-lg text-gray-900 font-semibold">
              As a tour guide, I offer personalized travel experiences to make your trip unforgettable. With years of experience in the tourism industry, I know the best spots to visit, and I'm here to help you explore the world in the best way possible. I specialize in cultural tours, adventure trips, and historical sightseeing, always ensuring you have an amazing time!
            </p>
          ) : (
            <p className="text-lg font-mono mt-2 bg-white/40 p-2 rounded-lg text-gray-900 font-semibold">
              As a travel enthusiast, I am passionate about exploring the world and discovering new destinations. Whether you’re looking for adventure, relaxation, or cultural immersion, I can help guide you to the best places to make your journey special. Let's plan your next unforgettable trip together!
            </p>
          )}

          <div className="mt-4">
            {editing ? (
              <button onClick={handleSave} className="bg-white text-orange-500 px-4 py-2 rounded-lg font-bold shadow-lg hover:bg-gray-200">Save</button>
            ) : (
              <button onClick={handleEdit} className="bg-white text-orange-500 px-4 py-2 rounded-lg font-bold shadow-lg hover:bg-gray-200">Edit Profile</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
