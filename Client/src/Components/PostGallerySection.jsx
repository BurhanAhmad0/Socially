import React from "react";
import { useNavigate } from "react-router-dom";

const PostGallerySection = ({ posts }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {posts
        .filter((post) => post.image) // ✅ Only keep posts with images
        .map((post) => (
          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/post/${post._id}`);
            }}
            key={post._id}
            className="bg-white dark:bg-[#1f1f1f] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <img
              src={post.image}
              alt={`Post ${post._id}`}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
    </div>
  );
};

export default PostGallerySection;
