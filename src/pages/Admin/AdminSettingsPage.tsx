import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { adminService } from '../../services/adminService';
import { MediaPickerModal } from '../../components/admin/MediaPickerModal';

export const AdminSettingsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaPickerField, setMediaPickerField] = useState<'logo' | 'favicon'>('logo');

  const [formData, setFormData] = useState({
    organisationName: 'RISE International',
    tagline: 'Translating Thoughts Into Actions',
    email: 'info@riseintl.org',
    phone: '+92-302-4044714',
    logo: '/images/logo/rise-logo.png',
    favicon: '/favicon.png',
    defaultSeoTitle: 'RISE International | Translating Thoughts Into Actions',
    defaultSeoDescription:
      'Research Initiatives and Skill Enlightenment (RISE International) is dedicated to empowering vulnerable communities through higher IT education, vocational skill centers, climate action, and dignified relief.',
    homepageConfig: {
      heroTitle: 'Translating Thoughts Into Actions',
      heroSubtitle: 'Together, We Can Make A Difference',
      heroDescription:
        'RISE International is a dedicated organisation committed to empowering communities through sustainable education, vocational centers, and life-changing humanitarian programs.',
      heroCtaPrimary: 'DONATE NOW',
      heroCtaSecondary: 'BECOME A VOLUNTEER',
      showDonationCalculator: true,
      showNewsletter: true,
    },
  });

  useEffect(() => {
    adminService
      .getSettings()
      .then((settings) => {
        if (settings) {
          setFormData((prev) => ({
            ...prev,
            ...settings,
            homepageConfig: {
              ...prev.homepageConfig,
              ...(settings.homepageConfig || {}),
            },
          }));
        }
      })
      .catch((err) => setErrorMsg(err.message || 'Failed to load settings'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      await adminService.updateSettings(formData);
      setSuccessMsg('Website settings and SEO metadata saved successfully.');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
            Website Settings & SEO Configuration
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Centrally manage global contact credentials, SEO meta tags, and homepage hero configurations.
          </p>
        </div>

        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
            <span className="material-symbols-outlined text-sm">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {loading ? (
          <div className="bg-white p-12 rounded-xl border border-slate-200 text-center text-xs text-slate-400">
            Loading website configuration...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">

          {/* Organization Contact Credentials */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
              <span className="material-symbols-outlined text-slate-400 text-base">domain</span>
              <span>General Organization Profile</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Organization Name</label>
                <input
                  type="text"
                  required
                  value={formData.organisationName}
                  onChange={(e) => setFormData({ ...formData, organisationName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Tagline</label>
                <input
                  type="text"
                  required
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Primary Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Authentic Brand Logo URL</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono text-[11px]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setMediaPickerField('logo');
                      setIsMediaPickerOpen(true);
                    }}
                    className="px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium text-xs transition-colors flex items-center space-x-1 border border-emerald-200"
                  >
                    <span className="material-symbols-outlined text-base">photo_library</span>
                    <span>Media Library</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Favicon / Site Icon URL</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={formData.favicon}
                    onChange={(e) => setFormData({ ...formData, favicon: e.target.value })}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono text-[11px]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setMediaPickerField('favicon');
                      setIsMediaPickerOpen(true);
                    }}
                    className="px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium text-xs transition-colors flex items-center space-x-1 border border-emerald-200"
                  >
                    <span className="material-symbols-outlined text-base">photo_library</span>
                    <span>Media Library</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
              <span className="material-symbols-outlined text-slate-400 text-base">search</span>
              <span>Global SEO & OpenGraph Defaults</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Default Meta Title</label>
                <input
                  type="text"
                  required
                  value={formData.defaultSeoTitle}
                  onChange={(e) => setFormData({ ...formData, defaultSeoTitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Default Meta Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.defaultSeoDescription}
                  onChange={(e) => setFormData({ ...formData, defaultSeoDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Homepage Content CMS */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2">
              <span className="material-symbols-outlined text-slate-400 text-base">home</span>
              <span>Homepage Hero Content</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Hero Main Heading</label>
                <input
                  type="text"
                  value={formData.homepageConfig.heroTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      homepageConfig: { ...formData.homepageConfig, heroTitle: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Hero Subtitle</label>
                <input
                  type="text"
                  value={formData.homepageConfig.heroSubtitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      homepageConfig: { ...formData.homepageConfig, heroSubtitle: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Hero Description Paragraph</label>
                <textarea
                  rows={2}
                  value={formData.homepageConfig.heroDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      homepageConfig: { ...formData.homepageConfig, heroDescription: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Primary CTA Button Label</label>
                <input
                  type="text"
                  value={formData.homepageConfig.heroCtaPrimary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      homepageConfig: { ...formData.homepageConfig, heroCtaPrimary: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Secondary CTA Button Label</label>
                <input
                  type="text"
                  value={formData.homepageConfig.heroCtaSecondary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      homepageConfig: { ...formData.homepageConfig, heroCtaSecondary: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving Settings...' : 'Save Settings'}
            </button>
          </div>
        </form>
        )}
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        currentValue={mediaPickerField === 'logo' ? formData.logo : formData.favicon}
        onSelect={(url) => setFormData((prev) => ({ ...prev, [mediaPickerField]: url }))}
        title={mediaPickerField === 'logo' ? 'Select Brand Logo' : 'Select Favicon / Site Icon'}
      />
    </AdminLayout>
  );
};
