import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FeedItemsSection = () => {
  const navigate = useNavigate();
  const [feedReqLoading, setFeedReqLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getFeedPosts = async () => {
      setFeedReqLoading(true);
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
      } finally {
        setFeedReqLoading(false);
      }
    };

    getFeedPosts();
  }, []);

  return (
    <div className="space-y-6">
      {feedReqLoading ? (
        [...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#2a2a2a] rounded-lg shadow p-4 animate-pulse"
          >
            {/* User info skeleton */}
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 mr-3"></div>
              <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>

            {/* Image placeholder */}
            <div className="w-full h-60 bg-gray-300 dark:bg-gray-600 rounded-md mb-2"></div>

            {/* Text lines */}
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="w-5/6 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        ))
      ) : posts.length < 1 ? (
        <div className="text-gray-400 text-center py-5">No posts yet</div>
      ) : (
        posts.map((post) => (
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
        ))
      )}
    </div>
  );
};

export default FeedItemsSection;
