import { useState } from "react";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";
import Uloginbg from "../assets/Uloginbg.jpg"; // Import background image

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
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${Uloginbg})` }}
    >
      <div className="w-full max-w-md p-8 bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-blur-lg">
        <h2 className="mb-6 text-3xl font-bold text-gray-900 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
          User Login
        </h2>

        {error && <p className="mb-3 text-sm text-center text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-bold text-gray-900 mb-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm bg-white bg-opacity-90 focus:outline-none focus:ring-teal-500 focus:border-teal-500 hover:border-teal-600"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-lg font-bold text-gray-900 mb-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm bg-white bg-opacity-90 focus:outline-none focus:ring-teal-500 focus:border-teal-500 hover:border-teal-600"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full px-6 py-2 text-lg font-semibold text-white transition duration-200 transform rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
              error ? "bg-gray-400 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-600 hover:scale-105"
            }`}
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
