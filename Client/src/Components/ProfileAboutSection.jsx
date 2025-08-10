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

        {/* Bio */}
        <div className="mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {bio && bio.trim().length > 0 ? bio : "Bio is empty."}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          {/* Full Name */}
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              Full Name:
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {firstName + " " + lastName}
            </p>
          </div>

          {/* Location */}
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              Location:
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {location?.trim() ? location : "Location is not added"}
            </p>
          </div>

          {/* Email */}
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              Email:
            </p>
            <p className="text-gray-700 dark:text-gray-300">{email}</p>
          </div>

          {/* Website */}
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              Website:
            </p>
            {website?.trim() ? (
              <a
                href={
                  website.startsWith("http") ? website : `https://${website}`
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

          {/* Skills */}
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
      </div>
    </div>
  );
};

export default ProfileAboutSection;
