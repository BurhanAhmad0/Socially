import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import ProtectedAuthRoute from "./Components/ProtectedAuthRoute.jsx";
import { useApplyTheme } from "./Hooks/useApplyTheme.js";
import LoaderComponent from "./Components/LoaderComponent.jsx";
import { Toaster } from "react-hot-toast";

// Lazy-loaded Layouts
const AuthLayout = lazy(() => import("./Layouts/AuthLayout.jsx"));
const UserLayout = lazy(() => import("./Layouts/UserLayout.jsx"));

// Lazy-loaded Pages
const Login = lazy(() => import("./Pages/Login.jsx"));
const Signup = lazy(() => import("./Pages/Signup.jsx"));
const Home = lazy(() => import("./Pages/Home.jsx"));
const Explore = lazy(() => import("./Pages/Explore.jsx"));
const Notifications = lazy(() => import("./Pages/Notifications.jsx"));
const About = lazy(() => import("./Pages/About.jsx"));
const Profile = lazy(() => import("./Pages/Profile.jsx"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword.jsx"));
const Message = lazy(() => import("./Pages/Message.jsx"));
const CreatePost = lazy(() => import("./Pages/CreatePost.jsx"));
const NotFound = lazy(() => import("./Pages/NotFound.jsx"));
const Post = lazy(() => import("./Pages/Post.jsx"));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy.jsx"));
const InternalServerError = lazy(() =>
  import("./Pages/InternalServerError.jsx")
);
const Settings = lazy(() => import("./Pages/Settings.jsx"));

const App = () => {
  useApplyTheme(); // 🌙 Apply theme on every page load

  return (
    <Suspense fallback={<LoaderComponent />}>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Auth Routes */}
        <Route element={<ProtectedAuthRoute />}>
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Route>

        {/* Protected Routes */}
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

        {/* Public Info Routes */}
        <Route path="/about" element={<About />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/error-500" element={<InternalServerError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
