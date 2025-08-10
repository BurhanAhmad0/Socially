import React from "react";
import { FaHeart, FaCommentDots, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotificationsListSection = ({ notifications }) => {
  const getIcon = (type) => {
    switch (type) {
      case "like":
        return <FaHeart className="text-red-500" />;
      case "comment":
        return <FaCommentDots className="text-blue-500" />;
      case "follow":
        return <FaUserPlus className="text-green-500" />;
      default:
        return null;
    }
  };

  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-4 bg-[#f9f9f9] dark:bg-[#1f1f1f] transition-colors duration-300">
      {notifications.map((notif) => (
        <div
          onClick={() => navigate(`/post/${notif.postId}`)}
          key={notif.id}
          className="cursor-pointer bg-white dark:bg-[#2a2a2a] rounded-md shadow-sm flex items-center p-4 hover:shadow-md transition"
        >
          <img
            src={notif.avatar}
            alt={notif.user}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />

          <div className="flex-1">
            <p className="text-sm text-gray-800 dark:text-gray-100">
              <span className="font-semibold">@{notif.user}</span>{" "}
              {notif.message}
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {notif.time}
            </span>
          </div>

          <div className="ml-4 text-xl text-gray-700 dark:text-gray-300">
            {getIcon(notif.type)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsListSection;
