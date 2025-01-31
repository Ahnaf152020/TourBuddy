import { useState } from "react";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleLoginClick = (e) => {
    e.preventDefault();  // Prevent form from reloading the page
    // Add form validation here (e.g. check if email and password are correct)
    
    console.log("Login Successful");
    // Navigate to dashboard or homepage after successful login
    navigate("/dashboard"); // Replace with your intended destination after login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-semibold text-center text-indigo-600">Login</h2>

        <form className="space-y-6" onSubmit={handleLoginClick}>
          {/* Email/Username */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Email/Username:</label>
            <input
              type="text"
              className="w-full p-3 mt-1 bg-gray-200 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full px-6 py-3 mt-4 text-white rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:bg-gradient-to-l hover:from-blue-500 hover:to-green-400 focus:outline-none"
            >
              Login
            </button>
          </div>

          {/* Option for Register */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Dont have an account?{" "}
              <a href="/register" className="text-blue-500 hover:underline">
                Register Now
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
