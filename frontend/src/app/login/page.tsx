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
    <div
      className="flex flex-col h-screen bg-orange-50 justify-center items-center"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover", // Ensures the image covers the entire screen
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents tiling of the image
      }}
    >
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-orange-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-4xl font-bold text-white-600 mb-6 tracking-wide animate-pulse text-center flex flex-col items-center">
            Login
          </h1>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-orange-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-orange-50 dark:border-gray-600 dark:placeholder-orange-400 dark:text-orange dark:focus:ring-orange-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-orange-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-orange-50 dark:border-gray-600 dark:placeholder-orange-400 dark:text-orange dark:focus:ring-orange-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
