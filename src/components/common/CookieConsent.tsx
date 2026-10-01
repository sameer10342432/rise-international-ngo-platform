import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const COOKIE_CONSENT_KEY = 'rise_intl_cookie_consent';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    functional: true,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!savedConsent) {
      // Delay showing slightly for pleasant entrance
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({ necessary: true, analytics: true, functional: true, timestamp: Date.now() })
    );
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({ necessary: true, analytics: false, functional: false, timestamp: Date.now() })
    );
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({ ...preferences, timestamp: Date.now() })
    );
    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xl z-50 bg-surface-container-lowest border border-outline-variant/50 p-6 rounded-2xl shadow-level-3 animate-fade-in"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[22px]">cookie</span>
        </div>
        <div className="flex-1">
          <h4 id="cookie-banner-title" className="font-headline-sm text-headline-sm text-primary">
            Cookie &amp; Privacy Notice
          </h4>
          <p id="cookie-banner-desc" className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
            RISE International uses essential and functional cookies to ensure platform security, verify donations, and evaluate anonymous impact traffic. Review our{' '}
            <Link to="/cookie-policy" className="text-secondary underline hover:text-secondary-hover">
              Cookie Policy
            </Link>{' '}
            and{' '}
            <Link to="/privacy-policy" className="text-secondary underline hover:text-secondary-hover">
              Privacy Policy
            </Link>.
          </p>

          {showPreferences && (
            <div className="mt-4 pt-4 border-t border-outline-variant/30 space-y-3">
              <label className="flex items-center justify-between text-sm cursor-not-allowed opacity-80">
                <span className="font-medium text-primary">Strictly Necessary Cookies</span>
                <span className="text-xs bg-surface-container-high px-2 py-0.5 rounded text-on-surface-variant">Always Active</span>
              </label>

              <label className="flex items-center justify-between text-sm cursor-pointer">
                <div>
                  <span className="font-medium text-primary block">Analytical &amp; Impact Telemetry</span>
                  <span className="text-xs text-on-surface-variant">Helps us gauge regional visitor reach anonymously</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between text-sm cursor-pointer">
                <div>
                  <span className="font-medium text-primary block">Functional Preferences</span>
                  <span className="text-xs text-on-surface-variant">Remembers language and donation preferences</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                  className="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
                />
              </label>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2.5 mt-5">
            {showPreferences ? (
              <button
                type="button"
                onClick={handleSavePreferences}
                className="px-5 py-2 rounded-xl bg-secondary text-white font-label-sm text-label-sm hover:bg-secondary/90 transition-all"
              >
                Save Preferences
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-4 py-2 rounded-xl bg-secondary text-white font-label-sm text-label-sm hover:bg-secondary/90 transition-all"
                >
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-4 py-2 rounded-xl bg-surface-container text-primary font-label-sm text-label-sm hover:bg-surface-container-high transition-all"
                >
                  Reject Non-Essential
                </button>
                <button
                  type="button"
                  onClick={() => setShowPreferences(true)}
                  className="px-3 py-2 text-on-surface-variant hover:text-primary font-label-sm text-label-sm transition-all underline"
                >
                  Manage Preferences
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
