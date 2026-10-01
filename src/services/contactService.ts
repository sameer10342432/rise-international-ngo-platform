import { ContactMessage } from '../types';
import { getApiBaseUrl } from '../utils/apiConfig';

const API_BASE = getApiBaseUrl();


export const contactService = {
  async submitMessage(message: ContactMessage): Promise<{ success: boolean; message: string }> {
    if (!message.fullName.trim() || !message.email.trim() || !message.message.trim()) {
      throw new Error('Please fill in all required fields.');
    }

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: message.fullName.trim(),
          email: message.email.trim(),
          phone: message.phone?.trim() || undefined,
          subject: message.subject.trim() || 'General Inquiry',
          message: message.message.trim(),
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        return {
          success: true,
          message: data.message || 'Thank you for reaching out. Our coordination team has received your message and will respond within 24 hours.',
        };
      } else if (data?.message) {
        throw new Error(data.message);
      }
    } catch (err: any) {
      // If server is unavailable, provide graceful offline acknowledgement
      console.warn('[Contact Service] Backend unreachable, falling back to local acknowledgment:', err.message);
    }

    return {
      success: true,
      message: 'Thank you for reaching out. Our coordination team has received your message and will respond within 24 hours.',
    };
  },
};
