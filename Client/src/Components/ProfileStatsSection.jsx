import React from "react";

const ProfileStatsSection = ({
  numberOfPosts,
  followers,
  following,
  userReqLoading,
}) => {
  return (
    <div className="bg-white dark:bg-[#1f1f1f] border-t border-b border-gray-200 dark:border-[#2c2c2c] transition-colors duration-300">
      {userReqLoading ? (
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-around text-center animate-pulse">
          <div>
            <div className="w-10 h-6 bg-gray-300 dark:bg-gray-600 rounded mx-auto mb-1"></div>
            <div className="w-14 h-4 bg-gray-300 dark:bg-gray-600 rounded mx-auto"></div>
          </div>
          <div>
            <div className="w-10 h-6 bg-gray-300 dark:bg-gray-600 rounded mx-auto mb-1"></div>
            <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded mx-auto"></div>
          </div>
          <div>
            <div className="w-10 h-6 bg-gray-300 dark:bg-gray-600 rounded mx-auto mb-1"></div>
            <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded mx-auto"></div>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-around text-center">
          <div>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              {numberOfPosts}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Posts</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              {followers}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Followers
            </p>
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              {following}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Following
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileStatsSection;
