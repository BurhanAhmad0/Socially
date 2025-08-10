import React from "react";
import { useNavigate } from "react-router-dom";

const PostGallerySection = ({ posts }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {posts.map((post) => (
        <div
          onClick={(e) => {
            e.stopPropagation();
            navigate("/post/1");
          }}
          key={post.id}
          className="bg-white dark:bg-[#1f1f1f] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
        >
          <img
            src={post.image}
            alt={`Post ${post.id}`}
            className="w-full h-48 object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default PostGallerySection;
