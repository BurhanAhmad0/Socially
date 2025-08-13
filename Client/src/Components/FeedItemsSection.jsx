import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FeedItemsSection = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getFeedPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/feed`,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        setPosts(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    };

    getFeedPosts();
  }, []);

  return (
    <div className="space-y-6">
      {/* Text-only posts */}
      {posts.map((post) => (
        <div
          onClick={() => navigate(`/post/${post._id}`)}
          key={post._id}
          className="bg-white dark:bg-[#2a2a2a] rounded-lg shadow p-4 cursor-pointer transition-colors duration-300"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/${post.owner.username}`);
            }}
            className="flex items-center mb-2"
          >
            <img
              src={post.owner.avatar}
              alt={`User ${post._id}`}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              @{post.owner.username}
            </p>
          </div>
          {post.image && (
            <img
              className="w-full object-cover rounded-md mb-2"
              src={post.image}
              alt="Post"
            />
          )}
          {post.text && (
            <p className="text-gray-700 dark:text-gray-300">{post.text}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeedItemsSection;
