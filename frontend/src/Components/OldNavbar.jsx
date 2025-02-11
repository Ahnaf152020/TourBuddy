import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const OldNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-4 bg-white shadow-md border-b lg:px-12">
      {/* Logo */}
      <div className="text-2xl font-semibold tracking-wide text-black">tour buddy</div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex lg:space-x-8">
        <Link to="/" className="transition hover:text-gray-600">Home</Link>
        <Link to="/about-us" className="transition hover:text-gray-600">About Us</Link>
        <Link to="/most-desired-places" className="transition hover:text-gray-600">
          Most Desired Places
        </Link>
      </div>

      {/* Sign In Button */}
      <Link
        to="/register"
        className="hidden px-4 py-2 font-bold text-black transition bg-yellow-500 rounded-lg lg:block hover:bg-yellow-400 shadow-md"
      >
        Sign Up
      </Link>

      {/* Mobile Menu Button */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl lg:hidden">
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden"></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 left-0 w-2/3 max-w-xs bg-white shadow-lg transform transition-transform ${menuOpen ? "translate-x-0" : "-translate-x-full"
          } flex flex-col items-start p-6 space-y-6 lg:hidden`}
      >
        <button onClick={() => setMenuOpen(false)} className="absolute text-2xl top-5 right-5">
          <FaTimes />
        </button>
        <Link to="/" className="text-lg transition hover:text-yellow-500" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about-us" className="text-lg transition hover:text-yellow-500" onClick={() => setMenuOpen(false)}>About Us</Link>
        <Link to="/most-desired-places" className="text-lg transition hover:text-yellow-500" onClick={() => setMenuOpen(false)}>
          Most Desired Places
        </Link>
        <Link
          to="/login"
          className="px-4 py-2 font-bold text-black transition bg-yellow-500 rounded-lg hover:bg-yellow-400 shadow-md"
          onClick={() => setMenuOpen(false)}
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default OldNavbar;
