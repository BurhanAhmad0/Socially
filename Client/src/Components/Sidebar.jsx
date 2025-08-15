import React from "react";
import { Link } from "react-router-dom";
import UserIcon from "../assets/user.svg";
import LogoutIcon from "../assets/logout.svg";
import SettingsIcon from "../assets/setting.svg";
import SidebarSearchComponent from "./SidebarSearchComponent.jsx";
import SidebarNavBtns from "./SidebarNavBtns.jsx";
import { useAuth } from "../Context/AuthContext.jsx";
import { LuLoaderCircle } from "react-icons/lu";

const Sidebar = () => {
  const { user, setUser, loading, handleLogout, logoutReqLoading } = useAuth();

  return (
    <aside className="sidebar h-full px-5 py-7 border-r border-gray-200 dark:border-gray-700 bg-[#f9f9f9] dark:bg-[#1f1f1f] text-gray-900 dark:text-gray-100 flex flex-col justify-between transition-colors duration-300">
      <h1 className="text-2xl font-bold">
        <Link
          to={"/"}
          className="text-gray-900 dark:text-white transition-colors duration-300"
        >
          Socially
        </Link>
      </h1>

      {/* Search Component */}
      <SidebarSearchComponent />

      {/* Navigation Buttons */}
      <SidebarNavBtns />

      <ul className="accountBtns mt-auto space-y-4">
        <li>
          <Link
            to={`/${user?.username}`}
            className="flex items-center gap-3 text-lg text-gray-800 dark:text-gray-200 transition-colors duration-300"
          >
            {user?.avatar ? (
              <img
                loading="lazy"
                className="w-7 h-7 rounded-full object-cover transition duration-200"
                src={user?.avatar}
                alt="User Icon"
              />
            ) : (
              <img
                loading="lazy"
                className="w-7 h-7 invert-0 dark:invert transition duration-200"
                src={UserIcon}
                alt="User Icon"
              />
            )}
            {user?.firstName}
          </Link>
        </li>
        <li>
          <Link
            to={"/settings"}
            className="flex items-center gap-3 text-lg text-gray-800 dark:text-gray-200 transition-colors duration-300"
          >
            <img
              loading="lazy"
              className="w-7 h-7 invert-0 dark:invert transition duration-200"
              src={SettingsIcon}
              alt="Settings Icon"
            />
            Settings
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              handleLogout();
            }}
            disabled={logoutReqLoading}
            className="cursor-pointer flex items-center gap-3 text-lg text-gray-800 dark:text-gray-200 transition-colors duration-300"
          >
            <img
              loading="lazy"
              className="w-7 h-7 invert-0 dark:invert transition duration-200"
              src={LogoutIcon}
              alt="Logout Icon"
            />
            {logoutReqLoading ? <LuLoaderCircle /> : "Logout"}
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
