import { useEffect, useState } from "react";
import { getPackages, updatePackage, deletePackage, getUserRole } from "../api/api";

const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({ location: "", price: "", duration: "" });
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetchPackages();
    setUserRole(getUserRole());
  }, []);

  const fetchPackages = async () => {
    try {
      const data = await getPackages();
      setPackages(data);
      setFilteredPackages(data);
    } catch (err) {
      setError(err.message || "Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = packages.filter((pkg) =>
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filter.location) {
      filtered = filtered.filter((pkg) => pkg.location.toLowerCase().includes(filter.location.toLowerCase()));
    }

    if (filter.price) {
      filtered = filtered.filter((pkg) => pkg.price <= parseInt(filter.price));
    }

    if (filter.duration) {
      filtered = filtered.filter((pkg) => pkg.duration <= parseInt(filter.duration));
    }

    if (sortOption === "price-asc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "duration-asc") {
      filtered = filtered.sort((a, b) => a.duration - b.duration);
    } else if (sortOption === "duration-desc") {
      filtered = filtered.sort((a, b) => b.duration - a.duration);
    }

    setFilteredPackages(filtered);
  }, [searchQuery, filter, sortOption, packages]);

  const resetFilters = () => {
    setSearchQuery("");
    setFilter({ location: "", price: "", duration: "" });
    setSortOption("");
  };

  if (loading) return <p className="mt-10 text-lg text-center">Loading...</p>;
  if (error) return <p className="mt-10 text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl p-6 mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-center text-blue-600">Explore Our Packages</h2>

      {/* Search & Filters */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row">
        <input
          type="text"
          placeholder="Search by description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm md:w-1/3 focus:ring focus:ring-blue-200"
        />
        <input
          type="text"
          placeholder="Location"
          value={filter.location}
          onChange={(e) => setFilter({ ...filter, location: e.target.value })}
          className="w-full p-3 border rounded-lg shadow-sm md:w-1/3 focus:ring focus:ring-blue-200"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filter.price}
          onChange={(e) => setFilter({ ...filter, price: e.target.value })}
          className="w-full p-3 border rounded-lg shadow-sm md:w-1/3 focus:ring focus:ring-blue-200"
        />
        <input
          type="number"
          placeholder="Max Duration (days)"
          value={filter.duration}
          onChange={(e) => setFilter({ ...filter, duration: e.target.value })}
          className="w-full p-3 border rounded-lg shadow-sm md:w-1/3 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Sorting & Reset */}
      <div className="flex items-center gap-4 mb-6">
        <label className="font-semibold">Sort by:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
        >
          <option value="">None</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="duration-asc">Duration: Short to Long</option>
          <option value="duration-desc">Duration: Long to Short</option>
        </select>
        <button
          onClick={resetFilters}
          className="px-6 py-3 text-white transition bg-red-500 rounded-lg shadow-md hover:bg-red-600"
        >
          Reset
        </button>
      </div>

      {/* Package Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPackages.length > 0 ? (
          filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="flex flex-col justify-between p-6 transition bg-white border rounded-lg shadow-md hover:shadow-xl"
            >
              <div>
                <h3 className="text-2xl font-bold text-blue-700">৳{pkg.price}</h3>
                <p className="text-gray-600">{pkg.description}</p>
                <p className="text-gray-600"><strong>Duration:</strong> {pkg.duration} days</p>
                <p className="text-gray-600"><strong>Location:</strong> {pkg.location}</p>
              </div>
              {userRole === "tourguide" && (
                <div className="mt-4 space-x-2">
                  <button
                    onClick={() => updatePackage(pkg.id)}
                    className="px-4 py-2 text-white transition bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePackage(pkg.id)}
                    className="px-4 py-2 text-white transition bg-red-500 rounded-lg shadow-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No packages found</p>
        )}
      </div>
    </div>
  );
};

export default PackagesPage;
