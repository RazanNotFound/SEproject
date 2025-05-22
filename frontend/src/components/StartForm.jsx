import { Link } from "react-router-dom";

const StartForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white/90 rounded-2xl shadow-2xl px-10 py-12 max-w-md w-full text-center backdrop-blur">
        <h1 className="text-4xl font-extrabold mb-8 text-indigo-700 drop-shadow">
          Very Good Ticketing Website
        </h1>
        <Link to="/register">
          <button className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-md hover:from-indigo-600 hover:to-blue-600 transition-all duration-200 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-300">
            Register
          </button>
        </Link>
        <div>
          <p className="mt-2 text-gray-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartForm;