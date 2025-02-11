import { useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import { Link } from "react-router-dom"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const navItems = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Our Most Rated Guides", href: "/guides" },
        { label: "Our Packages", href: "/packages" },
        { label: "Most Demand Places", href: "/places" },
    ]

    return (
        <div className="w-full">
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-2xl font-semibold tracking-wide text-black">
                                tour buddy
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex md:items-center md:space-x-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                to="/signin"
                                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                Sign In
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMenuOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                to="/signin"
                                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 block px-3 py-2 rounded-md text-base font-medium mt-4"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    )
}

export default Navbar

