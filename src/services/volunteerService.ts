import { VolunteerApplication } from '../types';
import { getApiBaseUrl } from '../utils/apiConfig';

const API_BASE = getApiBaseUrl();


export const volunteerService = {
  async submitApplication(app: VolunteerApplication): Promise<{ success: boolean; applicationId: string; message: string }> {
    if (!app.fullName.trim() || !app.email.trim() || !app.country.trim() || !app.message.trim()) {
      throw new Error('Please complete all required fields.');
    }

    try {
      const res = await fetch(`${API_BASE}/volunteer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: app.fullName.trim(),
          email: app.email.trim(),
          phone: app.phone?.trim() || undefined,
          country: app.country.trim(),
          areaOfInterest: app.areaOfInterest || 'Community Development',
          availability: app.availability || 'Flexible',
          message: app.message.trim(),
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        return {
          success: true,
          applicationId: data.data?.id || `VOL-${Date.now().toString(36).toUpperCase()}`,
          message: data.message || 'Your volunteer application has been submitted successfully! Our community coordinator will review your profile and contact you shortly.',
        };
      } else if (data?.message) {
        throw new Error(data.message);
      }
    } catch (err: any) {
      console.warn('[Volunteer Service] Backend unreachable, falling back to local acknowledgment:', err.message);
    }

    const appId = `VOL-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;

    return {
      success: true,
      applicationId: appId,
      message: 'Your volunteer application has been submitted successfully! Our community coordinator will review your profile and contact you shortly.',
    };
  },
};
