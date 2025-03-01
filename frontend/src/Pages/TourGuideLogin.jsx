import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../Components/PageTitle";
import { loginTourGuide } from "../api/api"; // Import the API function

const TourGuideLoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "tour_guide", // Adding role for authentication
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
      console.log("API Response:", response); // Debugging
    
      if (response && response.token) {  // Fix here: Use response.token instead of response.access_token
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("userRole", response.role);
        navigate("/profile");
      } else {
        setErrors({ general: "Invalid response from server" });
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error);
      setErrors(error.response?.data?.errors || { general: "Invalid login credentials" });
    }
    
  };    

  return (
    <section>
      <PageTitle title="Tour Guide Login" />
      <div className="flex items-center justify-center min-h-screen px-4 py-20 bg-gray-50 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-xl font-semibold text-center text-gray-900">Tour Guide Login</h2>

          {errors.general && <p className="mb-4 text-sm text-center text-red-600">{errors.general}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@example.com"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 text-white rounded-md shadow-sm transition-colors duration-200 ${loading ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"}`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TourGuideLoginForm;
