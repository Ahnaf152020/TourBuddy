import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginTourGuide } from "../api/api";
import TGloginbg from "../assets/TGloginbg.jpg"; // Import the background image

const TourGuideLoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "tour_guide",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await loginTourGuide(formData);
      console.log("API Response:", response);

      if (response && response.token) {
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("userRole", response.role);
        navigate("/profile");
      } else {
        setErrors({ general: "Invalid response from server" });
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error);
      setErrors(error.response?.data?.errors || { general: "Invalid login credentials" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${TGloginbg})` }}
    >
      <div className="w-full max-w-md p-8 bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-blur-lg">
        <h2 className="mb-6 text-3xl font-bold text-gray-900 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
          Tour Guide Login
        </h2>

        {errors.general && <p className="mb-4 text-sm text-center text-red-600">{errors.general}</p>}

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
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@example.com"
              className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm bg-white bg-opacity-90 focus:outline-none focus:ring-teal-500 focus:border-teal-500 hover:border-teal-600"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm bg-white bg-opacity-90 focus:outline-none focus:ring-teal-500 focus:border-teal-500 hover:border-teal-600"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-2 text-lg font-semibold text-white transition duration-200 transform rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-600 hover:scale-105"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default TourGuideLoginForm;
