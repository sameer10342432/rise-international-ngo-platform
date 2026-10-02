import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { adminService } from '../../services/adminService';
import { SeoEditorFields } from '../../components/admin/SeoEditorFields';
import { AiAssistantModal } from '../../components/admin/AiAssistantModal';

export const AdminNewsPage: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Field Updates',
    excerpt: '',
    content: '',
    featuredImage: '/images/news-field-updates-learning-centre.jpg',
    author: 'RISE Communications',
    status: 'published',
    featured: false,
    tags: '',
    readTime: '4 min read',
    seoTitle: '',
    seoDescription: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    noindex: false,
  });

  const loadArticles = async () => {
    setLoading(true);
    try {
      const res = await adminService.getNews({ search });
      setArticles(res.data || []);
    } catch (err: any) {
      alert(err.message || 'Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, [search]);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Field Updates',
      excerpt: '',
      content: '',
      featuredImage: '/images/news-field-updates-learning-centre.jpg',
      author: 'RISE Communications',
      status: 'published',
      featured: false,
      tags: 'Field Updates, Community',
      readTime: '4 min read',
      seoTitle: '',
      seoDescription: '',
      canonicalUrl: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      noindex: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      slug: item.slug || '',
      category: item.category,
      excerpt: item.excerpt || '',
      content: Array.isArray(item.content) ? item.content.join('\n\n') : (item.content || ''),
      featuredImage: item.featuredImage || '/images/news-field-updates-learning-centre.jpg',
      author: item.author || 'RISE Communications',
      status: item.status || 'published',
      featured: Boolean(item.featured),
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
      readTime: item.readTime || '4 min read',
      seoTitle: item.seoTitle || '',
      seoDescription: item.seoDescription || '',
      canonicalUrl: item.canonicalUrl || '',
      ogTitle: item.ogTitle || '',
      ogDescription: item.ogDescription || '',
      ogImage: item.ogImage || '',
      noindex: Boolean(item.noindex),
    });
    setIsModalOpen(true);
  };

  const handleAiApply = (generated: any) => {
    if (generated.seoTitle || generated.metaDescription) {
      setFormData((prev) => ({
        ...prev,
        seoTitle: generated.seoTitle || prev.seoTitle,
        seoDescription: generated.metaDescription || prev.seoDescription,
        ogTitle: generated.seoTitle || prev.ogTitle,
        ogDescription: generated.metaDescription || prev.ogDescription,
      }));
    }
    if (generated.title) {
      setFormData((prev) => ({ ...prev, title: generated.title }));
    }
    if (generated.excerpt) {
      setFormData((prev) => ({ ...prev, excerpt: generated.excerpt }));
    }
    if (generated.content) {
      const formattedContent = Array.isArray(generated.content)
        ? generated.content.join('\n\n')
        : generated.content;
      setFormData((prev) => ({ ...prev, content: formattedContent }));
    }
    if (generated.imageUrl) {
      setFormData((prev) => ({
        ...prev,
        featuredImage: generated.imageUrl,
        ogImage: generated.imageUrl,
      }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await adminService.uploadImage(file);
      setFormData((prev) => ({ ...prev, featuredImage: res.url }));
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...formData,
      content: formData.content
        .split('\n\n')
        .map((p) => p.trim())
        .filter(Boolean),
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (editingItem) {
        await adminService.updateNews(editingItem._id, payload);
      } else {
        await adminService.createNews(payload);
      }
      setIsModalOpen(false);
      await loadArticles();
    } catch (err: any) {
      alert(err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete news article "${title}"?`)) return;
    try {
      await adminService.deleteNews(id);
      await loadArticles();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">News & Media CMS</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Publish press releases, field dispatches, and organizational announcements.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Write News Article</span>
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Search news by headline, tags, or excerpt..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* News Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-5 py-3.5 text-left">Article</th>
                  <th className="px-4 py-3.5 text-left">Category</th>
                  <th className="px-4 py-3.5 text-left">Status</th>
                  <th className="px-4 py-3.5 text-left">Author</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">Loading articles...</td>
                  </tr>
                ) : articles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">No news articles found.</td>
                  </tr>
                ) : (
                  articles.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.featuredImage}
                            alt=""
                            className="w-12 h-10 object-cover rounded border border-slate-200 bg-slate-100"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/classroom-children-education.png';
                            }}
                          />
                          <div>
                            <div className="font-semibold text-slate-900 line-clamp-1">{item.title}</div>
                            <div className="text-[10px] text-slate-400 font-mono">/news/{item.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-slate-600 font-medium">{item.category}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            item.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-slate-500">{item.author}</td>
                      <td className="px-5 py-4 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id, item.title)}
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
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto border border-slate-200">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-3">
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    {editingItem ? 'Edit News Article' : 'New Article'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsAiModalOpen(true)}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                    <span>AI Assistant</span>
                  </button>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Headline / Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Category</label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Featured Image URL</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={formData.featuredImage}
                      onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono text-[11px]"
                    />
                    <label className="cursor-pointer px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium">
                      <span>{uploading ? '...' : 'Upload'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Excerpt</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Article Paragraphs (separate paragraphs with blank line)
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Author</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                </div>

                {/* SEO Metadata Editor */}
                <div className="pt-2">
                  <SeoEditorFields
                    values={{
                      seoTitle: formData.seoTitle,
                      seoDescription: formData.seoDescription,
                      canonicalUrl: formData.canonicalUrl,
                      ogTitle: formData.ogTitle,
                      ogDescription: formData.ogDescription,
                      ogImage: formData.ogImage,
                      slug: formData.slug,
                      noindex: formData.noindex,
                    }}
                    onChange={(vals) => setFormData((prev) => ({ ...prev, ...vals }))}
                    basePath="/news"
                  />
                </div>

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
                    {saving ? 'Saving...' : 'Save Article'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* AI Assistant Modal */}
        <AiAssistantModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          onApply={handleAiApply}
          defaultMode="article"
          context={{
            pageTitle: formData.title || 'News & Field Updates',
            pageType: 'news',
            topic: formData.category || 'International Community Programme Updates',
            currentContent: formData.content,
          }}
        />
      </div>
    </AdminLayout>
  );
};
