import React from "react";

const ProfileStatsSection = ({ followers, following }) => {
  return (
    <div className="bg-white dark:bg-[#1f1f1f] border-t border-b border-gray-200 dark:border-[#2c2c2c] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-around text-center">
        <div>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">
            128
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Posts</p>
        </div>
        <div>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">
            {followers}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
        </div>
        <div>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">
            {following}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileStatsSection;
