import React, { createContext, useContext } from "react";
import axios from "axios";

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

const handleFollow = async (username) => {
  if (!username) return console.warn("Username is required to follow");

  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/user/follow/${username}`,
      null,
      { withCredentials: true }
    );
    console.log("Followed user successfully:", data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Follow request failed:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

const handleUnfollow = async (username) => {
  if (!username) return console.warn("Username is required to unfollow");

  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/user/unfollow/${username}`,
      null,
      { withCredentials: true }
    );
    console.log("Unfollowed user successfully:", data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Unfollow request failed:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{ handleFollow, handleUnfollow }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
