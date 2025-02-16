import { useState } from "react"
import { FiEdit2 } from "react-icons/fi"
import PageTitle from "../Components/PageTitle"

const AdminProfilePage = () => {
    const [activeTab, setActiveTab] = useState("profile")
    const [formData, setFormData] = useState({
        name: "Admin",
        email: "Admin15@Gmail.Com",
        phone: "+46-7644 394 68",
        address: "Green Road,Dhaka",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        // Handle form submission logic here
    }

    const navigationItems = [
        { id: "profile", name: "Profile Informations" },
        { id: "payment", name: "Tour Guide Payment & Customer Details" },
        { id: "status", name: "Tour Guide Status" },
        { id: "reviews", name: "Customer Reviews" },
    ]

    return (
        <section>
            <PageTitle title="Admin Profile" />

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Left Sidebar */}
                        <div className="md:col-span-1">
                            <div className="bg-white rounded-lg shadow p-6 space-y-6">
                                {/* Profile Photo */}
                                <div className="flex flex-col items-center">
                                    <div className="relative">
                                        <img
                                            src="user.png"
                                            alt="Admin Profile"
                                            className="w-24 h-24 rounded-full object-cover"
                                        />
                                        <button
                                            className="absolute bottom-0 right-0 bg-teal-500 p-2 rounded-full text-white hover:bg-teal-600 transition-colors"
                                            aria-label="Edit profile photo"
                                        >
                                            <FiEdit2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <h2 className="mt-4 text-xl font-semibold">Admin</h2>
                                </div>

                                {/* Navigation */}
                                <nav className="space-y-1">
                                    {navigationItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === item.id ? "bg-teal-500 text-white" : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            {item.name}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Right Content Area */}
                        <div className="md:col-span-3">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-xl font-semibold mb-6">Admin Information</h3>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Name:
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            E-Mail
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            placeholder={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            placeholder={formData.address}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-teal-500 text-white py-2 px-6 rounded-md hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                    >
                                        Save
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminProfilePage

