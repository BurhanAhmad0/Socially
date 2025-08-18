import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../Context/AppContext.jsx";
import { LuLoaderCircle } from "react-icons/lu";

const ProfileHeaderSection = ({
  username,
  firstName,
  lastName,
  isFollowing,
  isCurrentUser,
  avatar,
  userReqLoading,
}) => {
  const navigate = useNavigate();

  const { handleFollow, handleUnfollow, followReqLoading, unfollowReqLoading } =
    useApp();

  return (
    <div className="bg-white dark:bg-[#1f1f1f] shadow-md transition-colors duration-300">
      {userReqLoading ? (
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center md:items-start md:space-x-6 animate-pulse">
          {/* Avatar placeholder */}
          <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-600 border-4 border-white dark:border-[#2c2c2c] shadow-md"></div>

          <div className="mt-4 md:mt-0 text-center md:text-left w-full md:w-auto">
            {/* Name placeholder */}
            <div className="w-48 h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2 mx-auto md:mx-0"></div>

            {/* Username placeholder */}
            <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded mx-auto md:mx-0 mb-4"></div>

            {/* Buttons placeholder */}
            <div className="flex justify-center md:justify-start mt-4 space-x-4">
              <div className="w-28 h-9 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="w-28 h-9 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      ) : (
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
                      disabled={unfollowReqLoading}
                      className="dark:bg-white dark:text-black dark:hover:bg-white/80 bg-[#1A202C] text-white px-7 py-2 rounded hover:bg-[#1A202C]/75 cursor-pointer transition"
                    >
                      {unfollowReqLoading ? (
                        <LuLoaderCircle color="black" />
                      ) : (
                        "Unfollow"
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFollow(username);
                      }}
                      disabled={followReqLoading}
                      className="dark:bg-white dark:text-black dark:hover:bg-white/80 bg-[#1A202C] text-white px-7 py-2 rounded hover:bg-[#1A202C]/75 cursor-pointer transition"
                    >
                      {followReqLoading ? (
                        <LuLoaderCircle color="black" />
                      ) : (
                        "Follow"
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`/messages/${username}`)}
                    className="dark:bg-white dark:text-black dark:hover:bg-white/80 bg-[#1A202C] text-white px-7 py-2 rounded hover:bg-[#1A202C]/75 cursor-pointer transition"
                  >
                    Message
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeaderSection;
