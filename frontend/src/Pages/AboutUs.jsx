/* eslint-disable no-unused-vars */
import React from "react";

import ModalImage from 'react-modal-image';
import AhnafImage from '../assets/Ahnaf.jpg'; // Import the image for Ahnaf
import KhalidImage from '../assets/khalidratin.jpg'; // Import the image for Khalid
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
          Tour Buddy is a online based travel guide hiring management system WebApp which will help tourists to hire their preferable tour guides to visit their desired destination places.Also a User can make themselves to work as a local/tour guide through our webApp to make travellers know about the scenic beauty and history of their beloved local places .
          </p>
          <p className="mb-4 text-lg">
          The target audience for Tour Buddy tour guide hiring management system is the tourists itself. As Bangladesh is a country of green lands and scenic beauty,there is a lot of places a tourist can visit and enjoy.Our platform provides a tourist to choose or hire their preferred tourguides for their desired tour places .Also user can select tour packages according to tour guides and their preferences.
          </p>
          <p className="mb-4 text-lg">
            At Tourbuddy, we are committed to offering excellent customer service and
            ensuring that our customers have a seamless and delightful traveling experience.
           
          </p>
          <p className="mb-4 text-lg">
            Thank you for choosing Tourbuddy.
          </p>

          <h2 className="mt-8 mb-4 text-3xl font-semibold text-center text-blue-300">Meet the Team</h2>
          <div className="flex flex-col items-center">
            <div className="flex items-center w-full p-6 mb-6 text-white bg-gray-800 rounded-lg shadow-md bg-opacity-80 md:w-1/2">
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
            <div className="flex items-center w-full p-6 text-white bg-gray-800 rounded-lg shadow-md bg-opacity-80 md:w-1/2">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;