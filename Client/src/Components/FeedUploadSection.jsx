import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { LuLoaderCircle } from "react-icons/lu";

const FeedUploadSection = () => {
  const [caption, setCaption] = useState("");
  const [postReqLoading, setPostReqLoading] = useState(false);

  const handleSubmit = async (e) => {
    setPostReqLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", caption);

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
        console.log("Success:", response.data);
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
      setPostReqLoading(false);
      setCaption("");
    }
  };

  return (
    <div className="bg-white dark:bg-[#2a2a2a] rounded-lg shadow-sm p-4 mb-4 transition-colors duration-300">
      <p className="text-gray-600 dark:text-gray-300">What’s on your mind?</p>
      <textarea
        className="w-full outline-none focus:ring focus:ring-[#1A202C] dark:focus:ring-white focus:ring-offset-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#3a3a3a] text-gray-900 dark:text-gray-100 rounded-md mt-2 p-2 resize-none transition-all duration-300"
        rows="3"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Start a post..."
      ></textarea>
      <div className="flex justify-end mt-2">
        <button
          onClick={(e) => handleSubmit(e)}
          disabled={postReqLoading}
          className="bg-[#1A202C] text-white dark:bg-white dark:text-black px-6 py-2 rounded hover:opacity-90 cursor-pointer transition duration-200"
        >
          {postReqLoading ? <LuLoaderCircle /> : "Post"}
        </button>
      </div>
    </div>
  );
};

export default FeedUploadSection;
