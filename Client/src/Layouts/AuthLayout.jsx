import React from "react";
import { Outlet } from "react-router-dom";
import HeroImg from "../assets/HeroImage.webp";

const AuthLayout = () => {
  return (
    <div className="auth-layout flex flex-col md:flex-row min-h-screen">
      {/* Left side - Image */}
      <div className="left flex items-center justify-center md:w-1/2 h-64 md:h-auto">
        <div className="imgContainer sm:w-96 w-7h-72 sm:h-96 h-72">
          <img
            className="w-full h-full object-cover"
            loading="lazy"
            src={HeroImg}
            alt="Hero"
          />
        </div>
      </div>

      {/* Right side - Form */}
      <div className="right flex-1 px-6 py-10 md:px-14 md:py-24">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
