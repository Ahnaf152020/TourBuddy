import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TourGuidePage = () => {
    const [tourGuides, setTourGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [languageFilter, setLanguageFilter] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTourGuides = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/tour_guides");
                if (response.data.success && Array.isArray(response.data.data)) {
                    setTourGuides(response.data.data);
                } else {
                    console.error("Unexpected API response:", response.data);
                    setTourGuides([]);
                }
            } catch (error) {
                console.error("Error fetching tour guides:", error);
                setError("Failed to load tour guides");
            } finally {
                setLoading(false);
            }
        };

        fetchTourGuides();
    }, []);

    const uniqueLocations = [...new Set(tourGuides.map(guide => guide.location))];
    const uniqueLanguages = [...new Set(tourGuides.map(guide => guide.language))];

    const filteredGuides = tourGuides.filter(guide =>
        guide.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (locationFilter === "" || guide.location === locationFilter) &&
        (languageFilter === "" || guide.language === languageFilter)
    );

    const resetFilters = () => {
        setSearchTerm("");
        setLocationFilter("");
        setLanguageFilter("");
    };

    if (loading) return <p className="mt-10 text-lg text-center">Loading...</p>;
    if (error) return <p className="mt-10 text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-6xl p-6 mx-auto">
            <h1 className="mb-6 text-3xl font-bold text-center text-blue-600">Tour Guides</h1>

            {/* Filters Section */}
            <div className="flex flex-col gap-4 mb-6 md:flex-row">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="w-full p-3 border rounded-lg shadow-sm md:w-1/3 focus:ring focus:ring-blue-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="w-full p-3 border rounded-lg shadow-sm md:w-1/3 focus:ring focus:ring-blue-200"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                >
                    <option value="">All Locations</option>
                    {uniqueLocations.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </select>
                <select
                    className="w-full p-3 border rounded-lg shadow-sm md:w-1/3 focus:ring focus:ring-blue-200"
                    value={languageFilter}
                    onChange={(e) => setLanguageFilter(e.target.value)}
                >
                    <option value="">All Languages</option>
                    {uniqueLanguages.map((language) => (
                        <option key={language} value={language}>
                            {language}
                        </option>
                    ))}
                </select>
                <button
                    className="w-full px-6 py-3 text-white transition bg-red-500 rounded-lg shadow-md md:w-auto hover:bg-red-600"
                    onClick={resetFilters}
                >
                    Reset Filters
                </button>
            </div>

            {/* Tour Guide List */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGuides.length > 0 ? (
                    filteredGuides.map((guide) => (
                        <div
                            key={guide.id}
                            className="flex flex-col justify-between p-6 transition bg-white border rounded-lg shadow-md hover:shadow-xl"
                        >
                            <div>
                                <h2 className="text-xl font-semibold text-blue-700">{guide.name}</h2>
                                <p className="text-gray-600"><strong>Email:</strong> {guide.email}</p>
                                <p className="text-gray-600"><strong>Phone:</strong> {guide.phone}</p>
                                <p className="text-gray-600"><strong>Experience:</strong> {guide.experience} years</p>
                                <p className="text-gray-600"><strong>Location:</strong> {guide.location}</p>
                                <p className="text-gray-600"><strong>Languages:</strong> {guide.language}</p>
                            </div>
                            <button
                                className="w-full py-2 mt-4 text-white transition bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
                                onClick={() => navigate("/")}
                            >
                                Select
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">No tour guides found</p>
                )}
            </div>
        </div>
    );
};

export default TourGuidePage;
