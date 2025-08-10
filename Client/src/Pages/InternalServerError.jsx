import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const InternalServerError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4 text-center">
      <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />

      <h1 className="text-5xl font-bold text-red-600 mb-2">500</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Internal Server Error
      </h2>

      <p className="text-gray-600 max-w-md mb-6">
        Oops! Something went wrong on our end. Please try again later, or return
        to the homepage.
      </p>

      <Link
        to="/"
        className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded transition duration-200 cursor-pointer"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default InternalServerError;
