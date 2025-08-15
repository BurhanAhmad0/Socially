import React from "react";
import { FaMessage } from "react-icons/fa6";

const MessageSidebarBtn = ({ setIsMessageSidebarOpen }) => {
  return (
    <button
      onClick={() => setIsMessageSidebarOpen(true)}
      className="cursor-pointer bg-gray-700 w-14 h-14 text-xs rounded-md fixed bottom-7 left-5 flex md:hidden items-center justify-center"
    >
      <FaMessage size={20} />
    </button>
  );
};

export default MessageSidebarBtn;
