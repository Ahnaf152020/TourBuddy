import { useState } from "react";
import PageTitle from "../Components/PageTitle";

const TourGuideRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    experience: "",
    language: "",
    location: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.experience.trim()) {
      newErrors.experience = "Experience is required";
    }

    if (!formData.language.trim()) {
      newErrors.language = "Language is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
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

            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { label: "Name", name: "name", type: "text", placeholder: "John Doe" },
                { label: "Email", name: "email", type: "email", placeholder: "example@example.com" },
                { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
                { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "••••••••" },
                { label: "Phone Number", name: "phoneNumber", type: "text", placeholder: "123-456-7890" },
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

              <div className="flex justify-center py-8">
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium text-white transition-colors duration-200 bg-teal-500 border border-transparent rounded-md shadow-sm md:text-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Register
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
