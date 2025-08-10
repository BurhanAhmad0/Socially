import React from "react";

const FeedUploadSection = () => {
  return (
    <div className="bg-white dark:bg-[#2a2a2a] rounded-lg shadow-sm p-4 mb-4 transition-colors duration-300">
      <p className="text-gray-600 dark:text-gray-300">What’s on your mind?</p>
      <textarea
        className="w-full outline-none focus:ring focus:ring-[#1A202C] dark:focus:ring-white focus:ring-offset-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#3a3a3a] text-gray-900 dark:text-gray-100 rounded-md mt-2 p-2 resize-none transition-all duration-300"
        rows="3"
        placeholder="Start a post..."
      ></textarea>
      <div className="flex justify-end mt-2">
        <button className="bg-[#1A202C] text-white dark:bg-white dark:text-black px-6 py-2 rounded hover:opacity-90 cursor-pointer transition duration-200">
          Post
        </button>
      </div>
    </div>
  );
};

export default FeedUploadSection;
