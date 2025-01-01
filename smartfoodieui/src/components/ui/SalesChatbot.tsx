"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Send, User, Bot } from "lucide-react";
import {useRouter} from "next/navigation";

interface Message {
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

type Feature = "recommendation" | "forecast" | "feedback" | "report";

const FeatureSelectionPage = ({
  onSelectFeature,
}: {
  onSelectFeature: (feature: Feature) => void;
}) => {
  const router = useRouter();
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
            onClick={() => {
              if (option.feature === "forecast") {
                router.push("/forecast");
              } else {
                onSelectFeature(option.feature as Feature);
              }
            }}
            className="p-6 rounded-lg bg-orange-600 text-white text-lg font-semibold hover:bg-orange-700 hover:scale-105 transition-transform duration-200 ease-out"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const ChatbotPage = ({
  feature,
  onBack,
}: {
  feature: Feature;
  onBack: () => void;
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content: `Welcome to the ${feature} assistant! How can I assist you?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot response based on feature
    setTimeout(() => {
      let botResponseContent = "";
      switch (feature) {
        case "recommendation":
          botResponseContent =
            "Here are some recommended products based on your preferences.";
          break;
        case "forecast":
          botResponseContent =
            "Based on the data, sales are projected to increase by 15% next month.";
          break;
        case "feedback":
          botResponseContent =
            "The most frequent customer feedback mentions improving delivery time.";
          break;
        case "report":
          botResponseContent =
            "The sales report has been generated. Let me share the key highlights with you.";
          break;
        default:
          botResponseContent = "I’m here to help! Let’s get started.";
      }

      const botMessage: Message = {
        type: "bot",
        content: botResponseContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-screen bg-orange-50">
      <header className="bg-white border-b px-6 py-5 flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-orange-600 font-semibold hover:underline"
        >
          Back to Menu
        </button>
        <h1 className="text-xl font-bold text-orange-600">
          {feature.charAt(0).toUpperCase() + feature.slice(1)} Assistant
        </h1>
      </header>

      <div className="flex-grow overflow-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.type === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`rounded-full p-2 ${
                    message.type === "user" ? "bg-orange-100" : "bg-white"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="w-5 h-5 text-orange-600" />
                  ) : (
                    <Bot className="w-5 h-5 text-orange-600" />
                  )}
                </div>
                <div
                  className={`p-4 rounded-2xl shadow-sm ${
                    message.type === "user"
                      ? "bg-orange-600 text-white"
                      : "bg-white border-2 border-orange-100 text-orange-600"
                  }`}
                >
                  <p className="text-sm mb-1">{message.content}</p>
                  <span className="text-xs opacity-75">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-t px-4 py-4 shadow-lg">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about your selection or type your query"
            className="flex-grow p-4 border-2 border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
          />
          <button
            type="submit"
            className="h-14 w-14 flex items-center justify-center rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

const SalesChatbot = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  return selectedFeature ? (
    <ChatbotPage
      feature={selectedFeature}
      onBack={() => setSelectedFeature(null)}
    />
  ) : (
    <FeatureSelectionPage onSelectFeature={setSelectedFeature} />
  );
};

export default SalesChatbot;
