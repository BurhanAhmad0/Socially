import React from "react";

const MessageSidebar = ({ conversations, selectedId, setSelectedId }) => {
  return (
    <aside className="hidden md:block w-full md:w-72 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] p-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Messages
      </h2>
      {conversations.map((conv) => (
        <div
          key={conv.id}
          onClick={() => setSelectedId(conv.id)}
          className={`flex items-center p-2 rounded-lg cursor-pointer transition ${
            conv.id === selectedId
              ? "bg-gray-200 dark:bg-white/10"
              : "hover:bg-gray-200 dark:hover:bg-white/10"
          }`}
        >
          <img
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/${conv.name}`);
            }}
            src={conv.avatar}
            alt={conv.name}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div className="flex-1">
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              @{conv.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {conv.lastMessage}
            </p>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
            {conv.time}
          </span>
        </div>
      ))}
    </aside>
  );
};

export default MessageSidebar;
