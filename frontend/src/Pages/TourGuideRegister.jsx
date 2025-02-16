import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../Components/PageTitle";
import { registerTourGuide } from "../api/api"; // API call function

const TourGuideRegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    experience: "",
    language: "",
    location: "",
    role: "tour_guide", // Default role set
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear errors when user types
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.password_confirmation)
      newErrors.password_confirmation = "Passwords do not match";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.experience.trim()) newErrors.experience = "Experience is required";
    if (!formData.language.trim()) newErrors.language = "Language is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setErrors({});
      try {
        await registerTourGuide(formData);
        setSuccessMessage("Registration successful! Redirecting...");
        setTimeout(() => navigate("/tourguide-login"), 2000);
      } catch (error) {
        console.error("Error:", error);
        setErrors(error.response?.data?.errors || { apiError: "Registration failed." });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section>
      <PageTitle title="Register as a Tour Guide" />
      <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h2 className="mb-6 text-xl font-medium text-center text-gray-900">Register as a Tour Guide</h2>

            {errors.apiError && <p className="mb-4 text-sm text-center text-red-600">{errors.apiError}</p>}
            {successMessage && <p className="mb-4 text-sm text-center text-green-600">{successMessage}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Fields */}
              {[
                { label: "Name", name: "name", type: "text", placeholder: "John Doe" },
                { label: "Email", name: "email", type: "email", placeholder: "example@example.com" },
                { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
                { label: "Confirm Password", name: "password_confirmation", type: "password", placeholder: "••••••••" },
                { label: "Phone Number", name: "phone", type: "text", placeholder: "+1234567890" },
                { label: "Experience (Years)", name: "experience", type: "number", placeholder: "5" },
                { label: "Language", name: "language", type: "text", placeholder: "English, Spanish" },
                { label: "Location", name: "location", type: "text", placeholder: "New York, USA" },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name}>
                  <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-700">
                    {label}:
                  </label>
                  <input
                    type={type}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  />
                  {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
                </div>
              ))}

              {/* Role Selection (Optional but defaults to "tour_guide") */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Role:</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="tour_guide">Tour Guide</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center py-8">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 text-sm font-medium text-white transition-colors duration-200 ${
                    loading ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"
                  } border border-transparent rounded-md shadow-sm md:text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourGuideRegisterForm;
