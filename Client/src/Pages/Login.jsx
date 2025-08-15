import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useAuth } from "../Context/AuthContext.jsx";
import { LuLoaderCircle } from "react-icons/lu";
import toast from "react-hot-toast";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser, loading } = useAuth();
  const [loginReqLoading, setLoginReqLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoginReqLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201 || response.status === 200) {
        console.log("Login successful:", response.data);
        toast.success("Login successful");
        setUser(response.data.user);
        // TODO: Redirect user or show success toast
        navigate("/");
      } else {
        toast.error("Some error occurred");
        console.warn("Unexpected response:", response);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Login failed. Please try again.";
        console.error("Login error:", message);
        // TODO: Show toast or inline error message
        toast.error(message);
      } else {
        toast.error("Some error occurred");
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoginReqLoading(false);
    }
  };

  return (
    <section className="login-section flex flex-col items-center justify-center h-full gap-4">
      <h1 className="font-bold text-xl">Log in with your email</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-3 w-full"
      >
        <input
          className="w-4/5 h-14 px-4 rounded-lg outline-none focus:ring-1 ring-offset-2 ring-black bg-[#828282]/20 placeholder:text-lg placeholder:text-[#6C6C6C] transition-all"
          placeholder="Email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          className="w-4/5 h-14 px-4 rounded-lg outline-none focus:ring-1 ring-offset-2 ring-black bg-[#828282]/20 placeholder:text-lg placeholder:text-[#6C6C6C] transition-all"
          placeholder="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          disabled={loginReqLoading}
          className="flex items-center justify-center w-4/5 h-14 px-4 text-xl text-white rounded-lg bg-[#1A202C] hover:bg-[#1A202C]/90 cursor-pointer transition-all duration-300"
        >
          {loginReqLoading ? <LuLoaderCircle /> : "Log in"}
        </button>
      </form>
      <Link to={"/forgot"} className="text-[#828282] text-sm">
        Forgot Password?
      </Link>

      <div className="w-2/3 flex items-center text-[#828282]">
        <div className="flex-grow border-t border-[#828282]"></div>
        <span className="mx-4 text-sm">or</span>
        <div className="flex-grow border-t border-[#828282]"></div>
      </div>

      <p className="text-[#828282] text-sm">
        Don’t have an account?{" "}
        <Link to={"/signup"} className="text-[#1A202C] cursor-pointer">
          Sign up
        </Link>
      </p>
    </section>
  );
};

export default Login;
