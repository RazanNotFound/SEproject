import {  Link  } from "react-router-dom";

const StartForm = () => {
  return (
    <div className="text-center mt-32">
      <h1 className="text-4xl font-bold mb-10">Very Good Ticketing Website</h1>
      <Link to="/register">
        <button className="bg-blue-600 text-white text-lg px-6 py-3 rounded hover:bg-blue-700 mb-4">
          Register
        </button>
      </Link>
      <div>
        <p className="mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default StartForm;
