import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaThumbsUp, FaRegCommentDots, FaShareAlt } from "react-icons/fa";
import axios from "axios";

const Post = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [postReqLoading, setPostReqLoading] = useState(false);
  const [post, setPost] = useState(null);

  const formatRelativeTime = (date) => {
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const now = new Date();
    const diff = (date - now) / 1000; // seconds difference
    const minutes = Math.round(diff / 60);
    const hours = Math.round(diff / 3600);
    const days = Math.round(diff / 86400);

    if (Math.abs(minutes) < 60) return rtf.format(minutes, "minute");
    if (Math.abs(hours) < 24) return rtf.format(hours, "hour");
    return rtf.format(days, "day");
  };

  useEffect(() => {
    const getSinglePost = async () => {
      setPostReqLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/${postId}`,
          { withCredentials: true }
        );
        setPost(response.data.post);
      } catch (error) {
        console.log(error);
      } finally {
        setPostReqLoading(false);
      }
    };
    getSinglePost();
  }, [postId]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-[#121212] py-8 px-4 md:px-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#1e1e1e] shadow-md rounded-lg p-6 animate-pulse">
          {/* Owner Info */}
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 mr-4"></div>
            <div>
              <div className="w-40 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="w-24 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>

          {/* Post Content */}
          <div className="mb-4">
            <div className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div className="w-5/6 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
            <div className="w-full h-64 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          </div>

          {/* Interaction Buttons */}
          <div className="flex items-center justify-between border-t dark:border-gray-700 pt-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded"
              ></div>
            ))}
            <div className="w-24 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>

          {/* Comments */}
          <div className="mt-6">
            <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>

            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-start mt-4">
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 mr-3"></div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md w-full">
                  <div className="w-32 h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                  <div className="w-3/4 h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="w-16 h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#121212] py-8 px-4 md:px-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-[#1e1e1e] shadow-md rounded-lg p-6">
        {/* Owner Info */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/${post.owner?.username}`);
          }}
          className="flex items-center mb-4 cursor-pointer"
        >
          <img
            src={post.owner?.avatar}
            alt={post.owner?.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {post.owner?.firstName + " " + post.owner?.lastName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              @{post.owner?.username}
            </p>
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-800 dark:text-gray-100 mb-4">{post.text}</p>
          {post.image && (
            <img
              src={post.image}
              alt="Post visual"
              className="w-full rounded-md object-cover"
            />
          )}
        </div>

        {/* Interaction Buttons */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 border-t dark:border-gray-700 pt-4">
          <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
            <FaThumbsUp />
            <span className="block sm:hidden">{post.likes || 0}</span>
            <span className="hidden sm:block">Like {post.likes}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
            <FaRegCommentDots />
            <span className="block sm:hidden">{post.comments || 0}</span>
            <span className="hidden sm:block">Comment</span>
          </button>
          <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
            <FaShareAlt />
            <span className="block sm:hidden">{post.shares || 0}</span>
            <span className="hidden sm:block">Share</span>
          </button>
          <span className="text-xs text-gray-400">
            {formatRelativeTime(new Date(post.createdAt))}
          </span>
        </div>

        {/* Comments */}
        <div className="mt-6">
          <h4 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-100">
            Comments
          </h4>

          {post.comments?.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No comments yet.
            </p>
          )}

          {post.comments?.map((comment) => (
            <div
              key={comment._id || comment.id}
              className="flex items-start mt-4"
            >
              <img
                src={comment.avatar}
                alt={comment.owner}
                className="w-8 h-8 rounded-full mr-3"
              />
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md w-full">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {comment.owner}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {comment.text}
                </p>
                <p className="text-xs text-gray-400 mt-1">{comment.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
