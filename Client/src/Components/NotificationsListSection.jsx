import React from "react";
import { FaHeart, FaCommentDots, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

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
      {!notifications?.length ? (
        <div className="text-sm text-gray-500 text-center py-10">
          No notifications
        </div>
      ) : (
        notifications.map((notif) => (
          <div
            role="button"
            tabIndex={0}
            key={notif._id}
            onClick={() => navigate(`/post/${notif.postId}`)}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate(`/post/${notif.postId}`)
            }
            className="cursor-pointer bg-white dark:bg-[#2a2a2a] rounded-md shadow-sm flex items-center p-4 hover:shadow-md hover:bg-gray-50 dark:hover:bg-[#333] transition"
          >
            <img
              src={notif.sender.avatar || "/default-avatar.png"}
              alt={notif.sender.username}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />

            <div className="flex-1">
              <p className="text-sm text-gray-800 dark:text-gray-100">
                <span className="font-semibold">@{notif.sender.username}</span>{" "}
                {notif.notification}
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(new Date(notif.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>

            <div className="ml-4 text-xl text-gray-700 dark:text-gray-300">
              {getIcon(notif.type)}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationsListSection;
