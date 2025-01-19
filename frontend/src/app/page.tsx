"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "./hooks/useAuth";

export default function HomePage() {
  const router = useRouter();
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  const handleNavigation = (feature: string) => {
    if (feature === "forecast") {
      router.push("/forecast");
    } else {
      router.push(`/chatbot/${feature}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token"); // Remove the authentication token
    router.push("/login"); // Redirect to the login page
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
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 p-3 px-5 text-lg bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-lg shadow-lg hover:scale-110 hover:shadow-md hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 transition-all duration-300"
      >
        Logout
      </button>

      <h1 className="text-6xl font-bold text-orange-600 mb-6 tracking-wide animate-pulse text-center flex flex-col items-center">
        <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
          SmartFoodie
        </span>
        <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
          Sales Assistant
        </span>
      </h1>
      <div className="grid grid-cols-2 gap-4 w-3/4">
        {[
          { label: "Product Recommendations", feature: "recommendation" },
          { label: "Sales Forecast", feature: "forecast" },
          { label: "Feedback Analysis", feature: "feedback" },
          { label: "Sales Report", feature: "report" },
        ].map((option) => (
          <button
            key={option.feature}
            onClick={() => handleNavigation(option.feature)}
            className="p-6 rounded-lg bg-orange-600 text-white text-lg font-semibold hover:bg-orange-700 hover:scale-105 transition-transform duration-200 ease-out"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
