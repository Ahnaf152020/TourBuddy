import { useState } from "react"
import PageTitle from "../Components/PageTitle"

const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: "",
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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

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

      <div className="bg-gray-50 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto w-full bg-white rounded-lg shadow-md p-8">

          <h2 className="text-xl text-center font-medium text-gray-900 mb-6">Login</h2>


          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Admin"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                focus:outline-none focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-Mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Admin15@Gmail.Com"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                focus:outline-none focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                focus:outline-none focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex justify-center py-8">
              <button
                type="submit"
                className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm md:text-lg font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 
              transition-colors duration-200"
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

export default LoginForm

