/* eslint-disable no-unused-vars */
import React from "react";

import ModalImage from 'react-modal-image';
import AhnafImage from '../assets/Ahnaf.jpg'; // Import the image for Ahnaf
import KhalidImage from '../assets/khalidratin.jpg'; // Import the image for Khalid
import TasfiaImage from '../assets/tasfia.jpg'; // Import the image for Tasfia
import image3 from '../assets/tour1.jpg'; // Import the background image

const AboutUs = () => {
  const containerStyle = {
    backgroundImage: `url(${image3})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    color: 'white',
  };

  return (
    <div style={containerStyle}>
      <div className="min-h-screen text-white bg-black bg-opacity-60">
        <div className="container px-4 py-8 mx-auto">
          <h1 className="mb-6 text-4xl font-bold text-center text-blue-300">About Us</h1>
          <p className="mb-4 text-lg">
            Tour Buddy is an online-based travel guide hiring management system WebApp that helps tourists hire their preferred tour guides to visit desired destinations. A user can also work as a local/tour guide, showcasing their local places' scenic beauty and history.
          </p>
          <p className="mb-4 text-lg">
            Our platform targets tourists, especially in Bangladesh, a country filled with green lands and scenic beauty. We provide a platform where tourists can hire preferred tour guides for their journeys and choose tour packages according to the guides and their preferences.
          </p>
          <p className="mb-4 text-lg">
            At TourBuddy, we are committed to offering excellent customer service and ensuring that our customers have a seamless and delightful traveling experience.
          </p>
          <p className="mb-4 text-lg">
            Thank you for choosing TourBuddy.
          </p>

          <h2 className="mt-8 mb-4 text-3xl font-semibold text-center text-blue-300">Meet the Team</h2>
          <div className="flex flex-wrap justify-center gap-6"> {/* Adjusting flex-wrap and gap */}
            <div className="flex items-center p-6 text-white bg-gray-800 rounded-lg shadow-md bg-opacity-80 w-80">
              <ModalImage
                small={AhnafImage}
                large={AhnafImage}
                alt="Ahnaf Amer"
                className="w-20 h-20 mr-4 rounded-full cursor-pointer"
              />
              <div>
                <h3 className="text-2xl font-bold">Ahnaf Amer</h3>
                <p className="text-gray-400">ID: 20220104040</p>
              </div>
            </div>
            <div className="flex items-center p-6 text-white bg-gray-800 rounded-lg shadow-md bg-opacity-80 w-80">
              <ModalImage
                small={KhalidImage}
                large={KhalidImage}
                alt="Khalid Ratin"
                className="w-20 h-20 mr-4 rounded-full cursor-pointer"
              />
              <div>
                <h3 className="text-2xl font-bold">Khalid Ratin</h3>
                <p className="text-gray-400">ID: 20220104027</p>
              </div>
            </div>
            <div className="flex items-center p-6 text-white bg-gray-800 rounded-lg shadow-md bg-opacity-80 w-80">
              <ModalImage
                small={TasfiaImage}
                large={TasfiaImage}
                alt="Tasfia Jannat"
                className="w-20 h-20 mr-4 rounded-full cursor-pointer"
              />
              <div>
                <h3 className="text-2xl font-bold">Tasfia Jannat</h3>
                <p className="text-gray-400">ID: 20220104026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
