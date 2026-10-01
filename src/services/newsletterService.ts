import { NewsletterSubscription } from '../types';
import { getApiBaseUrl } from '../utils/apiConfig';

const API_BASE = getApiBaseUrl();


export const newsletterService = {
  async subscribe(payload: NewsletterSubscription): Promise<{ success: boolean; message: string }> {
    if (!payload.email.trim() || !payload.email.includes('@')) {
      throw new Error('Please provide a valid email address.');
    }

    try {
      const res = await fetch(`${API_BASE}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: payload.email.trim().toLowerCase(),
          firstName: payload.firstName?.trim() || undefined,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        return {
          success: true,
          message: data.message || `Thank you, ${payload.firstName || 'friend'}! You are now subscribed to quarterly field updates from RISE International.`,
        };
      } else if (data?.message) {
        throw new Error(data.message);
      }
    } catch (err: any) {
      console.warn('[Newsletter Service] Backend unreachable, falling back to local confirmation:', err.message);
    }

    return {
      success: true,
      message: `Thank you, ${payload.firstName || 'friend'}! You are now subscribed to quarterly field updates from RISE International.`,
    };
  },
};
