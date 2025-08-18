import React from "react";
import { useNavigate } from "react-router-dom";

const MessageSidebar = ({
  conversationList,
  selectedId,
  setSelectedId,
  conversationReqLoading,
}) => {
  const navigate = useNavigate();

  return (
    <aside className="hidden md:block w-full md:w-72 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] p-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Messages
      </h2>
      {conversationReqLoading ? (
        <div className="space-y-3 p-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center p-2 rounded-lg animate-pulse"
            >
              {/* Avatar skeleton */}
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full mr-3"></div>

              {/* Username + message skeleton */}
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
              </div>

              {/* Time/Badge skeleton */}
              <div className="w-6 h-3 bg-gray-300 dark:bg-gray-700 rounded ml-2"></div>
            </div>
          ))}
        </div>
      ) : conversationList.length < 1 ? (
        <div className="text-sm text-gray-500 text-center py-5">
          No conversation done yet
        </div>
      ) : (
        conversationList.map((conv) => (
          <div
            key={conv._id}
            onClick={() => navigate(`/messages/${conv.username}`)}
            className={`flex items-center p-2 rounded-lg cursor-pointer transition ${
              conv._id === selectedId
                ? "bg-gray-200 dark:bg-white/10"
                : "hover:bg-gray-200 dark:hover:bg-white/10"
            }`}
          >
            {/* Avatar */}
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/${conv.username}`);
              }}
              src={conv.avatar}
              alt={conv.username}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />

            {/* User Info */}
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {conv.firstName} {conv.lastName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                @{conv.username}
              </p>
            </div>

            {/* Timestamp */}
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
              {new Date(conv.createdAt).toLocaleDateString([], {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        ))
      )}
    </aside>
  );
};

export default MessageSidebar;
