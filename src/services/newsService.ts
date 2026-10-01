import { NewsArticle, Story } from '../types';
import { newsArticlesData } from '../data/news';
import { storiesData } from '../data/stories';
import { simulateNetworkDelay } from './apiClient';

export const newsService = {
  async getAllNews(): Promise<NewsArticle[]> {
    return simulateNetworkDelay(newsArticlesData, 200);
  },

  async getNewsBySlug(slug: string): Promise<NewsArticle | null> {
    const article = newsArticlesData.find((a) => a.slug === slug) || null;
    return simulateNetworkDelay(article, 200);
  },

  async getAllStories(): Promise<Story[]> {
    return simulateNetworkDelay(storiesData, 200);
  },

  async getStoryBySlug(slug: string): Promise<Story | null> {
    const story = storiesData.find((s) => s.slug === slug) || null;
    return simulateNetworkDelay(story, 200);
  },
};
