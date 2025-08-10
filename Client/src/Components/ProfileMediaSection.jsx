import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileMediaSection = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="bg-white dark:bg-[#1f1f1f] rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Media
        </h3>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <div
              key={id}
              className="relative cursor-pointer group overflow-hidden rounded-md shadow-sm"
            >
              <img
                src={`https://picsum.photos/seed/media-${id}/600/400`}
                alt={`Media ${id}`}
                className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/75 bg-opacity-30 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center">
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/post/1");
                  }}
                  className="bg-white text-black dark:bg-gray-100 dark:text-black px-5 py-2 rounded-sm"
                >
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileMediaSection;
