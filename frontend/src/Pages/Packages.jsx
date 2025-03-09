;

const Packages = () => {
  const PackageCards = [
    {
      id: "1",
      price: "199.00",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore provident, vero rem quae ea ducimus. Quibusdam totam corporis suscipit et harum! Fugiat reprehenderit accusamus rerum ut soluta laborum quo vero",
      duration: "5",
      location: "Rangamati",
    },
    {
      id: "1",
      price: "199.00",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore provident, vero rem quae ea ducimus. Quibusdam totam corporis suscipit et harum! Fugiat reprehenderit accusamus rerum ut soluta laborum quo vero",
      duration: "5",
      location: "Rangamati",
    },
    {
      id: "1",
      price: "199.00",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore provident, vero rem quae ea ducimus. Quibusdam totam corporis suscipit et harum! Fugiat reprehenderit accusamus rerum ut soluta laborum quo vero",
      duration: "5",
      location: "Rangamati",
    },
    {
      id: "1",
      price: "199.00",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore provident, vero rem quae ea ducimus. Quibusdam totam corporis suscipit et harum! Fugiat reprehenderit accusamus rerum ut soluta laborum quo vero",
      duration: "5",
      location: "Rangamati",
    },
    {
      id: "1",
      price: "199.00",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore provident, vero rem quae ea ducimus. Quibusdam totam corporis suscipit et harum! Fugiat reprehenderit accusamus rerum ut soluta laborum quo vero",
      duration: "5",
      location: "Rangamati",
    },
    {
      id: "1",
      price: "199.00",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore provident, vero rem quae ea ducimus. Quibusdam totam corporis suscipit et harum! Fugiat reprehenderit accusamus rerum ut soluta laborum quo vero",
      duration: "5",
      location: "Rangamati",
    },
  ];

  return (
    <div className="w-4/5 mx-auto py-10">
      {/* Title */}
      <div>
        <h1 className="font-bold text-2xl text-[#2E60E2] md:text-3xl text-center">
          Explore Our Packages
        </h1>
      </div>
      {/* inputs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <input
          type="text"
          placeholder="Search by description"
          className="input input-bordered w-full "
        />
        <input
          type="text"
          placeholder="Location"
          className="input input-bordered w-full "
        />
        <input
          type="text"
          placeholder="Max Price"
          className="input input-bordered w-full "
        />
        <input
          type="text"
          placeholder="Max Duration (days)"
          className="input input-bordered w-full "
        />
      </div>
      {/* Sort Input */}
      <div className="flex items-center gap-4 mt-6">
        <h1 className="font-medium text-black">Sort by:</h1>
        <select className="select select-bordered w-3/6 md:w-full max-w-xs">
          <option disabled selected>
            None
          </option>
          {/* <option value="7">7 days</option> */}
          {/* <option value="14">14 days</option> */}
        </select>
        <button className="btn bg-[#EF4243] border-none text-white">
          Reset
        </button>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-4 mt-6">
        {PackageCards.map((pkg) => (
          <div
            key={pkg.id}
            className=" border card bg-white shadow-lg p-6 rounded-xl"
          >
            <h2 className="text-xl font-bold text-[#2E60E2]">
              <span className="text-base">৳</span> {pkg.price}
            </h2>
            <p className="text-gray-700 mt-2">{pkg.description}</p>
            
           
              <p className="text-gray-600 mt-2">
                <span className=" font-semibold">Duration:</span> {pkg.duration}{" "}
                days
              </p>
              
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              <span className=" font-semibold">Location:</span> {pkg.location}
            </p>
            {/* rating */}
            <div className="rating rating-sm">
                <input
                  type="radio"
                  name="rating-6"
                  className="mask mask-star-2 bg-blue-500"
                />
                <input
                  type="radio"
                  name="rating-6"
                  className="mask mask-star-2 bg-blue-500"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-6"
                  className="mask mask-star-2 bg-blue-500"
                />
                <input
                  type="radio"
                  name="rating-6"
                  className="mask mask-star-2 bg-blue-500"
                />
                <input
                  type="radio"
                  name="rating-6"
                  className="mask mask-star-2 bg-blue-500"
                />
              </div>
          </div>

        
            
            <button className="btn rounded-full mt-4 bg-[#2E60E2] text-lg text-white">Select</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
