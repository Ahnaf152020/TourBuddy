import { useState } from "react"
import { FiCalendar, FiEdit2, FiMapPin } from "react-icons/fi"
import PageTitle from "../Components/PageTitle"

const UserProfilePage = () => {
    const [activeTab, setActiveTab] = useState("profile")
    const [personalInfo, setPersonalInfo] = useState({
        name: "Masum Rana",
        dateOfBirth: "1886-03-15",
        phone: "+46-7644 394 68",
        location: "Dhaka",
    })
    const [security, setSecurity] = useState({
        email: "masumrana15@gmail.com",
        password: "",
        confirmPassword: "",
    })

    const handlePersonalInfoChange = (e) => {
        setPersonalInfo({
            ...personalInfo,
            [e.target.name]: e.target.value,
        })
    }

    const handleSecurityChange = (e) => {
        setSecurity({
            ...security,
            [e.target.name]: e.target.value,
        })
    }

    const handlePersonalInfoSubmit = (e) => {
        e.preventDefault()
        console.log("Personal Info:", personalInfo)
    }

    const handleSecuritySubmit = (e) => {
        e.preventDefault()
        console.log("Security:", security)
    }

    return (
        <section>
            <PageTitle title="User Profile" />
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
                                            alt="Profile"
                                            className="w-24 h-24 rounded-full object-cover"
                                        />
                                        <button className="absolute bottom-0 right-0 bg-teal-500 p-2 rounded-full text-white hover:bg-teal-600 transition-colors">
                                            <FiEdit2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <h2 className="mt-4 text-xl font-semibold">Masum Rana</h2>
                                    <div className="flex items-center text-sm text-gray-500 space-x-4 mt-2">
                                        <span className="flex items-center">
                                            <FiMapPin className="mr-1" /> Dhaka
                                        </span>
                                        <span className="flex items-center">
                                            <FiCalendar className="mr-1" /> 15th February
                                        </span>
                                    </div>
                                </div>

                                {/* Navigation */}
                                <nav className="space-y-1">
                                    {[
                                        { name: "Profile Informations", id: "profile" },
                                        { name: "Booking History", id: "booking" },
                                        { name: "Tour Guide Reviews", id: "reviews" },
                                        { name: "Forgot Password", id: "forgot" },
                                    ].map((item) => (
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
                            <div className="bg-white rounded-lg shadow">
                                {/* Personal Information */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
                                    <form onSubmit={handlePersonalInfoSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder={personalInfo.name}
                                                onChange={handlePersonalInfoChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Date Of Birth</label>
                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                placeholder={personalInfo.dateOfBirth}
                                                onChange={handlePersonalInfoChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder={personalInfo.phone}
                                                onChange={handlePersonalInfoChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                            <input
                                                type="text"
                                                name="location"
                                                placeholder={personalInfo.location}
                                                onChange={handlePersonalInfoChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="py-2 px-6 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                                        >
                                            Save
                                        </button>
                                    </form>
                                </div>

                                {/* Security Section */}
                                <div className="border-t border-gray-200 p-6">
                                    <h3 className="text-xl font-semibold mb-6">Security</h3>
                                    <form onSubmit={handleSecuritySubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder={security.email}
                                                onChange={handleSecurityChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={security.password}
                                                onChange={handleSecurityChange}
                                                placeholder="**********"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={security.confirmPassword}
                                                onChange={handleSecurityChange}
                                                placeholder="**********"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="py-2 px-6 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                                        >
                                            Save
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserProfilePage

