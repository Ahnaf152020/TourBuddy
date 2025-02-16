import { useNavigate } from "react-router-dom";

const LoginSelection = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 text-center bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-xl font-medium text-gray-900">Login as</h2>
        <div className="space-y-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login as Tourist
          </button>
          <button
            onClick={() => navigate("/tourguide-login")}
            className="w-full px-6 py-2 text-sm font-medium text-white bg-green-500 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Login as Tour Guide
          </button>
        </div>
      </div>
    </section>
  );
};

export default LoginSelection;
