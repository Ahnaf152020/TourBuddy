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
      <button className="px-4 py-2 mb-4 text-white bg-blue-500 rounded" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1 className="text-4xl font-bold text-center">{cityName}</h1>
      <p className="mt-4 text-center text-gray-600">
        Discover the most popular places in {cityName}.
      </p>

      <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        {cityAttractions[cityName]?.map((place, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="text-lg font-bold">{place}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityDetails;
