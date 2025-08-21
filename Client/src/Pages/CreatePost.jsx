import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { LuLoaderCircle } from "react-icons/lu";

const CreatePost = () => {
  const [createPostReqLoading, setCreatePostReqLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    setCreatePostReqLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", caption);
    formData.append("image", image);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Post uploaded successfully");
        // console.log("Success:", response.data);
      } else {
        toast.warn("Unexpected response from server.");
        console.warn("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Upload error:", error);

      if (error.response) {
        const message =
          error.response.data?.message || "Post uploaded successfully.";
        toast.error(message);
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setCreatePostReqLoading(false);
      setImage(null);
      setCaption("");
      setPreviewUrl("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#1f1f1f] py-8 px-4 flex items-center justify-center transition-colors duration-300">
      <div className="bg-white dark:bg-[#2a2a2a] shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Create New Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Caption */}
          <div>
            <label
              htmlFor="caption"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Caption
            </label>
            <textarea
              id="caption"
              rows="4"
              required
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1f1f1f] text-gray-800 dark:text-gray-100 rounded-md resize-none focus:outline-none focus:ring focus:ring-offset-2 focus:ring-[#1A202C] transition-all duration-300"
              placeholder="Write something..."
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="imageUpload"
              className="block cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full cursor-pointer text-sm text-gray-700 dark:text-gray-200 file:mr-3 file:px-4 file:py-2 file:border file:rounded-md file:bg-gray-100 dark:file:bg-[#3a3a3a] file:text-gray-700 dark:file:text-gray-200 file:border-gray-300 dark:file:border-gray-500 hover:file:bg-gray-200 dark:hover:file:bg-[#4a4a4a]"
            />
            {previewUrl && (
              <div className="mt-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-md shadow"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={createPostReqLoading}
            className="flex items-center justify-center dark:bg-white dark:text-black dark:hover:bg-white/80 w-full cursor-pointer bg-[#1A202C] text-white py-2 rounded-md hover:bg-[#1A202C]/75 transition"
          >
            {createPostReqLoading ? (
              <LuLoaderCircle size={25} color="black" />
            ) : (
              "Post"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
