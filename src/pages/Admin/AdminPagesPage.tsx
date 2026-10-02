import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { adminService } from '../../services/adminService';
import { SeoEditorFields, SeoFields } from '../../components/admin/SeoEditorFields';
import { AiAssistantModal } from '../../components/admin/AiAssistantModal';

export const AdminPagesPage: React.FC = () => {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    status: 'published',
    seoTitle: '',
    seoDescription: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    noindex: false,
  });

  const loadPages = async () => {
    setLoading(true);
    try {
      const res = await adminService.getPages();
      setPages(res.data || []);
    } catch (err: any) {
      alert(err.message || 'Failed to load pages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      slug: '',
      content: '',
      status: 'published',
      seoTitle: '',
      seoDescription: '',
      canonicalUrl: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '/images/homepage-hero-community-collaboration.jpg',
      noindex: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      slug: item.slug || '',
      content: item.content || '',
      status: item.status || 'published',
      seoTitle: item.seoTitle || '',
      seoDescription: item.seoDescription || '',
      canonicalUrl: item.canonicalUrl || `https://riseintl.org/${item.slug || ''}`,
      ogTitle: item.ogTitle || item.seoTitle || item.title || '',
      ogDescription: item.ogDescription || item.seoDescription || '',
      ogImage: item.ogImage || '/images/homepage-hero-community-collaboration.jpg',
      noindex: Boolean(item.noindex),
    });
    setIsModalOpen(true);
  };

  const handleApplyAiData = (payload: { mode: string; data: any }) => {
    const { mode, data } = payload;
    if (mode === 'seo') {
      setFormData((prev) => ({
        ...prev,
        seoTitle: data.seoTitle || prev.seoTitle,
        seoDescription: data.metaDescription || prev.seoDescription,
        ogTitle: data.seoTitle || prev.ogTitle,
        ogDescription: data.metaDescription || prev.ogDescription,
      }));
    } else if (mode === 'page-content') {
      setFormData((prev) => ({
        ...prev,
        content: data.overview || data.rawContent || prev.content,
        seoTitle: `${prev.title || 'Page'} | RISE International`,
        seoDescription: data.overview?.slice(0, 150) || prev.seoDescription,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingItem) {
        await adminService.updatePage(editingItem._id, formData);
      } else {
        await adminService.createPage(formData);
      }
      setIsModalOpen(false);
      await loadPages();
    } catch (err: any) {
      alert(err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete page "${title}"?`)) return;
    try {
      await adminService.deletePage(id);
      await loadPages();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">Content Pages CMS</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage static institutional copy, mission &amp; vision statements, and policy documents with full SEO controls.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-base">auto_awesome</span>
              <span>AI Content &amp; SEO Assistant</span>
            </button>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>Create New Page</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200 text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-3.5 text-left">Page Title</th>
                <th className="px-4 py-3.5 text-left">URL Slug</th>
                <th className="px-4 py-3.5 text-left">Status</th>
                <th className="px-4 py-3.5 text-left">SEO Title</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">Loading pages...</td>
                </tr>
              ) : pages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">No custom pages found.</td>
                </tr>
              ) : (
                pages.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-slate-900">{p.title}</td>
                    <td className="px-4 py-3.5 font-mono text-slate-500">/{p.slug}</td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        p.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {p.status || 'published'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 truncate max-w-xs">{p.seoTitle || '—'}</td>
                    <td className="px-5 py-3.5 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id, p.title)}
                        className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Edit/Create Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto border border-slate-200">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    {editingItem ? 'Edit Page' : 'Create Page'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsAiModalOpen(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                    <span>AI Assistant</span>
                  </button>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Page Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Publish Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white text-xs"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft (Review Required)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Page Content *</label>
                  <textarea
                    rows={6}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-xs font-sans leading-relaxed"
                  />
                </div>

                {/* Section 58 Full SEO Fields Component */}
                <SeoEditorFields
                  values={{
                    slug: formData.slug,
                    seoTitle: formData.seoTitle,
                    seoDescription: formData.seoDescription,
                    canonicalUrl: formData.canonicalUrl,
                    ogTitle: formData.ogTitle,
                    ogDescription: formData.ogDescription,
                    ogImage: formData.ogImage,
                    noindex: formData.noindex,
                  }}
                  onChange={(fields: Partial<SeoFields>) => {
                    setFormData((prev) => ({ ...prev, ...fields }));
                  }}
                />

                <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Page'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Section 59 & 61 AI Assistant Modal */}
        <AiAssistantModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          pageTitle={formData.title || 'Institutional Page'}
          pageType="page"
          currentContent={formData.content}
          onApply={handleApplyAiData}
        />
      </div>
    </AdminLayout>
  );
};
