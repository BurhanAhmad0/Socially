// hooks/useApplyTheme.js
import { useEffect } from "react";

export const useApplyTheme = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("appearance") || "system";
    const root = document.documentElement;
    root.classList.remove("dark", "light");

    if (savedTheme === "dark") {
      root.classList.add("dark");
    } else if (savedTheme === "light") {
      root.classList.add("light");
    }
    // If system, rely on Tailwind's 'media' setting (no class needed)
  }, []);
};
