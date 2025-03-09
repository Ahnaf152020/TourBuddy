import React from "react";
import { Link } from "react-router-dom";
import guidePP from "../assets/guidePP.jpeg"; // Importing image
import user1 from "../assets/user1.jpeg";
import user2 from "../assets/user2.jpeg";

const GuideProfile = () => {
  return (
    <div className="w-4/5 mx-auto mt-16">
      <h1 className="text-xl text-black text-left font-bold">Your Selected Guide:</h1>

      {/* Guide Profile Section */}
      <div className="mt-10 flex flex-col lg:flex-row justify-center gap-6 lg:gap-0 lg:justify-between items-center">
        {/* Guide Card */}
        <div className="w-full p-2 shadow-xl flex gap-4 md:flex-row flex-col items-center rounded-md lg:w-4/6">
          {/* Image */}
          <div>
            <img src={guidePP} alt="Guide Profile" className="rounded-md w-40 h-40" />
          </div>
          {/* Guide Info */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
              <h1 className="font-bold text-white text-lg md:text-xl bg-[#7BBCB0] py-1 px-5 rounded-full">KUAKATA</h1>
              <div className="hidden md:block"><h1 className="text-[#C7CDD0] text-xl">|</h1></div>
              <h1 className="text-[#778088] text-xl font-semibold">(584 reviews)</h1>
            </div>

            {/* Name & Info */}
            <div className="flex flex-col md:flex-row justify-between w-full md:gap-10">
              <div>
                <h1 className="font-bold font-volkhov text-2xl text-[#1C2B38]">Raihan Ahmad</h1>
                <p className="text-[#495560] font-semibold">Experience: 3 Years</p>
                <div
                      class="font-semibold text-[#495560] flex gap-2 items-center"
                    >
                       <p>Language </p> 
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                      </svg>
                      
                      <p>Bangla, English & Hindi</p>
                    </div>
                <p className="text-[#495560] font-semibold">Location: Chittagong</p>
                <p className="text-[#495560] font-semibold">Phone: +880 123456789</p>
              </div>
              {/* Price */}
              <div className="md:mt-0 mt-2">
                <h1 className="text-center md:text-left font-volkhov text-[#7BBCB0] text-xl md:text-2xl font-bold">
                  TK: 250.00
                </h1>
                <p className="text-center md:text-right -mt-2 text-[#778088] text-[12px]">per person</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hire Button */}
        <div className="lg:w-2/6 md:flex md:justify-end">
  <Link 
    to="/payment" 
    className="btn border-none bg-[#13253F] text-white text-xl md:text-2xl px-10 md:px-16 h-[64px] md:h-[96px] flex items-center justify-center rounded-full"
  >
    Hire Me
  </Link>
</div>

      </div>

      {/* Customer Reviews */}
      <div className="w-4/5 mx-auto mt-16">
        <h1 className="text-xl text-black text-left font-bold">Customer Review</h1>
        <div className="flex flex-col gap-4 mt-4">
          {/* Review 1 */}
          <div className="shadow-md p-2 flex md:flex-row flex-col gap-4 items-center rounded-md">
            <img src={user1} alt="User 1" className="rounded-full w-14 h-14" />
            <div className="md:w-4/5">
              <h1 className="font-bold text-[#1C2B38] text-lg">Arlene McCoy</h1>
              <p className="text-black">"Amazing Guide!"</p>
              <p className="text-black">
                Our tour guide in Kuakata was fantastic! They showed us the best spots for sunrise and sunset, shared
                fascinating local stories, and made the trip smooth and enjoyable.
              </p>
            </div>
          </div>

          {/* Review 2 */}
          <div className="shadow-md p-2 flex md:flex-row flex-col gap-4 items-center rounded-md mb-10">
            <img src={user2} alt="User 2" className="rounded-full w-14 h-14" />
            <div className="md:w-4/5 ">
              <h1 className="font-bold text-[#1C2B38] text-lg">Jenny Wilson</h1>
              <p className="text-black">"Fantastic Experience!"</p>
              <p className="text-black">
                Our visit to Kuakata was unforgettable, thanks to our amazing guide. They were knowledgeable, friendly,
                and went above and beyond to ensure we enjoyed every moment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideProfile;
