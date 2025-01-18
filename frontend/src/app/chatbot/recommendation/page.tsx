/*"use client";
import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent } from "react";
import { Send, User, Bot } from "lucide-react";
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
      content: `Welcome to the product recommendation engine! Please provide your business name, category, and scale (e.g., Small, Medium, Large).`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
      // Parse the user input: Split input into businessName, category, and scale
      const [businessName, category, scale] = input
        .split(",")
        .map((item) => item.trim());

      // Validate that category and scale are present
      if (!category || !scale) {
        throw new Error(
          "Invalid input format. Please provide category and scale."
        );
      }

      // Send only category and scale to the backend API
      const response = await fetch("http://127.0.0.1:8000/api/recommend/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_type: category,
          scale,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();

      // Append the API response to the chat
      const botMessage: Message = {
        type: "bot",
        content: data.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      const errorMessage: Message = {
        type: "bot",
        content:
          "An error occurred while fetching recommendations. Please try again.",
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
          Product Recommendation
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
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  <p className="text-sm mb-1">{message.content}</p>
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

      {/* Updated section for the fixed input tab at the bottom center */
    /*MY BAD}
      <div className="fixed bottom-0 inset-x-0 flex items-center justify-center bg-white border-t shadow-lg px-4 py-4">
        <form
          onSubmit={handleSubmit}
          className="flex space-x-4 w-full max-w-3xl"
        >
          <input
            type="text"
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
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
}*/
"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { Send, User, Bot } from "lucide-react";
import useAuth from "../../hooks/useAuth";

interface Message {
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

export default function ChatbotPage() {
  const isAuthenticated = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content: `Welcome to the product recommendation engine! Please fill out the form below to get started.`,
      timestamp: new Date(),
    },
  ]);
  const [formVisible, setFormVisible] = useState(true);
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    scale: "",
    location: "",
    years_in_business: "",
    employees: "",
    estimated_daily_customers: "",
    avg_order_size: "",
    storage_capacity: "",
    sustainability_focus: false,
    quality_preference: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const finalValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormVisible(false);

    const userMessage: Message = {
      type: "user",
      content: `Form submitted:\n${JSON.stringify(formData, null, 2)}`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/recommend/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      const botMessage: Message = {
        type: "bot",
        content: data.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      const errorMessage: Message = {
        type: "bot",
        content: "An error occurred while fetching recommendations. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewRecommendation = () => {
    setFormData({
      category: "",
      subcategory: "",
      scale: "",
      location: "",
      years_in_business: "",
      employees: "",
      estimated_daily_customers: "",
      avg_order_size: "",
      storage_capacity: "",
      sustainability_focus: false,
      quality_preference: "",
    });
    setFormVisible(true);
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-orange-50">
      <header className="bg-white border-b px-6 py-5 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-600">Product Recommendation</h1>
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
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  <p className="text-sm mb-1">{message.content}</p>
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

      {formVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form
  onSubmit={handleFormSubmit}
  className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-[90%] max-w-lg"
>
  <h2 className="text-lg font-bold">Fill out the form</h2>
  
  {/* Category */}
  <select
    name="category"
    value={formData.category}
    onChange={handleInputChange}
    required
    className="w-full border p-2 rounded"
  >
    <option value="" disabled>
      Select Category
    </option>
    <option value="Institution">Institution</option>
    <option value="Catering">Catering</option>
    <option value="Bakery">Bakery</option>
    <option value="Hotel">Hotel</option>
    <option value="Restaurant">Restaurant</option>
  </select>

  {/* Subcategory */}
  <select
    name="subcategory"
    value={formData.subcategory}
    onChange={handleInputChange}
    required
    className="w-full border p-2 rounded"
  >
    <option value="" disabled>
      Select Subcategory
    </option>
    {[
      "Hospital",
      "Meal Delivery Service",
      "Pastry Shop",
      "Business Hotel",
      "Corporate Cafeteria",
      "University Dining",
      "Wholesale Bakery",
      "Food Truck",
      "Ethnic Restaurant",
      "Pizza Restaurant",
      "Cafe-Bakery",
      "Luxury Hotel",
      "Fine Dining",
      "Resort",
      "Corporate Catering",
      "Event Catering",
      "Seafood Restaurant",
      "Wedding Catering",
      "Extended Stay Hotel",
      "Casual Dining",
      "Nursing Home",
      "Boutique Hotel",
      "Artisan Bakery",
      "Steakhouse",
      "School Cafeteria",
      "Fast Casual",
      "Retail Bakery",
    ].map((subcategory) => (
      <option key={subcategory} value={subcategory}>
        {subcategory}
      </option>
    ))}
  </select>

  {/* Scale */}
  <select
    name="scale"
    value={formData.scale}
    onChange={handleInputChange}
    required
    className="w-full border p-2 rounded"
  >
    <option value="" disabled>
      Select Scale
    </option>
    <option value="Large">Large</option>
    <option value="Medium">Medium</option>
    <option value="Small">Small</option>
  </select>

  {/* Location */}
  <select
    name="location"
    value={formData.location}
    onChange={handleInputChange}
    required
    className="w-full border p-2 rounded"
  >
    <option value="" disabled>
      Select Location
    </option>
    <option value="Urban">Urban</option>
    <option value="Suburban">Suburban</option>
    <option value="Rural">Rural</option>
  </select>

  {/* Years in Business */}
  <input
    type="number"
    name="years_in_business"
    value={formData.years_in_business}
    onChange={handleInputChange}
    required
    placeholder="Years in Business"
    className="w-full border p-2 rounded"
  />

  {/* Employees */}
  <input
    type="number"
    name="employees"
    value={formData.employees}
    onChange={handleInputChange}
    required
    placeholder="Number of Employees"
    className="w-full border p-2 rounded"
  />

  {/* Estimated Daily Customers */}
  <input
    type="number"
    name="estimated_daily_customers"
    value={formData.estimated_daily_customers}
    onChange={handleInputChange}
    required
    placeholder="Estimated Daily Customers"
    className="w-full border p-2 rounded"
  />

  {/* Average Order Size */}
  <input
    type="number"
    step="0.01"
    name="avg_order_size"
    value={formData.avg_order_size}
    onChange={handleInputChange}
    required
    placeholder="Average Order Size"
    className="w-full border p-2 rounded"
  />

  {/* Storage Capacity */}
  <select
    name="storage_capacity"
    value={formData.storage_capacity}
    onChange={handleInputChange}
    required
    className="w-full border p-2 rounded"
  >
    <option value="" disabled>
      Select Storage Capacity
    </option>
    <option value="Large">Large</option>
    <option value="Medium">Medium</option>
    <option value="Limited">Limited</option>
  </select>

  {/* Sustainability Focus */}
  <div className="flex items-center space-x-2">
    <label htmlFor="sustainability_focus" className="text-sm">
      Sustainability Focus:
    </label>
    <input
      type="checkbox"
      id="sustainability_focus"
      name="sustainability_focus"
      checked={formData.sustainability_focus}
      onChange={handleInputChange}
      className="w-5 h-5"
    />
  </div>

  {/* Quality Preference */}
  <select
    name="quality_preference"
    value={formData.quality_preference}
    onChange={handleInputChange}
    required
    className="w-full border p-2 rounded"
  >
    <option value="" disabled>
      Select Quality Preference
    </option>
    <option value="Economy">Economy</option>
    <option value="Standard">Standard</option>
    <option value="Premium">Premium</option>
  </select>

  <button
    type="submit"
    className="w-full bg-orange-600 text-white py-2 rounded-lg"
  >
    Submit
  </button>
</form>

        </div>
      )}

      {!formVisible && (
        <div className="fixed bottom-0 inset-x-0 flex justify-center bg-white py-4 border-t">
          <button
            onClick={handleNewRecommendation}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            Request Another Recommendation
          </button>
        </div>
      )}
    </div>
  );
}

