'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatMessageCard } from '../components/chat-message'
import { Apple, Send, Loader2 } from 'lucide-react'

export default function FoodSalesChat() {
  const [attachment, setAttachment] = useState<string | null>(null)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-4xl mx-auto p-4">
        <Card className="border-none shadow-xl">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <Apple className="w-8 h-8" />
              <CardTitle className="text-2xl font-bold">
                Food Industry Sales Assistant
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[60vh] overflow-y-auto p-4 bg-gray-50">
              {messages.map((message) => (
                <ChatMessageCard key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="p-4 border-t bg-white rounded-b-lg">
              <form 
                onSubmit={handleSubmit}
                className="flex items-center gap-2"
              >
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about sales forecasts, product recommendations, or market analysis..."
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading}>
                  <Send className="w-4 h-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

