import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ExploreFeedGridSection = ({ mockPosts }) => {
  const navigate = useNavigate();
  const [explorePosts, setExplorePosts] = useState([]);

  useEffect(() => {
    const getExplorePosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/explore`,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        setExplorePosts(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    };

    getExplorePosts();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6 pb-10">
      {explorePosts.map((post) => (
        <div
          onClick={() => navigate(`/post/${post._id}`)}
          key={post._id}
          className="bg-white dark:bg-[#2a2a2a] cursor-pointer rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-colors duration-300"
        >
          <img
            src={post.image}
            alt="Post"
            className="w-full h-48 object-cover"
          />
          <div className="p-3">
            <p
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/${post.owner.username}`);
              }}
              className="text-sm font-semibold text-gray-900 dark:text-gray-200"
            >
              @{post.owner.username}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {post.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExploreFeedGridSection;
