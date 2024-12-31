"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function ForecastPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    month: "",
  });

  const [prediction, setPrediction] = useState<{
    predictedRevenue: number;
    soldRatio: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const categories = ["Fruits", "Vegetables", "Grains", "Dairy"];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.productName || !formData.category || !formData.month) return;

    setLoading(true);
    try {
      // Replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPrediction({
        predictedRevenue: Math.random() * 10000 + 5000,
        soldRatio: Math.random() * 0.5 + 0.3,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <header className="bg-orange-500 px-6 py-5 flex justify-between items-center shadow-md">
        <button
          onClick={() => router.push("/")}
          className="text-white font-semibold hover:underline flex items-center gap-2"
        >
          Back to Menu
        </button>
        <h1 className="text-xl font-bold text-white">Sales Forecast</h1>
      </header>

      <div className="flex-grow overflow-auto p-6 flex items-center justify-center">
        <div className="w-full max-w-2xl space-y-8">
          <div className="bg-orange-100 shadow-lg p-6 rounded-lg">
            <h2 className="text-lg font-bold text-orange-600 mb-4">
              Product Revenue Prediction
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <input
                  id="productName"
                  type="text"
                  value={formData.productName}
                  onChange={(e) =>
                    setFormData({ ...formData, productName: e.target.value })
                  }
                  placeholder="Enter product name"
                  required
                  className="mt-1 block w-full rounded-md bg-white border border-gray-300 text-gray-700 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                  className="mt-1 block w-full rounded-md bg-white border border-gray-300 text-gray-700 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="month"
                  className="block text-sm font-medium text-gray-700"
                >
                  Month
                </label>
                <select
                  id="month"
                  value={formData.month}
                  onChange={(e) =>
                    setFormData({ ...formData, month: e.target.value })
                  }
                  required
                  className="mt-1 block w-full rounded-md bg-white border border-gray-300 text-gray-700 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select a month
                  </option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
              >
                {loading ? "Predicting..." : "Get Prediction"}
              </button>
            </form>
          </div>

          {prediction && (
            <div className="bg-orange-100 shadow-lg p-6 rounded-lg">
              <h2 className="text-lg font-bold text-orange-600 mb-4">
                Prediction Results
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Predicted Revenue
                  </label>
                  <p className="text-2xl font-bold text-orange-500">
                    ${prediction.predictedRevenue.toFixed(2)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Predicted Sold Ratio
                  </label>
                  <p className="text-2xl font-bold text-orange-500">
                    {(prediction.soldRatio * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
