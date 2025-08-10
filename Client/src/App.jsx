import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./Layouts/AuthLayout.jsx";
import UserLayout from "./Layouts/UserLayout.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Home from "./Pages/Home.jsx";
import Explore from "./Pages/Explore.jsx";
import Notifications from "./Pages/Notifications.jsx";
import About from "./Pages/About.jsx";
import Profile from "./Pages/Profile.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import Message from "./Pages/Message.jsx";
import CreatePost from "./Pages/CreatePost.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Post from "./Pages/Post.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import InternalServerError from "./Pages/InternalServerError.jsx";
import Settings from "./Pages/Settings.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import { useApplyTheme } from "./Hooks/useApplyTheme.js";

const App = () => {
  useApplyTheme(); // 🌙 Apply theme on every page load

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path=":username" element={<Profile />} />
            <Route path="messages" element={<Message />} />
            <Route path="upload" element={<CreatePost />} />
            <Route path="post/:postId" element={<Post />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/error-500" element={<InternalServerError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
