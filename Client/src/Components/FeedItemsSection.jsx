import React from "react";
import { useNavigate } from "react-router-dom";

const FeedItemsSection = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Text-only posts */}
      {[1, 2, 3].map((id) => (
        <div
          onClick={() => navigate("/post/1")}
          key={id}
          className="bg-white dark:bg-[#2a2a2a] rounded-lg shadow p-4 cursor-pointer transition-colors duration-300"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate("/burhan");
            }}
            className="flex items-center mb-2"
          >
            <img
              src={`https://i.pravatar.cc/150?img=${id + 5}`}
              alt={`User ${id}`}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              @username_{id}
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            This is a sample post #{id}.
          </p>
        </div>
      ))}

      {/* Post with Image */}
      <div className="bg-white dark:bg-[#2a2a2a] rounded-lg shadow p-4 transition-colors duration-300">
        <div className="flex items-center mb-2">
          <img
            src="https://i.pravatar.cc/150?img=15"
            alt="User 1"
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            @username_1
          </p>
        </div>
        <img
          className="w-full object-cover rounded-md mb-2"
          src="https://picsum.photos/seed/1/600/400"
          alt="Post"
        />
        <p className="text-gray-700 dark:text-gray-300">
          This is a sample post with an image.
        </p>
      </div>

      {/* Post with Image */}
      <div className="bg-white dark:bg-[#2a2a2a] rounded-lg shadow p-4 transition-colors duration-300">
        <div className="flex items-center mb-2">
          <img
            src="https://i.pravatar.cc/150?img=15"
            alt="User 2"
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            @username_2
          </p>
        </div>
        <img
          className="w-full object-cover rounded-md mb-2"
          src="https://picsum.photos/seed/2/600/400"
          alt="Post"
        />
        <p className="text-gray-700 dark:text-gray-300">
          This is a sample post with an image.
        </p>
      </div>
    </div>
  );
};

export default FeedItemsSection;
