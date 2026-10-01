import { Programme } from '../types';
import { programmesData } from '../data/programmes';
import { simulateNetworkDelay } from './apiClient';

export const programmeService = {
  async getAllProgrammes(): Promise<Programme[]> {
    return simulateNetworkDelay(programmesData, 200);
  },

  async getProgrammeBySlug(slug: string): Promise<Programme | null> {
    const programme = programmesData.find((p) => p.slug === slug) || null;
    return simulateNetworkDelay(programme, 200);
  },
};
