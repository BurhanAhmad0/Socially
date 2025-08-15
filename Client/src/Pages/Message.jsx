import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageSidebar from "../Components/MessageSidebar.jsx";
import ChatWindow from "../Components/ChatWindow.jsx";
import MessageSidebarBtn from "../Components/MessageSidebarBtn.jsx";
import { RxCross2 } from "react-icons/rx";

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

  const [isMessageSidebarOpen, setIsMessageSidebarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const selectedConversation = conversations.find((c) => c.id === selectedId);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#1f1f1f] flex transition-colors duration-300">
      {/* Sidebar */}
      <MessageSidebar
        conversations={conversations}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />

      {/* Mobile Sidebar */}
      <aside
        className={`absolute block md:hidden ${
          isMessageSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-full md:w-72 h-screen border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] p-4 space-y-4 transition-all duration-300`}
      >
        <div className="closeBtn flex items-center justify-end p-5">
          <button
            className="cursor-pointer"
            onClick={() => setIsMessageSidebarOpen(false)}
          >
            <RxCross2 size={25} />
          </button>
        </div>
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
      <ChatWindow selectedConversation={selectedConversation} />

      {/* Message Sidebar Button */}
      {!isMessageSidebarOpen && (
        <MessageSidebarBtn setIsMessageSidebarOpen={setIsMessageSidebarOpen} />
      )}
    </div>
  );
};

export default Messages;
