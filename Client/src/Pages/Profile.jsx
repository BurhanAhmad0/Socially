import React, { useState, useEffect } from "react";
import ProfileHeaderSection from "../Components/ProfileHeaderSection.jsx";
import ProfileStatsSection from "../Components/ProfileStatsSection.jsx";
import PostGallerySection from "../Components/PostGallerySection.jsx";
import ProfileAboutSection from "../Components/ProfileAboutSection.jsx";
import ProfileMediaSection from "../Components/ProfileMediaSection.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

const posts = [
  { id: 1, image: "https://picsum.photos/id/101/600/400" },
  { id: 2, image: "https://picsum.photos/id/102/600/400" },
  { id: 3, image: "https://picsum.photos/id/103/600/400" },
];

const ProfilePage = () => {
  const { username } = useParams();

  const [tab, setTab] = useState("posts");
  const [userProfile, setUserProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/${username}`,
          { withCredentials: true }
        );

        if ([200, 204].includes(response.status)) {
          console.log("User profile retrieved successfully:", response.data);
          // Optionally: update state, clear local storage, or trigger UI updates
          // toast.success("Profile loaded successfully");
          setUserProfile(response.data.user);
          setIsFollowing(response.data.isFollowing);
          setIsCurrentUser(response.data.isCurrentUser);
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
      }
    };

    // Cleanup function triggers profile fetch upon unmount if required
    fetchUserProfile();
  }, [username]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#1f1f1f] transition-colors duration-300">
      {/* Profile Header */}
      <ProfileHeaderSection
        isFollowing={isFollowing}
        isCurrentUser={isCurrentUser}
        username={userProfile?.username}
        firstName={userProfile?.firstName}
        lastName={userProfile?.lastName}
        avatar={userProfile?.avatar}
      />

      {/* Stats */}
      <ProfileStatsSection
        followers={userProfile?.followers.length}
        following={userProfile?.following.length}
      />

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-4 mt-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 space-x-8">
          <button
            onClick={() => setTab("posts")}
            className={`pb-2 hover:text-[#1A202C] dark:hover:text-white cursor-pointer ${
              tab === "posts"
                ? "border-b-2 border-[#1A202C] dark:border-white text-[#1A202C] dark:text-white"
                : ""
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setTab("media")}
            className={`pb-2 hover:text-[#1A202C] dark:hover:text-white cursor-pointer ${
              tab === "media"
                ? "border-b-2 border-[#1A202C] dark:border-white text-[#1A202C] dark:text-white"
                : ""
            }`}
          >
            Media
          </button>
          <button
            onClick={() => setTab("about")}
            className={`pb-2 hover:text-[#1A202C] dark:hover:text-white cursor-pointer ${
              tab === "about"
                ? "border-b-2 border-[#1A202C] dark:border-white text-[#1A202C] dark:text-white"
                : ""
            }`}
          >
            About
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {tab === "posts" && <PostGallerySection posts={posts} />}
      {tab === "media" && <ProfileMediaSection />}
      {tab === "about" && (
        <ProfileAboutSection
          bio={userProfile?.bio}
          firstName={userProfile?.firstName}
          lastName={userProfile?.lastName}
          username={userProfile?.username}
          email={userProfile?.email}
          location={userProfile?.location}
          website={userProfile?.website}
          skills={userProfile?.skills}
        />
      )}
    </div>
  );
};

export default ProfilePage;
