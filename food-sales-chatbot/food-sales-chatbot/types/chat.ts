export type MessageType = 'text' | 'recommendation' | 'forecast' | 'feedback';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type: MessageType;
  data?: {
    recommendations?: Array<{
      product: string;
      confidence: number;
      reasoning: string;
    }>;
    forecast?: {
      prediction: number;
      timeframe: string;
      confidence: number;
    };
    feedback?: {
      sentiment: 'positive' | 'negative' | 'neutral';
      score: number;
      keywords: string[];
    };
  };
}

