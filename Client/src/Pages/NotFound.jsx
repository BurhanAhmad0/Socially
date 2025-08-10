import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mt-4">
          Page Not Found
        </h2>
        <p className="mt-2 text-gray-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-[#1A202C] hover:bg-[#1A202C]/75 text-white text-sm font-medium px-6 py-3 rounded shadow transition duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
