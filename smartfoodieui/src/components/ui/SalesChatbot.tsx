"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Send, User, Bot } from 'lucide-react';

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const SalesChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: "👋 Welcome to SmartFoodie! How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        type: 'bot',
        content: "I'd be happy to help you explore our menu and find the perfect dish for you. Would you like to hear about our daily specials or see our most popular items?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div className={`rounded-full p-2 ${
                  message.type === 'user' ? 'bg-orange-100' : 'bg-white'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-5 h-5 text-orange-600" />
                  ) : (
                    <Bot className="w-5 h-5 text-orange-600" />
                  )}
                </div>
                <div
                  className={`p-4 rounded-2xl shadow-sm ${
                    message.type === 'user'
                      ? 'bg-orange-600 text-white'
                      : 'bg-white border-2 border-orange-100 text-gray-900'
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

      {/* Input area */}
      <div className="bg-white border-t px-4 py-4 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about product recommendations, sales forecast or additional help"
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