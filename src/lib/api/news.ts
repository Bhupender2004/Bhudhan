import axios from 'axios';
import { NEWS_API_CONFIG } from './config';

// Get agricultural news
export async function getAgriculturalNews(page = 1, pageSize = 10) {
  try {
    const response = await axios.get(`${NEWS_API_CONFIG.baseUrl}/everything`, {
      params: {
        q: NEWS_API_CONFIG.query,
        apiKey: NEWS_API_CONFIG.apiKey,
        language: 'en',
        page,
        pageSize,
        sortBy: 'publishedAt',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching agricultural news:', error);
    throw error;
  }
}

// Get top headlines for India
export async function getTopHeadlines(page = 1, pageSize = 5) {
  try {
    const response = await axios.get(`${NEWS_API_CONFIG.baseUrl}/top-headlines`, {
      params: {
        country: NEWS_API_CONFIG.country,
        category: NEWS_API_CONFIG.category,
        apiKey: NEWS_API_CONFIG.apiKey,
        page,
        pageSize,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw error;
  }
}

// Search news by keyword
export async function searchNews(keyword: string, page = 1, pageSize = 10) {
  try {
    const response = await axios.get(`${NEWS_API_CONFIG.baseUrl}/everything`, {
      params: {
        q: `${keyword} AND (agriculture OR farming OR crops)`,
        apiKey: NEWS_API_CONFIG.apiKey,
        language: 'en',
        page,
        pageSize,
        sortBy: 'relevancy',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
}
