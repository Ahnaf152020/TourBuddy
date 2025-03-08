import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPackages, updatePackage, deletePackage, createPackage, getUserRole } from "../api/api";

const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({ location: "", price: "", duration: "" });
  const [sortOption, setSortOption] = useState("");
  const [newPackage, setNewPackage] = useState({ description: "", price: "", duration: "", location: "" });
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [editFormData, setEditFormData] = useState({ description: "", price: "", duration: "", location: "" });
  const [suggestions, setSuggestions] = useState([]); // For auto-suggestions

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    fetchPackages();

    const fetchUserRole = async () => {
      try {
        const role = await getUserRole();
        setUserRole(role);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    };

    fetchUserRole();
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

  // Generate suggestions based on search query
  useEffect(() => {
    if (searchQuery) {
      const matchedSuggestions = packages
        .filter((pkg) =>
          pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((pkg) => pkg.description)
        .slice(0, 5); // Show only top 5 suggestions
      setSuggestions(matchedSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, packages]);

  useEffect(() => {
    let filtered = packages.filter((pkg) =>
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filter.location) {
      filtered = filtered.filter((pkg) =>
        pkg.location.toLowerCase().includes(filter.location.toLowerCase())
      );
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

  const handleAddPackage = async () => {
    if (!newPackage.description || !newPackage.price || !newPackage.duration || !newPackage.location) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const addedPackage = await createPackage(newPackage);
      setPackages([...packages, addedPackage]);
      setFilteredPackages([...filteredPackages, addedPackage]);
      setNewPackage({ description: "", price: "", duration: "", location: "" });
    } catch (error) {
      console.error("Failed to create package:", error);
    }
  };

  const handleEditClick = (pkg) => {
    setEditingPackageId(pkg.id);
    setEditFormData({
      description: pkg.description,
      price: pkg.price,
      duration: pkg.duration,
      location: pkg.location,
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleUpdatePackage = async (id) => {
    try {
      const updatedPkg = await updatePackage(id, editFormData);
      setPackages(packages.map((pkg) =>
        pkg.id === id ? { ...pkg, ...updatedPkg } : pkg
      ));
      setFilteredPackages(filteredPackages.map((pkg) =>
        pkg.id === id ? { ...pkg, ...updatedPkg } : pkg
      ));
      setEditingPackageId(null); // Close the edit form
      alert("Package updated successfully!");
    } catch (error) {
      console.error("Failed to update package:", error);
      alert("Failed to update package: " + error.message);
    }
  };

  const handleDeletePackage = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        await deletePackage(id);
        setPackages(packages.filter((pkg) => pkg.id !== id));
        setFilteredPackages(filteredPackages.filter((pkg) => pkg.id !== id));
      } catch (error) {
        console.error("Failed to delete package:", error);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion); // Auto-fill the search query
    setSuggestions([]); // Clear suggestions
  };

  const handleSelectPackage = (pkg) => {
    // Navigate to the package details page or booking page
    navigate(`/package/${pkg.id}`, { state: { package: pkg } });
  };

  const handleReviewPackage = (pkg) => {
    // Navigate to the review page for the selected package
    navigate(`/review/${pkg.id}`, { state: { package: pkg } });
  };

  if (loading) return <p className="flex items-center justify-center min-h-screen text-lg text-gray-700">Loading...</p>;
  if (error) return <p className="flex items-center justify-center min-h-screen text-lg text-red-500">{error}</p>;

  return (
    <div className="min-h-screen py-10 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-6xl p-6 mx-auto">
        <h2 className="mb-6 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Explore Our Packages
        </h2>

        {/* Search & Filters */}
        <div className="flex flex-col gap-4 mb-6 md:flex-row">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search by description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
            />
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
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

        {/* Add Package (Only for Tour Guide) */}
        {userRole === "tour_guide" && (
          <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
            <h3 className="mb-4 text-xl font-semibold">Add New Package</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <input
                type="text"
                placeholder="Description"
                value={newPackage.description}
                onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                className="p-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Price"
                value={newPackage.price}
                onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                className="p-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Duration (days)"
                value={newPackage.duration}
                onChange={(e) => setNewPackage({ ...newPackage, duration: e.target.value })}
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Location"
                value={newPackage.location}
                onChange={(e) => setNewPackage({ ...newPackage, location: e.target.value })}
                className="p-2 border rounded-md"
              />
            </div>
            <button
              onClick={handleAddPackage}
              className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Add Package
            </button>
          </div>
        )}

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

        {/* Package List */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.length > 0 ? (
            filteredPackages.map((pkg) => (
              <div key={pkg.id} className="p-6 transition-shadow bg-white border rounded-lg shadow-md hover:shadow-lg">
                {editingPackageId === pkg.id ? (
                  // Edit Form
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border rounded-md"
                      placeholder="Description"
                    />
                    <input
                      type="number"
                      name="price"
                      value={editFormData.price}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border rounded-md"
                      placeholder="Price"
                    />
                    <input
                      type="number"
                      name="duration"
                      value={editFormData.duration}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border rounded-md"
                      placeholder="Duration (days)"
                    />
                    <input
                      type="text"
                      name="location"
                      value={editFormData.location}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border rounded-md"
                      placeholder="Location"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdatePackage(pkg.id)}
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingPackageId(null)}
                        className="w-full px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // Package Details
                  <>
                    <h3 className="text-2xl font-bold text-blue-700">৳{pkg.price}</h3>
                    <p className="text-gray-600">{pkg.description}</p>
                    <p className="text-gray-600">Location: {pkg.location}</p>
                    <p className="text-gray-600">Duration: {pkg.duration} days</p>
                    {userRole === "tour_guide" ? (
                      <div className="mt-4 space-x-2">
                        <button
                          onClick={() => handleEditClick(pkg)}
                          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePackage(pkg.id)}
                          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div className="mt-4 space-x-2">
                        <button
                          onClick={() => handleSelectPackage(pkg)}
                          className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                        >
                          Select
                        </button>
                        <button
                          onClick={() => handleReviewPackage(pkg)}
                          className="px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600"
                        >
                          Review
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No packages found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;