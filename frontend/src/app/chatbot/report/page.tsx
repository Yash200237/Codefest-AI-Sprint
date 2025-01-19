"use client";
import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent, useEffect, useRef } from "react";
import { Send, User, Bot } from "lucide-react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

interface Message {
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

export default function ChatbotPage({
  params,
}: {
  params: { feature?: string };
}) {
  const { feature } = params || {}; // Safely access params
  const router = useRouter();
  const isAuthenticated = useAuth();

  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content:
        "Welcome to the Sales Report Assistant! Share your sales data, and I’ll provide you with a clear and concise report with the key insights.",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Ref for scrolling to the latest message
  const bottomRef = useRef<HTMLDivElement | null>(null);
  // Scroll to the latest message when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Make a POST request to the backend
      const response = await axios.post(
        "http://127.0.0.1:8000/api/summarize/",
        { text: input.trim() }
      );
      const botResponse = response.data.summary;

      const botMessage: Message = {
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // Add a follow-up message after the analysis
      setTimeout(() => {
        const followUpMessage: Message = {
          type: "bot",
          content: "Do you have any other data you'd like me to summarize?",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, followUpMessage]);
      }, 1000);
    } catch (error) {
      const errorMessage: Message = {
        type: "bot",
        content:
          "An error occurred while analyzing your data. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-orange-50">
      <header className="bg-white border-b px-6 py-5 flex justify-between items-center">
        <button
          onClick={() => router.push("/")}
          className="text-orange-600 font-semibold hover:underline"
        >
          Back to Menu
        </button>
        <h1 className="text-xl font-bold text-orange-600">
          Sales Report Assistant
        </h1>
      </header>

      <div
        className="flex-grow overflow-auto px-4 py-6"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
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
                      : "bg-white border-2 border-orange-100 text-orange-600 bot-message"
                  }`}
                >
                  <p className="text-sm mb-1 whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <span className="text-xs opacity-75">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Center the input box at the bottom */}
      <div className="bg-white border-t px-4 py-4 shadow-lg flex justify-center items-center fixed bottom-0 left-0 right-0">
        <form
          onSubmit={handleSubmit}
          className="flex space-x-4 w-full max-w-3xl"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask about ${feature ?? "general"}`}
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
}
