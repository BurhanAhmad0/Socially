import React from "react";
import { useNavigate } from "react-router-dom";

const ExploreFeedGridSection = ({ mockPosts }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6 pb-10">
      {mockPosts.map((post) => (
        <div
          onClick={() => navigate(`/post/${post.id}`)}
          key={post.id}
          className="bg-white dark:bg-[#2a2a2a] cursor-pointer rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-colors duration-300"
        >
          <img
            src={post.image}
            alt="Post"
            className="w-full h-48 object-cover"
          />
          <div className="p-3">
            <p
              onClick={(e) => {
                e.stopPropagation();
                navigate("/burhan");
              }}
              className="text-sm font-semibold text-gray-900 dark:text-gray-200"
            >
              @{post.username}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {post.caption}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExploreFeedGridSection;
