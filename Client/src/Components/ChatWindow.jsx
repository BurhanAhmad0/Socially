import React from "react";

const ChatWindow = ({ selectedConversation }) => {
  return (
    <main className="flex-1 p-4 flex flex-col">
      {/* Chat Header */}
      <div className="bg-white dark:bg-[#2a2a2a] p-4 rounded-lg shadow-sm flex items-center mb-4">
        <img
          onClick={(e) => {
            e.stopPropagation();
            navigate("/burhan");
          }}
          src={selectedConversation.avatar}
          alt={selectedConversation.name}
          className="w-10 h-10 rounded-full object-cover mr-3 cursor-pointer"
        />
        <div
          onClick={(e) => {
            e.stopPropagation();
            navigate("/burhan");
          }}
        >
          <p className="font-semibold text-gray-800 dark:text-gray-100 cursor-pointer">
            @{selectedConversation.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-2">
        {/* Incoming message */}
        <div className="flex flex-col items-start">
          <div className="bg-white dark:bg-[#2a2a2a] p-3 rounded-md shadow max-w-xs text-sm text-gray-800 dark:text-gray-100">
            Hi there!
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            1:04 PM
          </span>
        </div>
        {/* Outgoing message */}
        <div className="flex flex-col items-end">
          <div className="dark:bg-white dark:text-black bg-[#1A202C] text-white p-3 rounded-md shadow max-w-xs text-sm">
            Hello! How are you?
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            1:05 PM
          </span>
        </div>
      </div>

      {/* Message Input */}
      <div className="mt-4 flex items-center bg-white dark:bg-[#2a2a2a] rounded-md shadow px-3 py-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 outline-none border-none text-sm text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-transparent"
        />
        <button className="dark:bg-white dark:text-black dark:hover:bg-white/80 ml-3 cursor-pointer bg-[#1A202C] text-white px-4 py-2 rounded hover:bg-[#1A202C]/75 transition text-sm">
          Send
        </button>
      </div>
    </main>
  );
};

export default ChatWindow;
