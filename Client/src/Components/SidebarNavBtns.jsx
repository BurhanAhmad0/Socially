import React from "react";
import NotificationIcon from "../assets/notification.svg";
import ExploreIcon from "../assets/explore.svg";
import HomeIcon from "../assets/home.svg";
import MessageIcon from "../assets/message.svg";
import UploadIcon from "../assets/plus-square.svg";
import { Link } from "react-router-dom";

const SidebarNavBtns = ({ setIsSidebarOpen }) => {
  return (
    <ul className="navBtns space-y-5 mt-8">
      <li
        onClick={() => {
          setIsSidebarOpen(false);
        }}
        className="text-lg text-gray-800 dark:text-gray-200 transition-colors duration-300"
      >
        <Link to={"/"} className="flex items-center gap-3">
          <img
            loading="lazy"
            className="w-7 h-7 invert-0 dark:invert transition duration-200"
            src={HomeIcon}
            alt="Home Icon"
          />
          Home
        </Link>
      </li>
      <li
        onClick={() => {
          setIsSidebarOpen(false);
        }}
        className="text-lg text-gray-800 dark:text-gray-200 transition-colors duration-300"
      >
        <Link to={"/explore"} className="flex items-center gap-3">
          <img
            loading="lazy"
            className="w-7 h-7 invert-0 dark:invert transition duration-200"
            src={ExploreIcon}
            alt="Explore Icon"
          />
          Explore
        </Link>
      </li>
      <li
        onClick={() => {
          setIsSidebarOpen(false);
        }}
        className="text-lg text-gray-800 dark:text-gray-200 transition-colors duration-300"
      >
        <Link to={"/notifications"} className="flex items-center gap-3">
          <img
            loading="lazy"
            className="w-7 h-7 invert-0 dark:invert transition duration-200"
            src={NotificationIcon}
            alt="Notification Icon"
          />
          Notifications
        </Link>
      </li>
      <li
        onClick={() => {
          setIsSidebarOpen(false);
        }}
        className="text-lg text-gray-800 dark:text-gray-200 transition-colors duration-300"
      >
        <Link to={"/messages"} className="flex items-center gap-3">
          <img
            loading="lazy"
            className="w-7 h-7 invert-0 dark:invert transition duration-200"
            src={MessageIcon}
            alt="Message Icon"
          />
          Messages
        </Link>
      </li>
      <li
        onClick={() => {
          setIsSidebarOpen(false);
        }}
        className="text-lg text-gray-800 dark:text-gray-200 transition-colors duration-300"
      >
        <Link to={"/upload"} className="flex items-center gap-3">
          <img
            loading="lazy"
            className="w-7 h-7 invert-0 dark:invert transition duration-200"
            src={UploadIcon}
            alt="Upload Icon"
          />
          Create Post
        </Link>
      </li>
    </ul>
  );
};

export default SidebarNavBtns;
