import React from "react";
import { LuLoaderPinwheel } from "react-icons/lu";

const LoaderComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <header className="w-full p-6">
        <h1 className="text-3xl font-bold">Socially</h1>
      </header>

      {/* Loader in center */}
      <main className="flex flex-1 flex-col items-center justify-center text-center">
        <LuLoaderPinwheel size={48} className="animate-spin" />
        <p className="mt-4 text-sm">Loading, please wait...</p>
      </main>

      {/* Bottom Footer */}
      <footer className="w-full p-6 text-sm">
        © {currentYear} Socially. All rights reserved.
      </footer>
    </div>
  );
};

export default LoaderComponent;
