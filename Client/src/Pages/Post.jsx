import React from "react";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp, FaRegCommentDots, FaShareAlt } from "react-icons/fa";

const Post = () => {
  // Mock data (replace with dynamic data later)
  const post = {
    id: 1,
    author: {
      name: "Jane Doe",
      avatar: "https://i.pravatar.cc/150?img=5",
      username: "@janedoe",
    },
    content: "Just finished designing the new interface. Thoughts?",
    image: "https://picsum.photos/seed/1/600/400",
    timestamp: "2 hours ago",
    likes: 134,
    comments: [
      {
        id: 1,
        author: "John Smith",
        avatar: "https://i.pravatar.cc/150?img=8",
        text: "Looks awesome!",
        time: "1 hour ago",
      },
    ],
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#121212] py-8 px-4 md:px-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-[#1e1e1e] shadow-md rounded-lg p-6">
        {/* Author Info */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            navigate("/burhan");
          }}
          className="flex items-center mb-4 cursor-pointer"
        >
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {post.author.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {post.author.username}
            </p>
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-800 dark:text-gray-100 mb-4">
            {post.content}
          </p>
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
            <span>Like ({post.likes})</span>
          </button>
          <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
            <FaRegCommentDots />
            <span>Comment</span>
          </button>
          <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
            <FaShareAlt />
            <span>Share</span>
          </button>
          <span className="text-xs text-gray-400">{post.timestamp}</span>
        </div>

        {/* Comments */}
        <div className="mt-6">
          <h4 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-100">
            Comments
          </h4>

          {post.comments.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No comments yet.
            </p>
          )}

          {post.comments.map((comment) => (
            <div key={comment.id} className="flex items-start mt-4">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="w-8 h-8 rounded-full mr-3"
              />
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md w-full">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {comment.author}
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
