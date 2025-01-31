import { useState } from "react";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const navigate = useNavigate();

  const handleRegisterClick = (e) => {
    e.preventDefault();  // Prevent form from reloading the page
    // You can add form validation here

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Form Submitted");
    // You can make an API call here to register the user
    navigate("/dashboard"); // Navigate to the dashboard or a different page after registration
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-semibold text-center text-indigo-600">Register</h2>

        <form className="space-y-6" onSubmit={handleRegisterClick}>
          {/* Name */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Name:</label>
            <input
              type="text"
              className="w-full p-3 mt-1 bg-gray-200 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Phone:</label>
            <input
              type="text"
              className="w-full p-3 mt-1 bg-gray-200 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="+46-7644 394 68"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Address:</label>
            <input
              type="text"
              className="w-full p-3 mt-1 bg-gray-200 border border-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Green Road, Dhaka"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Password:</label>
            <input
              type="password"
              className="w-full p-3 mt-1 bg-gray-200 border border-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Confirm Password:</label>
            <input
              type="password"
              className="w-full p-3 mt-1 bg-gray-200 border border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full px-6 py-3 mt-4 text-white rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:bg-gradient-to-l hover:from-blue-500 hover:to-green-400 focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;  