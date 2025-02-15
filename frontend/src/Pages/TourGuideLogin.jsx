import { useState } from "react"
import PageTitle from "../Components/PageTitle"

const TourGuideLoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      // Handle successful form submission
      console.log("Form submitted:", formData)
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <section>
      <PageTitle title="Login" />

      <div className="flex items-center justify-center px-4 py-20 bg-gray-50 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl p-8 mx-auto bg-white rounded-lg shadow-md">

          <h2 className="mb-6 text-xl font-medium text-center text-gray-900">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                E-Mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="JohnDoe14@gmail.com"
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex justify-center py-8">
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white transition-colors duration-200 bg-teal-500 border border-transparent rounded-md shadow-sm md:text-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Proceed To Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default TourGuideLoginForm ;
