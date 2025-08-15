import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileAboutSection = ({
  bio,
  firstName,
  lastName,
  username,
  email,
  location,
  website,
  skills,
  userReqLoading,
}) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="bg-white dark:bg-[#1f1f1f] rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            About
          </h3>
          <button
            onClick={() => {
              navigate("/settings");
            }}
            className="cursor-pointer bg-[#1A202C] dark:bg-white dark:text-black dark:hover:bg-white/80 text-white px-5 py-2 rounded-md hover:bg-[#1A202C]/80 transition-colors duration-200"
          >
            Edit Profile
          </button>
        </div>

        {userReqLoading ? (
          <div className="animate-pulse">
            {/* Bio */}
            <div className="mb-6">
              <div className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="w-5/6 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              {/* Full Name */}
              <div>
                <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                <div className="w-40 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>

              {/* Location */}
              <div>
                <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                <div className="w-36 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>

              {/* Email */}
              <div>
                <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                <div className="w-48 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>

              {/* Website */}
              <div>
                <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                <div className="w-44 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>

              {/* Skills */}
              <div className="sm:col-span-2">
                <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Bio */}
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {bio && bio.trim().length > 0 ? bio : "Bio is empty."}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">
                  Full Name:
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {firstName + " " + lastName}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">
                  Location:
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {location?.trim() ? location : "Location is not added"}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">
                  Email:
                </p>
                <p className="text-gray-700 dark:text-gray-300">{email}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">
                  Website:
                </p>
                {website?.trim() ? (
                  <a
                    href={
                      website.startsWith("http")
                        ? website
                        : `https://${website}`
                    }
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {website}
                  </a>
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">
                    Website is not added
                  </span>
                )}
              </div>
              <div className="sm:col-span-2">
                <p className="font-semibold text-gray-800 dark:text-gray-100">
                  Skills:
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills?.length > 0 ? (
                    skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      No skills added yet.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileAboutSection;
