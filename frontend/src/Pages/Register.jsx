import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/api";

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

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.error("Error:", error);
        if (error.errors) {
          setErrors(error.errors);
        } else {
          setErrors({ apiError: error.message || "Something went wrong. Please try again." });
        }
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section>
      <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h2 className="mb-6 text-xl font-medium text-center text-gray-900">Register</h2>

            {errors.apiError && (
              <p className="mb-4 text-sm text-center text-red-600">{errors.apiError}</p>
            )}
            {successMessage && (
              <p className="mb-4 text-sm text-center text-green-600">{successMessage}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { label: "Name", name: "name", type: "text", placeholder: "John Doe" },
                { label: "Email", name: "email", type: "email", placeholder: "example@example.com" },
                { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
                { label: "Confirm Password", name: "password_confirmation", type: "password", placeholder: "••••••••" },
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
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  />
                  {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
                </div>
              ))}

              {/* Role Selection */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Role:</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
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
                  className={`px-6 py-2 text-sm font-medium text-white transition-colors duration-200 ${
                    loading ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"
                  } border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
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

export default RegisterForm;
