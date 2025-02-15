import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-4 text-black bg-white border-b-2 border-gray-200 shadow-lg lg:px-12">
      {/* Logo */}
      <div className="text-2xl font-semibold tracking-wide text-blue-700">Tour Buddy</div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex lg:space-x-8">
        <Link to="/" className="font-medium transition hover:text-blue-700">Home</Link>
        <Link to="/about-us" className="font-medium transition hover:text-blue-700">About Us</Link>
        <Link to="/most-desired-places" className="font-medium transition hover:text-blue-700">
          Most Desired Places
        </Link>
      </div>

      {/* Sign In Button */}
      <Link to="/register" className="hidden px-4 py-2 font-bold text-white transition bg-yellow-500 rounded-lg shadow-md lg:block hover:bg-yellow-400">
        Sign Up
      </Link>

      {/* Mobile Menu Button */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-blue-700 lg:hidden">
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white transition-transform transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col items-center justify-center space-y-6 lg:hidden shadow-lg`}
      >
        <button onClick={() => setMenuOpen(false)} className="absolute text-2xl text-blue-700 top-5 right-5">
          <FaTimes />
        </button>
        <Link to="/" className="text-lg font-medium transition hover:text-yellow-500" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about-us" className="text-lg font-medium transition hover:text-yellow-500" onClick={() => setMenuOpen(false)}>About Us</Link>
        <Link to="/most-desired-places" className="text-lg font-medium transition hover:text-yellow-500" onClick={() => setMenuOpen(false)}>
          Most Desired Places
        </Link>
        <Link to="/login" className="px-4 py-2 font-bold text-white transition bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-400" onClick={() => setMenuOpen(false)}>Sign In</Link>
      </div>
    </nav>
  );
};

export default Navbar;
