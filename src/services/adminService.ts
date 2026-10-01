/**
 * RISE International - Admin CMS API Service
 * Comprehensive service connecting frontend Admin CMS to backend REST API
 */

import { getApiBaseUrl } from '../utils/apiConfig';

const API_BASE = getApiBaseUrl();


export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor';
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
}

export interface AdminAuthSession {
  token: string;
  admin: AdminUser;
}

// Token management in localStorage with cookie fallback
export const adminAuthTokenKey = 'rise_admin_token';
export const adminUserDataKey = 'rise_admin_user';

export function getStoredToken(): string | null {
  return localStorage.getItem(adminAuthTokenKey);
}

export function getStoredAdmin(): AdminUser | null {
  const data = localStorage.getItem(adminUserDataKey);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function saveAdminSession(token: string, admin: AdminUser): void {
  localStorage.setItem(adminAuthTokenKey, token);
  localStorage.setItem(adminUserDataKey, JSON.stringify(admin));
}

export function clearAdminSession(): void {
  localStorage.removeItem(adminAuthTokenKey);
  localStorage.removeItem(adminUserDataKey);
}

async function adminFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getStoredToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const url = `${API_BASE.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  const json = await res.json().catch(() => ({
    success: false,
    message: 'Invalid server response.',
  }));

  if (!res.ok || !json.success) {
    if (res.status === 401) {
      clearAdminSession();
    }
    const errorMsg = json.message || `Request failed with status ${res.status}`;
    const err = new Error(errorMsg) as any;
    err.status = res.status;
    err.errors = json.errors;
    throw err;
  }

  return json;
}

export const adminService = {
  // Auth
  async login(email: string, password: string): Promise<AdminAuthSession> {
    const res = await adminFetch<{ success: boolean; data: AdminAuthSession }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    saveAdminSession(res.data.token, res.data.admin);
    return res.data;
  },

  async logout(): Promise<void> {
    try {
      await adminFetch('/auth/logout', { method: 'POST' });
    } finally {
      clearAdminSession();
    }
  },

  async getMe(): Promise<AdminUser> {
    const res = await adminFetch<{ success: boolean; data: AdminUser }>('/auth/me');
    return res.data;
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await adminFetch('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  // Dashboard & Metrics
  async getDashboard(): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>('/admin/dashboard');
    return res.data;
  },

  async getAuditLogs(page = 1, limit = 20): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any; pagination: any }>(
      `/admin/audit-logs?page=${page}&limit=${limit}`
    );
    return res;
  },

  // Admin Users
  async getUsers(): Promise<AdminUser[]> {
    const res = await adminFetch<{ success: boolean; data: AdminUser[] }>('/admin/users');
    return res.data;
  },

  async createUser(payload: { name: string; email: string; password: string; role: string }): Promise<AdminUser> {
    const res = await adminFetch<{ success: boolean; data: AdminUser }>('/admin/users', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  async updateUser(id: string, payload: Partial<AdminUser>): Promise<AdminUser> {
    const res = await adminFetch<{ success: boolean; data: AdminUser }>(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  async deleteUser(id: string): Promise<void> {
    await adminFetch(`/admin/users/${id}`, { method: 'DELETE' });
  },

  // Programmes CMS
  async getProgrammes(params?: { page?: number; limit?: number; search?: string; status?: string }): Promise<any> {
    const query = new URLSearchParams(params as any).toString();
    const res = await adminFetch<{ success: boolean; data: any[]; pagination: any }>(
      `/programmes/admin/all?${query}`
    );
    return res;
  },

  async createProgramme(payload: any): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>('/programmes/admin', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  async updateProgramme(id: string, payload: any): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>(`/programmes/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  async deleteProgramme(id: string): Promise<void> {
    await adminFetch(`/programmes/admin/${id}`, { method: 'DELETE' });
  },

  async patchProgrammeStatus(id: string, status: 'draft' | 'published'): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>(`/programmes/admin/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return res.data;
  },

  // Impact Statistics CMS
  async getImpactStats(): Promise<any[]> {
    const res = await adminFetch<{ success: boolean; data: any[] }>('/impact/admin/all');
    return res.data;
  },

  async createImpactStat(payload: any): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>('/impact/admin', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  async updateImpactStat(id: string, payload: any): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>(`/impact/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  async deleteImpactStat(id: string): Promise<void> {
    await adminFetch(`/impact/admin/${id}`, { method: 'DELETE' });
  },

  async reorderImpactStats(order: { id: string; sortOrder: number }[]): Promise<void> {
    await adminFetch('/impact/admin/reorder', {
      method: 'POST',
      body: JSON.stringify({ order }),
    });
  },

  // Stories CMS
  async getStories(params?: { page?: number; limit?: number; search?: string; status?: string }): Promise<any> {
    const query = new URLSearchParams(params as any).toString();
    const res = await adminFetch<{ success: boolean; data: any[]; pagination: any }>(
      `/stories/admin/all?${query}`
    );
    return res;
  },

  async createStory(payload: any): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>('/stories/admin', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  async updateStory(id: string, payload: any): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>(`/stories/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  async deleteStory(id: string): Promise<void> {
    await adminFetch(`/stories/admin/${id}`, { method: 'DELETE' });
  },

  // News CMS
  async getNews(params?: { page?: number; limit?: number; search?: string; status?: string }): Promise<any> {
    const query = new URLSearchParams(params as any).toString();
    const res = await adminFetch<{ success: boolean; data: any[]; pagination: any }>(
      `/news/admin/all?${query}`
    );
    return res;
  },

  async createNews(payload: any): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>('/news/admin', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  async updateNews(id: string, payload: any): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>(`/news/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  async deleteNews(id: string): Promise<void> {
    await adminFetch(`/news/admin/${id}`, { method: 'DELETE' });
  },

  // Team CMS
  async getTeam(): Promise<any[]> {
    const res = await adminFetch<{ success: boolean; data: any[] }>('/team/admin/all');
    return res.data;
  },

  async createTeamMember(payload: any): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>('/team/admin', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  async updateTeamMember(id: string, payload: any): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>(`/team/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  async deleteTeamMember(id: string): Promise<void> {
    await adminFetch(`/team/admin/${id}`, { method: 'DELETE' });
  },

  // Partners CMS
  async getPartners(): Promise<any[]> {
    const res = await adminFetch<{ success: boolean; data: any[] }>('/partners/admin/all');
    return res.data;
  },

  async createPartner(payload: any): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>('/partners/admin', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  async updatePartner(id: string, payload: any): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>(`/partners/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  async deletePartner(id: string): Promise<void> {
    await adminFetch(`/partners/admin/${id}`, { method: 'DELETE' });
  },

  // Donations
  async getDonations(params?: { page?: number; limit?: number; search?: string; status?: string }): Promise<any> {
    const query = new URLSearchParams(params as any).toString();
    const res = await adminFetch<{ success: boolean; data: any[]; pagination: any }>(
      `/donations/admin/all?${query}`
    );
    return res;
  },

  async updateDonationStatus(id: string, status: string): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>(`/donations/admin/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return res.data;
  },

  // Volunteers
  async getVolunteers(params?: { page?: number; limit?: number; search?: string; status?: string }): Promise<any> {
    const query = new URLSearchParams(params as any).toString();
    const res = await adminFetch<{ success: boolean; data: any[]; pagination: any }>(
      `/volunteer/admin/all?${query}`
    );
    return res;
  },

  async updateVolunteerStatus(id: string, status: string, adminNotes?: string): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>(`/volunteer/admin/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, adminNotes }),
    });
    return res.data;
  },

  async deleteVolunteer(id: string): Promise<void> {
    await adminFetch(`/volunteer/admin/${id}`, { method: 'DELETE' });
  },

  // Contact Messages
  async getContactMessages(params?: { page?: number; limit?: number; search?: string; status?: string }): Promise<any> {
    const query = new URLSearchParams(params as any).toString();
    const res = await adminFetch<{ success: boolean; data: any[]; pagination: any }>(
      `/contact/admin/all?${query}`
    );
    return res;
  },

  async updateContactStatus(id: string, status: string, adminNotes?: string): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>(`/contact/admin/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, adminNotes }),
    });
    return res.data;
  },

  async deleteContactMessage(id: string): Promise<void> {
    await adminFetch(`/contact/admin/${id}`, { method: 'DELETE' });
  },

  // Newsletter
  async getNewsletterSubscribers(params?: { page?: number; limit?: number; search?: string }): Promise<any> {
    const query = new URLSearchParams(params as any).toString();
    const res = await adminFetch<{ success: boolean; data: any[]; pagination: any }>(
      `/newsletter/admin/all?${query}`
    );
    return res;
  },

  async deleteNewsletterSubscriber(id: string): Promise<void> {
    await adminFetch(`/newsletter/admin/${id}`, { method: 'DELETE' });
  },

  // Pages CMS
  async getPages(params?: { page?: number; limit?: number; search?: string }): Promise<any> {
    const query = new URLSearchParams(params as any).toString();
    const res = await adminFetch<{ success: boolean; data: any[]; pagination: any }>(
      `/pages/admin/all?${query}`
    );
    return res;
  },

  async createPage(payload: any): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>('/pages/admin', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  async updatePage(id: string, payload: any): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>(`/pages/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  async deletePage(id: string): Promise<void> {
    await adminFetch(`/pages/admin/${id}`, { method: 'DELETE' });
  },

  // Website Settings
  async getSettings(): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>('/settings/admin');
    return res.data;
  },

  async updateSettings(payload: any): Promise<any> {
    const res = await adminFetch<{ success: boolean; data: any }>('/settings/admin', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return res.data;
  },

  // Image Upload
  async uploadImage(file: File): Promise<{ url: string; filename: string; size: number }> {
    const formData = new FormData();
    formData.append('image', file);
    const res = await adminFetch<{ success: boolean; data: any }>('/admin/uploads/image', {
      method: 'POST',
      body: formData,
    });
    return res.data;
  },
};
