import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-4 text-white bg-gradient-to-r from-blue-700 to-blue-900 lg:px-12">
      {/* Logo */}
      <div className="text-2xl font-semibold tracking-wide">tour buddy</div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex lg:space-x-8">
        <Link to="/" className="transition hover:text-gray-300">Home</Link>
        <Link to="/about-us" className="transition hover:text-gray-300">About Us</Link>
        <Link to="/most-desired-places" className="transition hover:text-gray-300">
          Most Desired Places
        </Link>
      </div>

      {/* Sign In Button */}
      <Link to="/register" className="hidden px-4 py-2 font-bold text-black transition bg-yellow-500 rounded-lg lg:block hover:bg-yellow-400">
        Sign Up
      </Link>

      {/* Mobile Menu Button */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl lg:hidden">
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-blue-900 transition-transform transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col items-center justify-center space-y-6 lg:hidden`}
      >
        <button onClick={() => setMenuOpen(false)} className="absolute text-2xl top-5 right-5">
          <FaTimes />
        </button>
        <Link to="/" className="text-lg transition hover:text-yellow-500" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about-us" className="text-lg transition hover:text-yellow-500" onClick={() => setMenuOpen(false)}>About Us</Link>
        <Link to="/most-desired-places" className="text-lg transition hover:text-yellow-500" onClick={() => setMenuOpen(false)}>
          MostDesiredPlaces
        </Link>
        <Link to="/login" className="px-4 py-2 font-bold text-black transition bg-yellow-500 rounded-lg hover:bg-yellow-400" onClick={() => setMenuOpen(false)}>Sign In</Link>
      </div>
    </nav>
  );
};

export default Navbar;
