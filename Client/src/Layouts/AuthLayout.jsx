import React from "react";
import { Outlet } from "react-router-dom";
import HeroImg from "../assets/HeroImage.webp";

const AuthLayout = () => {
  return (
    <div className="auth-layout flex">
      <div className="left w-1/2 h-full p-24">
        <img
          className="w-full h-full"
          loading="lazy"
          src={HeroImg}
          alt="Hero Image"
        />
      </div>
      <div className="right w-1/2 px-14 py-24">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
