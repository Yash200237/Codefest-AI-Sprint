"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  // Client-side authentication check
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1]; // Extract JWT token from cookies

    if (!token) {
      // If token is missing, redirect to login page
      router.push("/login");
    }
  }, [router]);

  const handleNavigation = (feature: string) => {
    if (feature === "forecast") {
      router.push("/forecast");
    } else {
      router.push(`/chatbot/${feature}`);
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
