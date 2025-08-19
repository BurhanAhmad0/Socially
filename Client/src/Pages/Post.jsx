import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaThumbsUp,
  FaRegThumbsDown,
  FaRegCommentDots,
  FaShareAlt,
} from "react-icons/fa";
import { RiLoader3Line } from "react-icons/ri";
import axios from "axios";
import toast from "react-hot-toast";

const Post = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [postReqLoading, setPostReqLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [LikeReqLoading, setLikeReqLoading] = useState(false);
  const [UnlikeReqLoading, setUnlikeReqLoading] = useState(false);
  const [addingComment, setAddingComment] = useState(false);
  const [comment, setComment] = useState("");
  const [commentReqLoading, setCommentReqLoading] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [postCommentReqLoading, setPostCommentReqLoading] = useState(false);

  const likePost = async (postId) => {
    setLikeReqLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/posts/like/${postId}`,
        {},
        { withCredentials: true }
      );

      console.log("Like response:", response.data);
      return response.data; // return to caller if needed
    } catch (error) {
      if (error.response) {
        // Backend responded with error (4xx, 5xx)
        console.error("Server error:", error.response.data);
        console.error("Status:", error.response.status);

        // Example: show message to user
        alert(
          error.response.data.message ||
            "Something went wrong while liking the post."
        );
      } else if (error.request) {
        // No response from server
        console.error("No response received:", error.request);
        alert(
          "No response from server. Please check your internet connection."
        );
      } else {
        // Something else (setup/config issue)
        console.error("Error setting up request:", error.message);
        alert("Unexpected error occurred.");
      }
    } finally {
      setLikeReqLoading(false);
    }
  };

  const unLikePost = async (postId) => {
    setUnlikeReqLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/posts/unlike/${postId}`,
        {},
        { withCredentials: true }
      );

      console.log("Unlike response:", response.data);
      return response.data; // let caller use it (e.g., update state)
    } catch (error) {
      if (error.response) {
        // Server responded with a status outside 2xx
        console.error("Server error:", error.response.data);
        console.error("Status:", error.response.status);

        alert(error.response.data.message || "Failed to unlike post.");
      } else if (error.request) {
        // Request made, no response received
        console.error("No response from server:", error.request);
        alert("No response from server. Please check your internet.");
      } else {
        // Something went wrong setting up request
        console.error("Error setting up request:", error.message);
        alert("Unexpected error occurred while unliking post.");
      }

      return null; // explicitly return null if failed
    } finally {
      setUnlikeReqLoading(false);
    }
  };

  const addComment = async (postId) => {
    setCommentReqLoading(true);

    if (comment.trim() === "") {
      toast.error("Write something");
      setCommentReqLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/comment/${postId}`,
        { comment },
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setComment("");
      setCommentReqLoading(false);
    }
  };

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

  const handleShare = async (postId) => {
    try {
      const postUrl = `${window.location.origin}/post/${postId}`;

      if (navigator.share) {
        // Mobile / browsers that support Web Share API
        await navigator.share({
          title: "Check out this post",
          url: postUrl,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(postUrl);
        alert("Post link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  useEffect(() => {
    const getPostComments = async () => {
      setPostComments([]);
      setPostCommentReqLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/comment/${postId}`,
          { withCredentials: true }
        );
        console.log(response);
        setPostComments(response.data.comments);
      } catch (error) {
        console.log(error);
      } finally {
        setPostCommentReqLoading(false);
      }
    };

    getPostComments();
  }, [postId]);

  useEffect(() => {
    const getSinglePost = async () => {
      setCommentReqLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/${postId}`,
          { withCredentials: true }
        );
        setPost(response.data.post);
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        setCommentReqLoading(false);
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
          {post.liked ? (
            UnlikeReqLoading ? (
              <RiLoader3Line />
            ) : (
              <button
                disabled={UnlikeReqLoading}
                onClick={() => unLikePost(post._id)}
                className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
              >
                <span className="block sm:hidden">
                  {post.likes?.length || 0}
                </span>
                <FaRegThumbsDown />
                <span className="hidden sm:block">Unlike</span>
              </button>
            )
          ) : LikeReqLoading ? (
            <RiLoader3Line />
          ) : (
            <button
              disabled={LikeReqLoading}
              onClick={() => likePost(post._id)}
              className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
            >
              {post.likes.length}
              <span className="block sm:hidden">{post.likes?.length || 0}</span>
              <FaThumbsUp />
              <span className="hidden sm:block">Like</span>
            </button>
          )}
          <button
            onClick={() => setAddingComment(true)}
            className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
          >
            <span className="block sm:hidden">{postComments?.length || 0}</span>
            <FaRegCommentDots />
            <span className="hidden sm:block">Comment</span>
          </button>
          <button
            onClick={() => {
              handleShare(post._id);
            }}
            className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
          >
            <FaShareAlt />
            <span className="hidden sm:block">Share</span>
          </button>
          <span className="text-xs text-gray-400">
            {formatRelativeTime(new Date(post.createdAt))}
          </span>
        </div>

        {addingComment && (
          <div className="commentInput flex flex-col sm:flex-row gap-2 mt-5 w-full">
            <input
              onChange={(e) => setComment(e.target.value)}
              autoComplete="off"
              className="w-full flex-1 h-12 py-4 sm:h-14 px-4 rounded-md outline-none focus:ring-2 ring-offset-2 ring-black dark:ring-white bg-[#828282]/20 dark:bg-[#3a3a3a] text-gray-900 dark:text-gray-100 placeholder:text-sm placeholder:text-[#6C6C6C] dark:placeholder:text-gray-400 transition-all duration-300"
              placeholder="Write comment here..."
              type="text"
              name="comment"
              id="comment"
            />
            <button
              disabled={commentReqLoading}
              onClick={() => addComment(post._id)}
              className="h-12 sm:h-14 w-full sm:w-auto px-6 rounded-md bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-90 transition-all duration-300 flex items-center justify-center"
            >
              {commentReqLoading ? (
                <RiLoader3Line className="animate-spin" />
              ) : (
                "Send"
              )}
            </button>
          </div>
        )}

        {/* Comments */}
        <div className="mt-6">
          <h4 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-100">
            Comments
          </h4>

          {postComments?.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No comments yet.
            </p>
          )}

          {postCommentReqLoading ? (
            // Skeleton Loader
            <div className="space-y-4 mt-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 mr-3"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Actual Comments
            postComments?.map((comment) => (
              <div
                key={comment._id || comment.id}
                className="flex items-start mt-4"
              >
                <img
                  src={comment.owner?.avatar}
                  alt={comment.owner?.username}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md w-full">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {comment.owner?.username}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {comment?.comment}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(comment.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
