import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar.jsx";
import SidebarSearchComponent from "../Components/SidebarSearchComponent.jsx";
import SidebarNavBtns from "../Components/SidebarNavBtns.jsx";
import UserIcon from "../assets/user.svg";
import LogoutIcon from "../assets/logout.svg";
import SettingsIcon from "../assets/setting.svg";
import MenuIcon from "../assets/menu.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

const UserLayout = () => {
  const { user, setUser, loading, handleLogout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <section className="user-layout h-screen flex bg-[#f9f9f9] dark:bg-[#1f1f1f] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Sidebar (Desktop) */}
      <div className="sidebar hidden md:block w-1/4 bg-white dark:bg-[#2a2a2a] border-r border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <Sidebar />
      </div>

      {/* Main Section */}
      <div className="mainSection overflow-y-auto w-full md:w-3/4 bg-white dark:bg-[#2a2a2a] transition-colors duration-300">
        {/* Mobile Menu Button */}
        <div className="button block md:hidden p-5">
          <button
            className="w-8 h-8 dark:invert-100"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <img src={MenuIcon} alt="Menu Icon" />
          </button>
        </div>

        {/* Page Content */}
        <Outlet />
      </div>

      {/* Mobile Sidebar */}
      <aside
        className={`mobileSidebar absolute z-50 top-0 left-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden h-full w-3/4 max-w-xs px-5 py-7 border-r border-gray-200 dark:border-gray-700 bg-[#f9f9f9] dark:bg-[#1f1f1f] text-gray-900 dark:text-gray-100 flex flex-col justify-between transition-transform duration-300 ease-in-out`}
      >
        {/* Header */}
        <div className="head flex items-center gap-4 mb-6">
          <button
            className="w-7 h-7 dark:invert-100"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <img src={MenuIcon} alt="Menu Icon" />
          </button>
          <h1 className="text-2xl font-bold">
            <Link
              to="/"
              className="text-gray-900 dark:text-white transition-colors duration-300"
            >
              Socially
            </Link>
          </h1>
        </div>

        {/* Search */}
        <SidebarSearchComponent />

        {/* Nav Buttons */}
        <SidebarNavBtns />

        {/* Account Actions */}
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
              className="cursor-pointer flex items-center gap-3 text-lg text-gray-800 dark:text-gray-200 transition-colors duration-300"
            >
              <img
                loading="lazy"
                className="w-7 h-7 invert-0 dark:invert transition duration-200"
                src={LogoutIcon}
                alt="Logout Icon"
              />
              Logout
            </button>
          </li>
        </ul>
      </aside>
    </section>
  );
};

export default UserLayout;
