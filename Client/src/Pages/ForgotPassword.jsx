import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to password reset API
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Forgot Password
        </h2>

        {submitted ? (
          <div className="text-center">
            <p className="text-gray-700">
              If an account with <strong>{email}</strong> exists, a reset link
              has been sent.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm outline-none focus:ring focus:ring-[#1A202C] focus:ring-offset-2 transition-all duration-300"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1A202C] text-white py-2 rounded-md hover:bg-[#1A202C]/75 transition cursor-pointer"
            >
              Send Reset Link
            </button>
          </form>
        )}

        <div className="mt-6 text-sm text-center text-gray-600">
          <a href="/login" className="text-[#1A202C] hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
