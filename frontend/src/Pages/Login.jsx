import { useState } from "react";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await login({ email, password });

      if (response.token) {
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("userRole", response.role); // Store role

        // Redirect based on role
        if (response.role === "admin") {
          navigate("/admin-dashboard");
        } else if (response.role === "tour_guide") {
          navigate("/guide-dashboard");
        } else {
          navigate("/profile");
        }
      } else {
        throw new Error("Token missing in response");
      }
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md w-96">
        <h2 className="mb-4 text-xl font-semibold">Login</h2>
        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border rounded-lg"
              required
            />
          </div>

          <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
