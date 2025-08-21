import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import MessageSidebar from "../Components/MessageSidebar.jsx";
import ChatWindow from "../Components/ChatWindow.jsx";
import MessageSidebarBtn from "../Components/MessageSidebarBtn.jsx";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router-dom";
import axios from "axios";
import { socket } from "../Utils/socket.js";
import { useAuth } from "../Context/AuthContext.jsx";

const Messages = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const { user } = useAuth();

  let selectedConversation = null;
  const [message, setMessage] = useState("");
  const [isMessageSidebarOpen, setIsMessageSidebarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [messagesArray, setMessagesArray] = useState([]);
  const [messageFetchReqLoading, setMessageFetchReqLoading] = useState(false);
  const [userReqLoading, setUserReqLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [conversationList, setConversationList] = useState([]);
  const [conversationReqLoading, setConversationReqLoading] = useState(false);

  // If a username is in the URL, pick that conversation
  selectedConversation = userProfile; // fallback to first one if no username

  useEffect(() => {
    const fetchConversations = async () => {
      setConversationReqLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/conversations`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          // console.log("Conversations retrieved:", response.data);
          setConversationList(response.data.conversations || []);
        } else {
          console.warn("Unexpected server response:", response);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.message ||
            "Unable to fetch conversations. Please try again.";
          console.error("Axios error:", message);
          // toast.error(message); // optional
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        setConversationReqLoading(false);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setUserReqLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/${username}`,
          { withCredentials: true }
        );

        if ([200, 204].includes(response.status)) {
          // console.log("User profile retrieved successfully:", response.data);
          // Optionally: update state, clear local storage, or trigger UI updates
          // toast.success("Profile loaded successfully");
          setUserProfile(response.data.user);

          const ids = [response.data.user._id, user._id].sort();
          const roomName =
            "conversation" + ids[0].slice(0, 6) + ids[1].slice(0, 6);
          socket.emit("joinRoom", roomName);
        } else {
          console.warn(
            "Unexpected server response while fetching profile:",
            response
          );
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.message ||
            "Unable to fetch profile. Please try again.";
          console.error("Axios error while fetching profile:", message);
          // toast.error(message); // Optional user feedback
        } else {
          console.error("Unexpected error while fetching profile:", error);
        }
      } finally {
        setUserReqLoading(false);
      }
    };

    // Cleanup function triggers profile fetch upon unmount if required
    if (username) {
      fetchUserProfile();
    }
  }, [username]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message.trim() === "") {
      return;
    }

    try {
      // console.log(message);
      const ids = [selectedConversation._id, user._id].sort();
      const roomName = "conversation" + ids[0].slice(0, 6) + ids[1].slice(0, 6);

      socket.emit("sendMessage", {
        message,
        roomName,
        senderId: user?._id,
        recieverId: selectedConversation?._id,
      });

      setMessage("");
    } catch (error) {
      console.log(error);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      // console.log("✅ Connected to server:", socket.id);
    });

    socket.on("receiveMessage", (data) => {
      // console.log("📩 New message:", data);

      setMessagesArray((prevMessages) => [...prevMessages, data]);
    });

    socket.on("roomJoined", (data) => {
      // console.log("📩 Room Joined:", data);
    });

    return () => {
      socket.off("connect");
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      setMessageFetchReqLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/messages/${
            selectedConversation?._id
          }`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          // console.log("Messages retrieved successfully:", response);
          setMessagesArray(response.data.messages); // update your messages state
        } else {
          console.warn(
            "Unexpected server response while fetching messages:",
            response
          );
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.message ||
            "Unable to fetch messages. Please try again.";
          console.error("Axios error while fetching messages:", message);
        } else {
          console.error("Unexpected error while fetching messages:", error);
        }
      } finally {
        setMessageFetchReqLoading(false);
      }
    };

    if (userProfile?._id) {
      setMessagesArray([]);
      fetchMessages();
    }
  }, [userProfile]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#1f1f1f] flex transition-colors duration-300">
      {/* Sidebar */}
      <MessageSidebar
        conversationList={conversationList}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        conversationReqLoading={conversationReqLoading}
      />

      {/* Mobile Sidebar */}
      <aside
        className={`absolute z-10 block md:hidden ${
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
        {conversationList.map((conv) => (
          <div
            key={conv._id}
            onClick={() => {
              navigate(`/messages/${conv.username}`);
              setIsMessageSidebarOpen(false);
            }}
            className={`flex items-center p-2 rounded-lg cursor-pointer transition ${
              conv.id === selectedId
                ? "bg-gray-200 dark:bg-white/10"
                : "hover:bg-gray-200 dark:hover:bg-white/10"
            }`}
          >
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/${conv.username}`);
              }}
              src={conv.avatar}
              alt={conv.username}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                @{conv.firstName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {conv.lastMessage}
              </p>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
              {10}
            </span>
          </div>
        ))}
      </aside>

      {/* Chat Window */}
      <ChatWindow
        message={message}
        setMessage={setMessage}
        selectedConversation={selectedConversation}
        sendMessage={sendMessage}
        messagesArray={messagesArray}
        messageFetchReqLoading={messageFetchReqLoading}
      />

      {/* Message Sidebar Button */}
      {!isMessageSidebarOpen && (
        <MessageSidebarBtn setIsMessageSidebarOpen={setIsMessageSidebarOpen} />
      )}
    </div>
  );
};

export default Messages;
