import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../Context/AppContext.jsx";

const ProfileHeaderSection = ({
  username,
  firstName,
  lastName,
  isFollowing,
  isCurrentUser,
  avatar,
}) => {
  const navigate = useNavigate();

  const { handleFollow, handleUnfollow } = useApp();

  return (
    <div className="bg-white dark:bg-[#1f1f1f] shadow-md transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center md:items-start md:space-x-6">
        <img
          src={avatar ? avatar : "https://i.pravatar.cc/150?img=15"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-[#2c2c2c] shadow-md"
        />
        <div className="mt-4 md:mt-0 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {firstName + " " + lastName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            @{username}
          </p>
          <div className="flex justify-center md:justify-start mt-4 space-x-4">
            {isCurrentUser ? (
              <button
                onClick={() => navigate("/settings")}
                className="dark:bg-white dark:text-black dark:hover:bg-white/80 bg-[#1A202C] text-white px-7 py-2 rounded hover:bg-[#1A202C]/75 cursor-pointer transition"
              >
                Edit Profile
              </button>
            ) : (
              <>
                {isFollowing ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnfollow(username);
                    }}
                    className="dark:bg-white dark:text-black dark:hover:bg-white/80 bg-[#1A202C] text-white px-7 py-2 rounded hover:bg-[#1A202C]/75 cursor-pointer transition"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFollow(username);
                    }}
                    className="dark:bg-white dark:text-black dark:hover:bg-white/80 bg-[#1A202C] text-white px-7 py-2 rounded hover:bg-[#1A202C]/75 cursor-pointer transition"
                  >
                    Follow
                  </button>
                )}
                <button
                  onClick={() => {
                    navigate("/messages");
                  }}
                  className="dark:bg-white dark:text-black dark:hover:bg-white/80 bg-[#1A202C] text-white px-7 py-2 rounded hover:bg-[#1A202C]/75 cursor-pointer transition"
                >
                  Message
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderSection;
