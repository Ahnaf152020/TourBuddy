import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../Components/PageTitle";
import { registerTourGuide } from "../api/api";
import TGregisterbg from "../assets/TGregisterbg.jpg";

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
    role: "tour_guide",
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
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${TGregisterbg})` }}
    >
      <PageTitle title="Start Your Journey as a Tour Guide!" />
      <div className="max-w-3xl w-full p-8 bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-blur-lg">
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
          Tour Guide Registration
        </h2>

        {errors.apiError && <p className="mb-4 text-sm text-center text-red-600">{errors.apiError}</p>}
        {successMessage && <p className="mb-4 text-sm text-center text-green-600">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
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
              <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {label}:
              </label>
              <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm bg-white bg-opacity-90 focus:outline-none focus:ring-teal-500 focus:border-teal-500 hover:border-teal-600"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              />
              {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
            </div>
          ))}

          <div className="flex justify-center py-8">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 text-sm font-medium text-white transition duration-200 transform rounded-md shadow-md md:text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-600 hover:scale-105"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TourGuideRegisterForm;
