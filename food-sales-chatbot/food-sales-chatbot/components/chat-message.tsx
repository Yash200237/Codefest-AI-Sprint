import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, ShoppingCart, MessageSquare } from 'lucide-react'
import type { ChatMessage } from "../types/chat"

export function ChatMessageCard({ message }: { message: ChatMessage }) {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <Card className={`max-w-[80%] ${message.role === 'assistant' ? 'bg-white' : 'bg-primary text-primary-foreground'}`}>
        <CardContent className="p-4">
          {message.type === 'text' && (
            <div className="text-sm">{message.content}</div>
          )}
          
          {message.type === 'recommendation' && message.data?.recommendations && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                <span className="font-semibold">Product Recommendations</span>
              </div>
              {message.data.recommendations.map((rec, i) => (
                <div key={i} className="bg-muted p-3 rounded-lg">
                  <div className="font-medium">{rec.product}</div>
                  <div className="text-sm text-muted-foreground mt-1">{rec.reasoning}</div>
                  <Badge variant="secondary" className="mt-2">
                    {(rec.confidence * 100).toFixed(1)}% confidence
                  </Badge>
                </div>
              ))}
            </div>
          )}
          
          {message.type === 'forecast' && message.data?.forecast && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span className="font-semibold">Sales Forecast</span>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <div className="text-lg font-bold">
                  ${message.data.forecast.prediction.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Predicted sales for {message.data.forecast.timeframe}
                </div>
                <Badge variant="secondary" className="mt-2">
                  {(message.data.forecast.confidence * 100).toFixed(1)}% confidence
                </Badge>
              </div>
            </div>
          )}
          
          {message.type === 'feedback' && message.data?.feedback && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="font-semibold">Feedback Analysis</span>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <Badge 
                  variant={
                    message.data.feedback.sentiment === 'positive' ? 'success' :
                    message.data.feedback.sentiment === 'negative' ? 'destructive' :
                    'secondary'
                  }
                >
                  {message.data.feedback.sentiment.toUpperCase()}
                </Badge>
                <div className="mt-2 text-sm">
                  Score: {(message.data.feedback.score * 100).toFixed(1)}%
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {message.data.feedback.keywords.map((keyword, i) => (
                    <Badge key={i} variant="outline">{keyword}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

