"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        // Extract the error detail or default message
        const errorMessage = Array.isArray(error.detail)
          ? error.detail.map((err: any) => err.msg).join(", ") // Handle list of errors
          : error.detail || "Login failed";

        throw new Error(errorMessage);
      }

      const data = await response.json();
      localStorage.setItem("auth_token", data.access_token); // Store token in local storage
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to login.");
    }
  };

  return (
    <div className="font-[sans-serif] min-h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src="https://img.cdndsgni.com/preview/11779666.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 w-full max-w-md bg-white border border-gray-300 rounded-lg p-6 shadow-lg mx-auto mr-96">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="130"
            height="130"
            className="inline-block"
            viewBox="0 0 53 53"
          >
            <path
              fill="#e7eced"
              d="m18.613 41.552-7.907 4.313a7.106 7.106 0 0 0-1.269.903A26.377 26.377 0 0 0 26.5 53c6.454 0 12.367-2.31 16.964-6.144a7.015 7.015 0 0 0-1.394-.934l-8.467-4.233a3.229 3.229 0 0 1-1.785-2.888v-3.322c.238-.271.51-.619.801-1.03a19.482 19.482 0 0 0 2.632-5.304c1.086-.335 1.886-1.338 1.886-2.53v-3.546c0-.78-.347-1.477-.886-1.965v-5.126s1.053-7.977-9.75-7.977-9.75 7.977-9.75 7.977v5.126a2.644 2.644 0 0 0-.886 1.965v3.546c0 .934.491 1.756 1.226 2.231.886 3.857 3.206 6.633 3.206 6.633v3.24a3.232 3.232 0 0 1-1.684 2.833z"
              data-original="#e7eced"
            />
            <path
              fill="#FF8C00"
              d="M26.953.004C12.32-.246.254 11.414.004 26.047-.138 34.344 3.56 41.801 9.448 46.76a7.041 7.041 0 0 1 1.257-.894l7.907-4.313a3.23 3.23 0 0 0 1.683-2.835v-3.24s-2.321-2.776-3.206-6.633a2.66 2.66 0 0 1-1.226-2.231v-3.546c0-.78.347-1.477.886-1.965v-5.126S15.696 8 26.499 8s9.75 7.977 9.75 7.977v5.126c.54.488.886 1.185.886 1.965v3.546c0 1.192-.8 2.195-1.886 2.53a19.482 19.482 0 0 1-2.632 5.304c-.291.411-.563.759-.801 1.03V38.8c0 1.223.691 2.342 1.785 2.888l8.467 4.233a7.05 7.05 0 0 1 1.39.932c5.71-4.762 9.399-11.882 9.536-19.9C53.246 12.32 41.587.254 26.953.004z"
              data-original="#556080"
            />
          </svg>
        </div>

        <form
          onSubmit={handleLogin}
          className="lg:col-span-2 max-w-lg w-full p-6 mx-auto"
        >
          <div className="mb-12">
            <h3 className="text-gray-800 text-4xl font-extrabold">Login</h3>
          </div>
          {error && <p className="text-red-500">{error}</p>}

          <div className="relative flex items-center mb-6">
            <input
              name="username"
              type="text"
              placeholder="Enter Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full text-sm text-gray-800 bg-white border border-gray-300 focus:border-[#1E2772] px-4 py-3 rounded-md outline-none placeholder-gray-500"
              required
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#bbb"
              stroke="#bbb"
              className="w-[18px] h-[18px] absolute right-4"
              viewBox="0 0 24 24"
            >
              <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
              <path
                d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                data-original="#000000"
              ></path>
            </svg>
          </div>

          <div className="relative flex items-center mb-6">
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full text-sm text-gray-800 bg-white border border-gray-300 focus:border-[#1E2772] px-4 py-3 rounded-md outline-none placeholder-gray-500"
              required
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#bbb"
              stroke="#bbb"
              className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
              viewBox="0 0 128 128"
            >
              <path
                d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                data-original="#000000"
              ></path>
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 !mt-4">
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-base font-semibold rounded-md text-white bg-orange-500 hover:bg-orange-700 focus:outline-none"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
