import { useEffect, useState } from "react";
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
      setPackages([...packages, addedPackage]); // Add new package to state
      setFilteredPackages([...filteredPackages, addedPackage]);
      setNewPackage({ description: "", price: "", duration: "", location: "" });
    } catch (error) {
      console.error("Failed to create package:", error);
    }
  };

  const handleUpdatePackage = async (id) => {
    const updatedDescription = prompt("Enter new description:");
    const updatedPrice = prompt("Enter new price:");
    const updatedDuration = prompt("Enter new duration:");
    const updatedLocation = prompt("Enter new location:");

    if (updatedDescription && updatedPrice && updatedDuration && updatedLocation) {
        try {
            const updatedPkg = await updatePackage(id, {
                description: updatedDescription,
                price: parseFloat(updatedPrice), // Ensure numeric value
                duration: parseInt(updatedDuration, 10), // Ensure integer
                location: updatedLocation.trim()
            });

            setPackages(packages.map(pkg => 
                pkg.id === id ? { ...pkg, ...updatedPkg } : pkg
            ));

            setFilteredPackages(filteredPackages.map(pkg => 
                pkg.id === id ? { ...pkg, ...updatedPkg } : pkg
            ));

            alert("Package updated successfully!");
        } catch (error) {
            console.error("Failed to update package:", error);
            alert("Failed to update package: " + error.message);
        }
    } else {
        alert("All fields are required!");
    }
};


  const handleDeletePackage = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        await deletePackage(id);
        setPackages(packages.filter(pkg => pkg.id !== id));
        setFilteredPackages(filteredPackages.filter(pkg => pkg.id !== id));
      } catch (error) {
        console.error("Failed to delete package:", error);
      }
    }
  };

  if (loading) return <p className="mt-10 text-lg text-center">Loading...</p>;
  if (error) return <p className="mt-10 text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl p-6 mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-center text-blue-600">
        Explore Our Packages
      </h2>

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

      {/* Add Package (Only for Tour Guide) */}
      {userRole === "tour_guide" && (
        <div className="p-4 mb-6 bg-gray-100 rounded-lg">
          <h3 className="mb-2 text-xl font-semibold">Add New Package</h3>
          <div className="flex flex-wrap gap-2">
            <input type="text" placeholder="Description" value={newPackage.description}
              onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
              className="p-2 border rounded-md"/>
            <input type="number" placeholder="Price" value={newPackage.price}
              onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
              className="p-2 border rounded-md"/>
            <input type="number" placeholder="Duration (days)" value={newPackage.duration}
              onChange={(e) => setNewPackage({ ...newPackage, duration: e.target.value })}
              className="p-2 border rounded-md"/>
            <input type="text" placeholder="Location" value={newPackage.location}
              onChange={(e) => setNewPackage({ ...newPackage, location: e.target.value })}
              className="p-2 border rounded-md"/>
            <button onClick={handleAddPackage} className="px-4 py-2 text-white bg-green-500 rounded-md">Add</button>
          </div>
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
            <div key={pkg.id} className="p-6 bg-white border rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-700">৳{pkg.price}</h3>
              <p className="text-gray-600">{pkg.description}</p>
              {userRole === "tour_guide" && (
                <div className="mt-4 space-x-2">
                  <button onClick={() => handleUpdatePackage(pkg.id)} className="px-4 py-2 text-white bg-blue-500 rounded-md">Edit</button>
                  <button onClick={() => handleDeletePackage(pkg.id)} className="px-4 py-2 text-white bg-red-500 rounded-md">Delete</button>
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
