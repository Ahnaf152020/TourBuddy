/* eslint-disable no-unused-vars */
import React from "react";

import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="px-4 py-6 text-white bg-blue-900 lg:px-12">
      <div className="container flex flex-col items-center justify-between mx-auto lg:flex-row">
        {/* Left Section - Logo & Description */}
        <div className="mb-6 lg:mb-0">
          <h2 className="text-2xl font-semibold">TourBuddy</h2>
          <p className="mt-2 text-sm">Your perfect travel companion.</p>
        </div>

        {/* Middle Section - Links (Using List) */}
        <ul className="flex flex-col text-center lg:flex-row lg:space-x-8 lg:text-left">
          <li>
            <Link to="/" className="transition hover:text-yellow-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about-us" className="transition hover:text-yellow-400">
              About Us
            </Link>
          </li>
          <li className="mb-2"> 
                <a href="https://github.com/Ahnaf152020/TourBuddy.git" className="hover:text-yellow-500">GitHub Repository</a> 
              </li> 
        </ul>

        {/* Right Section - Social Media Links */}
        <div className="flex mt-6 space-x-6 lg:mt-0">
          <a href="#" className="text-xl transition hover:text-yellow-400">
            <FaFacebook />
          </a>
          <a href="#" className="text-xl transition hover:text-yellow-400">
            <FaTwitter />
          </a>
          <a href="#" className="text-xl transition hover:text-yellow-400">
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-6 text-sm text-center">
        &copy; {new Date().getFullYear()} TourBuddy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
