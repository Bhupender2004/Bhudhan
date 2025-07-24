import axios from 'axios';
import { OPENAI_API_CONFIG } from './config';

// Chat completion with OpenAI
type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export async function chatCompletion(messages: ChatMessage[]) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: OPENAI_API_CONFIG.model,
        messages,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_CONFIG.apiKey}`,
        },
      }
    );
    
    return response.data.choices[0].message.content;
  } catch (error) {
    // Error with OpenAI chat completion
    throw error;
  }
}

// Get farming advice
export async function getFarmingAdvice(query: string, language: string = 'en') {
  try {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: 'You are an agricultural expert assistant. Provide helpful, accurate, and practical advice to farmers. Keep responses concise and focused on actionable information.',
      },
      {
        role: 'user',
        content: `Please provide farming advice about: ${query}. Respond in ${language} language.`,
      },
    ];
    
    return await chatCompletion(messages);
  } catch (error) {
    console.error('Error getting farming advice:', error);
    throw error;
  }
}

// Analyze crop disease from description
export async function analyzeCropDisease(cropType: string, symptoms: string) {
  try {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: 'You are an agricultural disease expert. Analyze crop symptoms and provide possible disease identification, treatment options, and prevention measures.',
      },
      {
        role: 'user',
        content: `My ${cropType} plants are showing these symptoms: ${symptoms}. What disease could it be, and how should I treat it?`,
      },
    ];
    
    return await chatCompletion(messages);
  } catch (error) {
    console.error('Error analyzing crop disease:', error);
    throw error;
  }
}

// Get crop recommendations based on soil and climate
export async function getCropRecommendations(soilType: string, climate: string, region: string) {
  try {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: 'You are an agricultural expert specializing in crop selection. Provide recommendations for suitable crops based on soil type, climate conditions, and region.',
      },
      {
        role: 'user',
        content: `What crops would be suitable for ${soilType} soil in a ${climate} climate in ${region}?`,
      },
    ];
    
    return await chatCompletion(messages);
  } catch (error) {
    console.error('Error getting crop recommendations:', error);
    throw error;
  }
}
