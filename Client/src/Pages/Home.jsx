import React from "react";
import FeedItemsSection from "../Components/FeedItemsSection.jsx";
import FeedUploadSection from "../Components/FeedUploadSection.jsx";
import SuggestionSidebarSection from "../Components/SuggestionSidebarSection.jsx";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f9f9f9] dark:bg-[#1f1f1f] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto p-4 md:flex md:space-x-6">
        {/* Feed Section */}
        <section className="flex-1 mb-6 md:mb-0">
          {/* Feed Upload Section */}
          <FeedUploadSection />

          {/* Feed Items Section */}
          <FeedItemsSection />
        </section>

        {/* Sidebar Section */}
        <SuggestionSidebarSection />
      </main>
    </div>
  );
};

export default Home;
