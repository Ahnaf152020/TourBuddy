import "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar"; 
import Footer from "./Components/Footer"; 
import AboutUs from "./Pages/AboutUs"; 
import heroBg from "./assets/tour2.jpg";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import MostDesiredPlace from "./Pages/MostDesiredPlaces";
import TourGuideRegister from "./Pages/TourGuideRegister";
import TourGuideLogin from "./Pages/TourGuideLogin";
import RegisterSelection from "./Pages/RegisterSelection";
import LoginSelection from "./Pages/LoginSelection";
import TourGuidePage from "./Pages/TourguidePage";
import PackagesPage from "./Pages/PackagesPage";
import CityDetails from "./Pages/CityDetails";
import Profile from "./Pages/ProfilePage";

import PackagePage from "./Pages/PackagePage";
import ReviewPage from "./Pages/ReviewPage";




function Hero() {
  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen px-6 text-white bg-center bg-cover"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <h1 className="text-5xl font-bold">Explore the World with Tour Buddy</h1>
      <p className="mt-4 text-lg">Your perfect travel companion for adventure and exploration.</p>
      
      {/* Cards Section */}
      <div className="flex flex-row mt-8 space-x-6">
        {/* Learn More Card */}
        <a href="/tour-guide-page" className="flex flex-col items-center justify-center p-6 transition-transform transform rounded-lg shadow-lg bg-white/30 backdrop-blur-sm hover:scale-105 hover:bg-white/40">
          <h2 className="text-xl font-semibold text-white">Learn More</h2>
          <p className="mt-2 text-white/80">Discover more about our services.</p>
        </a>
        
        {/* Register Now Card */}
        <a href="/register-selection" className="flex flex-col items-center justify-center p-6 transition-transform transform rounded-lg shadow-lg bg-blue-500/30 backdrop-blur-sm hover:scale-105 hover:bg-blue-500/40">
          <h2 className="text-xl font-semibold text-white">Register Now</h2>
          <p className="mt-2 text-white/80">Join us and start your adventure.</p>
        </a>
        
        {/* Login Now Card */}
        <a href="/login-selection" className="flex flex-col items-center justify-center p-6 transition-transform transform rounded-lg shadow-lg bg-green-500/30 backdrop-blur-sm hover:scale-105 hover:bg-green-500/40">
          <h2 className="text-xl font-semibold text-white">Login Now</h2>
          <p className="mt-2 text-white/80">Access your account.</p>
        </a>
      </div>
    </div>
  );
}function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tourguide-register" element={<TourGuideRegister />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tourguide-login" element={<TourGuideLogin />} />
            <Route path="/most-desired-places" element={<MostDesiredPlace />} />
            <Route path="/register-selection" element={<RegisterSelection />} />
            <Route path="/login-selection" element={<LoginSelection />} />
            <Route path="/tour-guide-page" element={<TourGuidePage/>}/>
            <Route path="/packages-page" element={<PackagesPage />} />
            <Route path="/city/:cityName" element={<CityDetails />} />
            <Route path = "/profile" element={<Profile/>}/>
            <Route path="/package/:id" element={<PackagePage />} />
          <Route path="/review/:id" element={<ReviewPage />} />
                       

                        


          </Routes>
        </div>
        <Footer /> {/* Footer added here */}
      </div>
    </Router>
  );
}

export default App;