import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const cities = [
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Khulna",
  "Rajshahi",
  "Barishal",
  "Rangpur",
  "Mymensingh",
];

const cityImages = {
  Dhaka: "https://cdn.pixabay.com/photo/2016/11/19/10/38/bangladesh-1838529_640.jpg",
  Chattogram: "https://cdn.pixabay.com/photo/2020/01/17/05/49/boat-4772295_640.jpg",
  Sylhet: "https://cdn.pixabay.com/photo/2020/01/06/00/17/boat-4744319_640.jpg",
  Khulna: "https://media.istockphoto.com/id/2153966886/photo/aerial-view-of-khan-jahan-ali-bridge-over-rupsha-river-khulna-bangladesh-rupsa-bridge.jpg?s=1024x1024&w=is&k=20&c=-dXegPSkQt2P-PcHFSdiuva3P2vIzPWpNaJgVoBSK1s=",
  Rajshahi: "https://cdn.pixabay.com/photo/2017/08/15/13/27/natural-2643896_640.jpg",
  Barishal: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJeZlibcgRlT3f9DbZcs9TrAZQo7ceei7cxw&s",
  Rangpur: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkoVplX-cFl5yRHeRs1qhhojv9YRgRVrSjYw&s",
  Mymensingh: "https://media.istockphoto.com/id/1280758411/photo/village-pond.jpg?s=1024x1024&w=is&k=20&c=5VQdPYIeDgX03gH4RIQQEMsias-S5XEiQyKIm5Nl-Sw=",
};

const MostDesiredPlaces = () => {
  const [selectedCityIndex, setSelectedCityIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container px-4 py-10 mx-auto text-center">
      <h2 className="text-4xl font-bold text-gray-800">Explore Popular Cities</h2>
      <p className="max-w-2xl mx-auto mt-2 text-gray-600">
        Discover the beauty of Bangladesh, from its bustling cities to scenic landscapes.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-5">
        {cities.map((city, index) => (
          <button
            key={city}
            className={`px-4 py-2 rounded-full border transition-all duration-300 ${
              selectedCityIndex === index
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedCityIndex(index)}
          >
            {city}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
        {cities.map((city, index) => (
          <div
            key={city}
            className={`relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer ${
              selectedCityIndex === index ? "ring-4 ring-green-500" : ""
            }`}
            onClick={() => navigate(`/city/${city}`)}
          >
            <img
              src={cityImages[city]}
              alt={`Explore ${city}`}
              className="object-cover w-full h-48"
            />
            <div className="absolute bottom-0 left-0 right-0 py-2 text-center text-white bg-black bg-opacity-50">
              <h3 className="text-xl font-bold">{city}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostDesiredPlaces;
