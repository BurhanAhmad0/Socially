import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import ConfirmationModal from "../Components/ConfirmationModal.jsx";
import UploadPlaceholderImg from "../assets/photo.png";

const userInfoUpdateSchema = yup.object().shape({
  name: yup.string(),
  username: yup.string(),
  email: yup.string().email("Invalid email address"),
  privateAccount: yup.boolean(),
  emailNotifications: yup.boolean(),
  appearance: yup.string(),
  currentPassword: yup.string(),
  newPassword: yup.string(),
});

const Settings = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("system");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgaeFile, setImgaeFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [deleteReqLoading, setDeleteReqLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userInfoUpdateSchema),
  });

  useEffect(() => {
    const appearance = localStorage.getItem("appearance");
    setTheme(appearance);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (selectedTheme) => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");

    if (selectedTheme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("appearance", "dark");
    } else if (selectedTheme === "light") {
      root.classList.add("light");
      localStorage.setItem("appearance", "light");
    }
    // For 'system', remove both and let OS decide (if you're using Tailwind's 'media' strategy)
  };

  const handleAccountDeletion = async () => {
    try {
      setIsModalOpen(false);
      setDeleteReqLoading(true);
      console.log("Deleting account...");

      const { data } = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/user/delete`,
        { withCredentials: true }
      );

      console.log("Account deleted successfully:", data);
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Account deletion failed:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error during account deletion:", error);
      }
    } finally {
      setDeleteReqLoading(false);
    }
  };

  const onSubmit = async (data) => {
    // console.log("Updated", data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("currentPassword", data.currentPassword);
    formData.append("newPassword", data.newPassword);

    if (imgaeFile) {
      formData.append("image", imgaeFile);
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/user/update`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully");
        console.log("Success:", response.data);
      } else {
        toast.warn("Unexpected response from server.");
        console.warn("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Update error:", error);

      if (error.response) {
        const message =
          error.response.data?.message || "Failed to update profile.";
        toast.error(message);
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const handleAppearance = (e) => {
    const selected = e.target.value;
    setTheme(selected);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]; // ✅ Correct property

    if (file) {
      console.log("Selected file:", file);
      setImgaeFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] dark:bg-[#1f1f1f] py-10 px-4 md:px-12 transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#2a2a2a] shadow-sm rounded-lg p-6 md:p-10 transition-colors duration-300">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Account Settings
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Profile Settings */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Profile Information
            </h2>
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-3">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Upload Profile Image
                </label>

                {/* Preview Image */}
                <div className="relative">
                  <img
                    id="profileImagePreview"
                    src={imagePreview || UploadPlaceholderImg}
                    alt="Profile Preview"
                    onChange={handleFileChange}
                    className="w-40 h-40 rounded-full object-cover border border-gray-300 dark:border-gray-600 shadow-sm"
                  />
                  <label
                    htmlFor="profile_image"
                    className="absolute bottom-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-gray-700 transition"
                  >
                    Change
                  </label>
                </div>

                {/* Hidden File Input */}
                <input
                  id="profile_image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Jane Doe"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#3a3a3a] text-gray-900 dark:text-gray-100 rounded-md outline-none focus:ring focus:ring-offset-2 focus:ring-[#1A202C] dark:focus:ring-white transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Username
                </label>
                <input
                  {...register("username")}
                  type="text"
                  placeholder="@janedoe"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#3a3a3a] text-gray-900 dark:text-gray-100 rounded-md outline-none focus:ring focus:ring-offset-2 focus:ring-[#1A202C] dark:focus:ring-white transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="jane@example.com"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#3a3a3a] text-gray-900 dark:text-gray-100 rounded-md outline-none focus:ring focus:ring-offset-2 focus:ring-[#1A202C] dark:focus:ring-white transition-all duration-300"
                />
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  Private Account
                </span>
                <input
                  type="checkbox"
                  {...register("privateAccount")}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  Email Notifications
                </span>
                <input
                  type="checkbox"
                  {...register("emailNotifications")}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
              </div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="appearance"
                  className="block text-gray-700 dark:text-gray-300 font-medium"
                >
                  Appearance
                </label>
                <select
                  id="appearance"
                  name="appearance"
                  value={theme}
                  onChange={handleAppearance}
                  className="cursor-pointer text-sm w-40 h-12 px-4 rounded-lg bg-gray-200 dark:bg-[#3a3a3a] text-gray-800 dark:text-gray-100 outline-none focus:ring-1 ring-offset-2 ring-black dark:ring-white transition-all"
                >
                  <option value="system">System Default</option>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
            </div>
          </section>

          {/* Change Password */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Change Password
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Current Password
                </label>
                <input
                  {...register("currentPassword")}
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#3a3a3a] text-gray-900 dark:text-gray-100 rounded-md outline-none focus:ring focus:ring-offset-2 focus:ring-[#1A202C] dark:focus:ring-white transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  New Password
                </label>
                <input
                  {...register("newPassword")}
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#3a3a3a] text-gray-900 dark:text-gray-100 rounded-md outline-none focus:ring focus:ring-offset-2 focus:ring-[#1A202C] dark:focus:ring-white transition-all duration-300"
                />
              </div>
            </div>
          </section>

          <div className="updateBtn my-5 flex justify-end items-center">
            <button
              type="submit"
              className="bg-[#1A202C] hover:bg-[#1A202C]/75 dark:bg-white dark:hover:bg-white/75 dark:text-black text-white px-5 py-3 rounded transition duration-200 cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Delete Account */}
        <section>
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-500 mb-2">
            Danger Zone
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Deleting your account is permanent and cannot be undone.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 dark:hover:bg-red-800 text-white px-6 py-2 rounded transition duration-200 cursor-pointer"
          >
            {deleteReqLoading ? (
              <div>Loading...</div>
            ) : (
              <div>Delete Account</div>
            )}
          </button>

          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={() => {
              handleAccountDeletion();
              setIsModalOpen(false);
            }}
            title="Delete Account"
            message="Are you sure you want to permanently delete your account? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
          />
        </section>
      </div>
    </div>
  );
};

export default Settings;
