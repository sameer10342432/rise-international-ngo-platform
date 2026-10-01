/**
 * RISE International - API Client
 * Clean abstraction layer for future REST API backend connectivity.
 */

import { getApiBaseUrl } from '../utils/apiConfig';

const API_BASE_URL = getApiBaseUrl();


export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Generic fetch wrapper with standard headers, error handling, and timeout.
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers || {}),
  });

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `API Request failed with status ${response.status}`;
      try {
        const errJson = await response.json();
        if (errJson && errJson.message) errorMessage = errJson.message;
      } catch {
        // Fallback to response.statusText
        errorMessage = response.statusText || errorMessage;
      }
      throw new ApiError(errorMessage, response.status);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error occurred',
      0
    );
  }
}

/**
 * Helper to simulate network latency for mock calls in development
 */
export function simulateNetworkDelay<T>(data: T, delayMs: number = 600): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
}
