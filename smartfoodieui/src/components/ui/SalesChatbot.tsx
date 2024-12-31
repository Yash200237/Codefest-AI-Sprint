"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Send, User, Bot } from "lucide-react";

interface Message {
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

type Feature = "recommendation" | "forecast" | "feedback" | "report";

const SalesChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content: "👋 Welcome to SmartFoodie! How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const handleFeatureSelect = (feature: Feature) => {
    setSelectedFeature(feature);
    let featureWelcomeMessage = "";

    switch (feature) {
      case "recommendation":
        featureWelcomeMessage =
          "Let me help you find the best product recommendations for you.";
        break;
      case "forecast":
        featureWelcomeMessage =
          "Let’s dive into sales forecasting and predict the trends for you.";
        break;
      case "feedback":
        featureWelcomeMessage =
          "I’ll assist you in analyzing customer feedback to improve your offerings.";
        break;
      case "report":
        featureWelcomeMessage =
          "Let’s generate a detailed sales report for your business.";
        break;
      default:
        featureWelcomeMessage = "How can I assist you today?";
    }

    const botMessage: Message = {
      type: "bot",
      content: featureWelcomeMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
  };

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

    // Simulate bot response based on selected feature
    setTimeout(() => {
      let botResponseContent = "";
      switch (selectedFeature) {
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

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen bg-orange-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-5">
        <div className="max-w-3xl mx-auto flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-orange-600 tracking-wide">
              SmartFoodie Sales Assistant
            </h1>
            <div className="h-1 w-24 bg-orange-600 mx-auto mt-2 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main chat area */}
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
                      : "bg-white border-2 border-orange-100 text-gray-900"
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

      {/* Input area with feature selection */}
      <div className="bg-white border-t px-4 py-4 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between mb-4">
            {[
              { label: "Product Recommendations", feature: "recommendation" },
              { label: "Sales Forecast", feature: "forecast" },
              { label: "Feedback Analysis", feature: "feedback" },
              { label: "Sales Report", feature: "report" },
            ].map((option) => (
              <button
                key={option.feature}
                onClick={() => handleFeatureSelect(option.feature as Feature)}
                className={`flex-1 p-3 mx-1 rounded-lg text-center font-semibold text-white transition-colors ${
                  selectedFeature === option.feature
                    ? "bg-orange-700"
                    : "bg-orange-600 hover:bg-orange-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about your selection or type your query"
              className="flex-grow p-4 border-2 border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
    </div>
  );
};

export default SalesChatbot;
