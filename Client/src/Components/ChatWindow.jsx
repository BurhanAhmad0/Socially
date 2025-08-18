import React from "react";
import MessageImage from "../assets/message.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

const ChatWindow = ({
  selectedConversation,
  setMessage,
  message,
  sendMessage,
  messagesArray,
  messageFetchReqLoading,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <main className="flex-1 p-4 flex flex-col">
      {selectedConversation ? (
        <>
          {/* Chat Header */}
          <div className="bg-white dark:bg-[#2a2a2a] p-4 rounded-lg shadow-sm flex items-center mb-4">
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/${selectedConversation?.username}`);
              }}
              src={selectedConversation?.avatar}
              alt={selectedConversation?.username}
              className="w-10 h-10 rounded-full object-cover mr-3 cursor-pointer"
            />
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/${selectedConversation?.username}`);
              }}
            >
              <p className="font-semibold text-gray-800 dark:text-gray-100 cursor-pointer">
                {selectedConversation?.firstName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 p-2">
            {/* Incoming message */}
            {messageFetchReqLoading ? (
              <div>Loading...</div>
            ) : messagesArray.length < 1 ? (
              <div className="text-sm text-gray-400 text-center py-10">
                No conversation done yet
              </div>
            ) : (
              messagesArray.map((message, index) => (
                <div key={index} className="flex flex-col items-start">
                  <div
                    className={`p-3 rounded-md shadow max-w-xs text-sm text-gray-800 dark:text-gray-100
                    ${
                      user?._id === message.sender
                        ? "bg-blue-500 text-white self-end" // Sent by me
                        : "bg-gray-300 dark:bg-[#2a2a2a] self-start"
                    }
                  `}
                  >
                    {message.text}
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <div className="mt-4 flex items-center bg-white dark:bg-[#2a2a2a] rounded-md shadow px-3 py-2">
            <input
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              value={message}
              placeholder="Type a message..."
              className="flex-1 outline-none border-none text-sm text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-transparent"
            />
            <button
              onClick={(e) => {
                sendMessage(e);
              }}
              className="dark:bg-white dark:text-black dark:hover:bg-white/80 ml-3 cursor-pointer bg-[#1A202C] text-white px-4 py-2 rounded hover:bg-[#1A202C]/75 transition text-sm"
            >
              Send
            </button>
          </div>
        </>
      ) : (
        // 🟢 Creative Fallback / Empty State
        <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400">
          <img
            src={MessageImage} // 👉 replace with your own illustration or Lottie animation
            loading="lazy"
            alt="Start chatting"
            className="w-52 h-52 mb-6 opacity-80"
          />
          <h2 className="text-xl font-semibold mb-2">Welcome to Messages 🎉</h2>
          <p className="text-sm max-w-md">
            Select a conversation from the left, or start a new one to begin
            chatting. Stay connected with your friends and colleagues 🚀
          </p>
        </div>
      )}
    </main>
  );
};

export default ChatWindow;
