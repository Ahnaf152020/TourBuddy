import { useParams, useNavigate } from "react-router-dom";

const cityAttractions = {
  Dhaka: ["Lalbagh Fort", "Ahsan Manzil", "National Museum"],
  Chattogram: ["Patenga Beach", "Naval Academy", "Foy's Lake"],
  Sylhet: ["Ratargul Swamp", "Jaflong", "Srimangal Tea Gardens"],
  Khulna: ["Sundarbans", "Rupsha Bridge", "Bagerhat Mosque"],
  Rajshahi: ["Varendra Museum", "Puthia Temple", "Padma River"],
  Barishal: ["Kuakata Beach", "Durga Sagar", "Floating Guava Market"],
  Rangpur: ["Tajhat Palace", "Vinnya Jagat", "Carmichael College"],
  Mymensingh: ["Shashi Lodge", "Muktagacha Zamindar Bari", "Brahmaputra River"],
};

const CityDetails = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container px-4 py-10 mx-auto">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center w-full h-64 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          {cityName}
        </h1>
        <p className="mt-2 text-lg text-white opacity-90">
          Discover the most popular places in {cityName}.
        </p>
      </div>

      <button
        className="px-4 py-2 mt-6 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* Attractions Grid */}
      <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {cityAttractions[cityName]?.map((place, index) => {
          const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;

          return (
            <a
              key={index}
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 transition bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
            >
              <h3 className="text-xl font-bold text-gray-800">{place}</h3>
              <p className="mt-1 text-sm text-blue-600 underline">
                View on Google Maps
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default CityDetails;
