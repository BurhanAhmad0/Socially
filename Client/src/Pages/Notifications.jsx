import React from "react";
import NotificationsListSection from "../Components/NotificationsListSection.jsx";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "like",
      user: "sara_01",
      message: "liked your photo",
      avatar: "https://i.pravatar.cc/150?img=5",
      time: "2m ago",
    },
    {
      id: 2,
      type: "comment",
      user: "john_dev",
      message: 'commented: "Nice shot!"',
      avatar: "https://i.pravatar.cc/150?img=8",
      time: "10m ago",
    },
    {
      id: 3,
      type: "follow",
      user: "linda_art",
      message: "started following you",
      avatar: "https://i.pravatar.cc/150?img=12",
      time: "1h ago",
    },
    {
      id: 4,
      type: "like",
      user: "mark_777",
      message: "liked your post",
      avatar: "https://i.pravatar.cc/150?img=16",
      time: "3h ago",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f9f9f9] dark:bg-[#1f1f1f] transition-colors duration-300">
      {/* Top Bar */}
      <div className="bg-white dark:bg-[#2a2a2a] px-5 py-7 flex items-center justify-between sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Notifications
        </h1>
      </div>

      {/* Notification List */}
      <NotificationsListSection notifications={notifications} />
    </div>
  );
};

export default Notifications;
