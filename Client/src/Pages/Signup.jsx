import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useAuth } from "../Context/AuthContext.jsx";

const userSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  gender: yup
    .string()
    .oneOf(["male", "female", "other", "prefer_not_to_say"], "Invalid gender")
    .nullable()
    .required("Gender is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const { user, setUser, loading } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201 || response.status === 200) {
        console.log("Registration successful:", response.data);
        setUser(response.data.user);
        // TODO: Redirect user or show success toast
        navigate("/");
      } else {
        console.warn("Unexpected response:", response);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Registration failed. Please try again.";
        console.error("Registration error:", message);
        // TODO: Show toast or inline error message
        // e.g. toast.error(message)
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <section className="login-section flex flex-col items-center justify-center h-full gap-4">
      <h1 className="font-bold text-xl">Sign up with your email</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-3 w-full"
      >
        <input
          className="w-4/5 h-14 px-4 rounded-lg outline-none focus:ring-1 ring-offset-2 ring-black bg-[#828282]/20 placeholder:text-lg placeholder:text-[#6C6C6C] transition-all"
          placeholder="Full Name"
          type="text"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

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

        <div className="w-4/5">
          <label
            htmlFor="gender"
            className="block text-[#4B5563] font-medium mb-1"
          >
            Gender
          </label>
          <select
            id="gender"
            {...register("gender", { required: "Gender is required" })}
            className="w-full h-14 px-4 rounded-lg bg-[#828282]/20 text-[#6C6C6C] text-lg outline-none focus:ring-1 ring-offset-2 ring-black transition-all"
          >
            <option value="">Select gender</option>
            <option value="male" className="text-black">
              Male
            </option>
            <option value="female" className="text-black">
              Female
            </option>
            <option value="other" className="text-black">
              Other
            </option>
            <option value="prefer_not_to_say" className="text-black">
              Prefer not to say
            </option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-4/5 h-14 px-4 text-xl text-white rounded-lg bg-[#1A202C] hover:bg-[#1A202C]/90 cursor-pointer transition-all duration-300"
        >
          Sign up
        </button>
      </form>

      <div className="w-2/3 flex items-center text-[#828282]">
        <div className="flex-grow border-t border-[#828282]"></div>
        <span className="mx-4 text-sm">or</span>
        <div className="flex-grow border-t border-[#828282]"></div>
      </div>

      <p className="text-[#828282] text-sm">
        Already have an account?{" "}
        <Link to={"/login"} className="text-[#1A202C] cursor-pointer">
          Log in
        </Link>
      </p>
    </section>
  );
};

export default Signup;
