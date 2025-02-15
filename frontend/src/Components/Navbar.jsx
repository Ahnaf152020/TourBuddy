import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedRole = localStorage.getItem("role");

    if (token) {
      setUser("User"); // You can replace this with a dynamic username if available
      setRole(storedRole || "user");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    setUser(null);
    setRole(null);
    navigate("/login");
  };

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-4 text-black bg-white border-b-2 border-gray-200 shadow-lg lg:px-12">
      {/* Logo */}
      <div className="text-2xl font-semibold tracking-wide text-blue-700">Tour Buddy</div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex lg:space-x-8">
        <Link to="/" className="font-medium transition hover:text-blue-700">Home</Link>
        <Link to="/about-us" className="font-medium transition hover:text-blue-700">About Us</Link>
        <Link to="/most-desired-places" className="font-medium transition hover:text-blue-700">Most Desired Places</Link>

        {/* Role-based Link (Admin Access) */}
        {role === "admin" && (
          <Link to="/admin-dashboard" className="font-medium transition hover:text-red-600">Admin Panel</Link>
        )}
      </div>

      {/* User Authentication Section */}
      <div className="items-center hidden space-x-4 lg:flex">
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-blue-700">Welcome, {user}!</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 font-bold text-white transition bg-red-500 rounded-lg shadow-md hover:bg-red-400"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/register"
            className="px-4 py-2 font-bold text-white transition bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-400"
          >
            Sign Up
          </Link>
        )}
      </div>

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
        <Link to="/most-desired-places" className="text-lg font-medium transition hover:text-yellow-500" onClick={() => setMenuOpen(false)}>Most Desired Places</Link>

        {role === "admin" && (
          <Link to="/admin-dashboard" className="text-lg font-medium transition hover:text-red-600" onClick={() => setMenuOpen(false)}>Admin Panel</Link>
        )}

        {user ? (
          <div className="flex flex-col items-center space-y-4">
            <span className="text-lg font-semibold text-blue-700">Welcome, {user}!</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 font-bold text-white transition bg-red-500 rounded-lg shadow-md hover:bg-red-400"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 font-bold text-white transition bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-400"
            onClick={() => setMenuOpen(false)}
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 