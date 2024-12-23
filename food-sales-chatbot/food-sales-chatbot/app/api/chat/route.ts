import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages, context } = await req.json();
  
  // System message to define the bot's role
  const systemMessage = {
    role: 'system',
    content: `You are a knowledgeable food industry sales consultant assistant. 
    You help with sales forecasting, product recommendations, and market analysis.
    Always be professional, precise, and data-driven in your responses.`
  };

  const result = streamText({
    model: openai('gpt-4-turbo'),
    messages: [systemMessage, ...messages],
    context,
  });

  return result.toDataStreamResponse();
}

