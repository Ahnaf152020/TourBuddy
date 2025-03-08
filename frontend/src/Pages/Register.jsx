import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/api";
import PageTitle from "../Components/PageTitle";
import Uregisterbg from "../assets/Uregisterbg.jpg";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "user", 
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
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.password_confirmation)
      newErrors.password_confirmation = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setErrors({});
      try {
        await register(formData);
        setSuccessMessage("Registration successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        console.error("Error:", error);
        setErrors(error.errors || { apiError: "Something went wrong. Please try again." });
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
      style={{ backgroundImage: `url(${Uregisterbg})` }}
    >
      <PageTitle title="Join Tour Buddy – Start Your Adventure Today!" />
      <div className="max-w-3xl w-full p-8 bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-blur-lg">
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
          User Registration
        </h2>

        {errors.apiError && <p className="mb-4 text-sm text-center text-red-600">{errors.apiError}</p>}
        {successMessage && <p className="mb-4 text-sm text-center text-green-600">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {[...Array(4)].map((_, i) => {
            const fields = ["name", "email", "password", "password_confirmation"];
            const placeholders = ["John Doe", "example@example.com", "••••••••", "••••••••"];
            const labels = ["Name", "Email", "Password", "Confirm Password"];
            return (
              <div key={fields[i]}>
                <label htmlFor={fields[i]} className="block mb-1 text-sm font-medium text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {labels[i]}:
                </label>
                <input
                  type={fields[i].includes("password") ? "password" : "text"}
                  id={fields[i]}
                  name={fields[i]}
                  placeholder={placeholders[i]}
                  value={formData[fields[i]]}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md bg-white bg-opacity-90 focus:outline-none focus:ring-teal-500 focus:border-teal-500 hover:border-teal-600"
                />
                {errors[fields[i]] && <p className="mt-1 text-sm text-red-600">{errors[fields[i]]}</p>}
              </div>
            );
          })}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-800">Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white bg-opacity-90 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="tour_guide">Tour Guide</option>
            </select>
          </div>

          <div className="flex justify-center py-8">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 text-sm font-medium text-white rounded-md shadow-md transition duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
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

export default RegisterForm;
