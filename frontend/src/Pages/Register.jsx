import { useState } from "react";


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Handle form submission
      console.log("Form submitted:", formData);
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-700">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>

              <div className="flex justify-center py-8">
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium text-white transition-colors duration-200 bg-teal-500 border border-transparent rounded-md shadow-sm md:text-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Save
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
