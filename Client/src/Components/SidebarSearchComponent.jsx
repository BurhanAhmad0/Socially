import React from "react";
import SearchIcon from "../assets/search.svg";

const SidebarSearchComponent = () => {
  return (
    <form className="relative mt-5">
      <label htmlFor="search">
        <img
          loading="lazy"
          className="w-5 h-5 absolute top-4 left-3 invert-0 dark:invert transition duration-200"
          src={SearchIcon}
          alt="Search Icon"
        />
      </label>
      <input
        autoComplete="off"
        className="w-full h-12 px-4 pl-10 rounded-full outline-none focus:ring-1 ring-offset-2 ring-black dark:ring-white bg-[#828282]/20 dark:bg-[#3a3a3a] text-gray-900 dark:text-gray-100 placeholder:text-sm placeholder:text-[#6C6C6C] dark:placeholder:text-gray-400 transition-all duration-300"
        placeholder="Search"
        type="search"
        name="search"
        id="search"
      />
    </form>
  );
};

export default SidebarSearchComponent;
