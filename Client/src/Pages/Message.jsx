import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const conversations = [
  {
    id: 1,
    name: "sara_01",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Hey, are you free later?",
    time: "2m ago",
  },
  {
    id: 2,
    name: "john_dev",
    avatar: "https://i.pravatar.cc/150?img=8",
    lastMessage: "Let's finish that feature.",
    time: "10m ago",
  },
  {
    id: 3,
    name: "linda_art",
    avatar: "https://i.pravatar.cc/150?img=12",
    lastMessage: "I liked your latest post!",
    time: "1h ago",
  },
];

const Messages = () => {
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState(1);
  const selectedConversation = conversations.find((c) => c.id === selectedId);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#1f1f1f] flex transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-full md:w-72 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] p-4 space-y-4">
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

      {/* Chat Window */}
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
    </div>
  );
};

export default Messages;
