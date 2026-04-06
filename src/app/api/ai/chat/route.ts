import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the OpenAI client
// It will automatically use the OPENAI_API_KEY environment variable
const openai = new OpenAI();

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or 'gpt-4o' or 'gpt-4'
      messages: [
        {
          role: 'system',
          content: `You are the BhuDhan AI farming assistant, an expert agricultural advisor for Indian farmers. 
Provide practical, locally relevant advice regarding:
- Weather forecasts and impacts
- Crop cultivation practices (e.g., wheat, rice, mustard, cotton)
- Pest and disease management
- Soil health and fertilizers
- Irrigation scheduling
- Market prices and trends
- Government agricultural schemes and subsidies

Always maintain a helpful, encouraging, and professional tone. Keep responses concise but sufficiently detailed for a farmer to take action. Use bullet points where appropriate. If asked about something outside agriculture, politely redirect to farming topics.`,
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const reply = completion.choices[0]?.message?.content;

    if (!reply) {
      throw new Error('No reply generated from OpenAI');
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Error in AI Chat API:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during chat processing.' },
      { status: 500 }
    );
  }
}
