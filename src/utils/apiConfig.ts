/**
 * Resolves the backend REST API base URL dynamically.
 * Safely defaults to local backend when running on localhost.
 */
export function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (isLocalhost) {
    if (!envUrl || envUrl.includes('riseintl.org')) {
      return 'http://localhost:5000/api';
    }
  }

  return envUrl || 'http://localhost:5000/api';
}
