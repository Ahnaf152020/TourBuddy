import "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import heroBg from "./assets/tour2.jpg";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import AboutUs from "./Pages/AboutUs";
import AdminProfilePage from "./Pages/AdminProfile";
import Login from "./Pages/Login";
import MostDesiredPlace from "./Pages/MostDesiredPlaces";
import Register from "./Pages/Register";
import UserProfilePage from "./Pages/UserProfile";



function Hero() {
  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen px-6 text-white bg-center bg-cover"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <h1 className="text-5xl font-bold">Explore the World with Tour Buddy</h1>
      <p className="mt-4 text-lg">Your perfect travel companion for adventure and exploration.</p>
      <a href="/about-us" className="px-6 py-3 mt-6 text-black transition bg-yellow-500 rounded-lg hover:bg-yellow-600">
        Learn More
      </a>

      <a href="/register" className="px-6 py-3 mt-6 text-black transition bg-blue-500 rounded-lg hover:bg-blue-600">
        Register Now
      </a>
      <a href="/login" className="px-6 py-3 mt-6 text-black transition bg-blue-500 rounded-lg hover:bg-blue-600">
        login Now
      </a> {/* Link to Register page */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user-profile" element={<UserProfilePage />} />
            <Route path="/admin-profile" element={<AdminProfilePage />} />
            <Route path="/most-desired-places" element={<MostDesiredPlace />} />


          </Routes>
        </div>
        <Footer /> {/* Footer added here */}
      </div>
    </Router>
  );
}

export default App;
