
import { Link } from "react-router-dom";

const TourGuides = () => {

    const guides = [
        {
          "name": "John Doe",
          "email": "johndoe@example.com",
          "phone": "1234567890",
          "experience": "5 years",
          "location": "New York",
          "languages": ["English", "Spanish"]
        },
        {
          "name": "Alice Smith",
          "email": "alice.smith@example.com",
          "phone": "0987654321",
          "experience": "8 years",
          "location": "Los Angeles",
          "languages": ["English", "French"]
        },
        {
          "name": "Michael Johnson",
          "email": "michael.johnson@example.com",
          "phone": "1122334455",
          "experience": "10 years",
          "location": "Chicago",
          "languages": ["English", "German"]
        },
        {
          "name": "Emma Brown",
          "email": "emma.brown@example.com",
          "phone": "5566778899",
          "experience": "3 years",
          "location": "San Francisco",
          "languages": ["English"]
        },
        {
          "name": "David Williams",
          "email": "david.williams@example.com",
          "phone": "6677889900",
          "experience": "7 years",
          "location": "Miami",
          "languages": ["English", "Italian"]
        },
        {
          "name": "Sophia Lee",
          "email": "sophia.lee@example.com",
          "phone": "7788990011",
          "experience": "6 years",
          "location": "Seattle",
          "languages": ["English", "Chinese"]
        }
      ]
      

  return (
    <div className="w-4/5 mx-auto py-10">
      {/* Title */}
      <div>
        <h1 className="font-bold text-2xl text-[#2E60E2] md:text-3xl text-center">
          Tour Guides
        </h1>
      </div>
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-6 items-center">
        <input
          type="text"
          placeholder="Search by name"
          className="input input-bordered w-full h-16 md:col-span-4"
        />
        <select className="select select-bordered w-full h-16 md:col-span-3">
          <option disabled selected>
            All Locations
          </option>
        </select>
        <select className="select select-bordered w-full h-16 md:col-span-3">
          <option disabled selected>
            All Languages
          </option>
        </select>
        <button className="btn h-16 bg-[#EF4243] border-none text-white md:col-span-2">
          Reset Filters
        </button>
      </div>
       {/* Cards */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
        {guides.map((guide, index) => (
          <div
          
            key={index}
            className="border shadow-lg rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold text-[#2E60E2]">{guide.name}</h2>
            <p className="text-sm text-[#6b6c6d]">
              <strong className="text-[#5D6569]">Email:</strong> {guide.email}
            </p>
            <p className="text-sm text-[#6b6c6d]">
              <strong className="text-[#5D6569]">Phone:</strong> {guide.phone}
            </p>
            <p className="text-sm text-[#6b6c6d]">
              <strong className="text-[#5D6569]">Experience:</strong> {guide.experience}
            </p>
            <p className="text-sm text-[#6b6c6d]">
              <strong className="text-[#5D6569]">Location:</strong> {guide.location}
            </p>
            <p className="text-sm text-[#6b6c6d]">
              <strong className="text-[#5D6569]">Languages:</strong> {guide.languages.join(", ")}
            </p>
            <Link
        to="/guideProfile" // Static path to GuideProfile
        className="w-full btn rounded-full mt-4 bg-[#2E60E2] text-lg text-white"
      >
        View Profile
      </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourGuides;
