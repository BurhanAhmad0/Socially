import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useApp } from "../Context/AppContext.jsx";

const SuggestionSidebarSection = () => {
  const navigate = useNavigate();
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const { handleFollow } = useApp();

  useEffect(() => {
    const controller = new AbortController();

    const fetchSuggestedUsers = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/suggestions`,
          {
            withCredentials: true,
          }
        );
        console.log(data);
        setSuggestedUsers(data.users);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Fetch canceled");
        } else {
          console.error("Failed to fetch suggested users:", error);
        }
      }
    };

    fetchSuggestedUsers();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <aside className="w-64 lg:w-72 hidden md:block">
      <div className="bg-white dark:bg-[#2a2a2a] rounded-lg shadow-sm p-4 transition-colors duration-300">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Suggestions
        </h2>
        {suggestedUsers.length < 1 ? (
          <div>No suggested users</div>
        ) : (
          suggestedUsers.map((user, index) => (
            <div
              onClick={() => navigate(`/${user.username}`)}
              key={user._id}
              className="cursor-pointer flex items-center justify-between mb-3"
            >
              <div className="flex items-center">
                <img
                  src={
                    user.avatar
                      ? user.avatar
                      : `https://i.pravatar.cc/150?img=${index}`
                  }
                  alt="user"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  @{user.username}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFollow(user.username);
                }}
                className="cursor-pointer bg-[#1A202C] text-white dark:bg-white dark:text-black px-4 py-1 rounded hover:opacity-90 transition duration-200"
              >
                Follow
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export default SuggestionSidebarSection;
