import React from "react";
import ExploreFeedGridSection from "../Components/ExploreFeedGridSection";

const Explore = () => {
  const mockPosts = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    image: `https://picsum.photos/seed/${i}/300/300`,
    username: `user_${i}`,
    caption: `This is a post caption ${i}`,
  }));

  const topics = [
    "Travel",
    "Fitness",
    "Art",
    "Music",
    "Food",
    "Coding",
    "Fashion",
  ];

  return (
    <div className="min-h-screen bg-[#f9f9f9] dark:bg-[#1f1f1f] transition-colors duration-300">
      {/* Top Bar */}
      <div className="bg-white dark:bg-[#2a2a2a] px-5 py-7 flex justify-between items-center sticky top-0 z-10 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Explore
        </h1>
        <input
          type="text"
          placeholder="Search..."
          className="w-60 px-5 py-2 rounded-md outline-none border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#3a3a3a] text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-[#1A202C] transition-all"
        />
      </div>

      {/* Topics */}
      <div className="overflow-x-auto py-4 px-6">
        <div className="flex gap-3">
          {topics.map((topic, idx) => (
            <button
              key={idx}
              className="px-4 py-1 rounded-full cursor-pointer text-sm font-medium bg-gray-100 dark:bg-[#2a2a2a] text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-[#3a3a3a] transition"
            >
              #{topic}
            </button>
          ))}
        </div>
      </div>

      {/* Feed Grid */}
      <ExploreFeedGridSection mockPosts={mockPosts} />
    </div>
  );
};

export default Explore;
