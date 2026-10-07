import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { adminService } from '../../services/adminService';
import { SeoEditorFields, SeoFields } from '../../components/admin/SeoEditorFields';
import { AiAssistantModal } from '../../components/admin/AiAssistantModal';
import { MediaPickerModal } from '../../components/admin/MediaPickerModal';

interface PageSection {
  id: string;
  type: string;
  heading?: string;
  subheading?: string;
  content?: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
  isVisible: boolean;
  sortOrder: number;
}

const SECTION_TYPE_OPTIONS = [
  { value: 'hero', label: 'Hero Banner' },
  { value: 'text', label: 'Rich Text' },
  { value: 'image-text', label: 'Image + Text' },
  { value: 'text-image', label: 'Text + Image' },
  { value: 'full-image', label: 'Full-Width Image' },
  { value: 'gallery', label: 'Photo Gallery' },
  { value: 'cards', label: 'Feature Cards' },
  { value: 'programmes', label: 'Programmes Showcase' },
  { value: 'statistics', label: 'Impact Statistics' },
  { value: 'cta', label: 'Call to Action' },
  { value: 'video', label: 'Video Embed' },
  { value: 'faq', label: 'FAQ Accordion' },
  { value: 'testimonials', label: 'Testimonials / Quotes' },
  { value: 'team', label: 'Leadership Team' },
  { value: 'partners', label: 'Partners Alliance' },
  { value: 'news', label: 'News & Updates' },
  { value: 'stories', label: 'Field Stories' },
  { value: 'donation-cta', label: 'Donation CTA' },
  { value: 'volunteer-cta', label: 'Volunteer CTA' },
  { value: 'contact', label: 'Contact Box' },
];

export const AdminPagesPage: React.FC = () => {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  // Media picker state
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<'featuredImage' | { sectionIndex: number }>('featuredImage');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    featuredImage: '/images/wordpress/bosa-charity-img1.jpg',
    status: 'published',
    sections: [] as PageSection[],
    menuVisibility: true,
    sortOrder: 0,
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
      featuredImage: '/images/wordpress/bosa-charity-img1.jpg',
      status: 'published',
      sections: [],
      menuVisibility: true,
      sortOrder: 0,
      seoTitle: '',
      seoDescription: '',
      canonicalUrl: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '/images/wordpress/bosa-charity-img1.jpg',
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
      featuredImage: item.featuredImage || '/images/wordpress/bosa-charity-img1.jpg',
      status: item.status || 'published',
      sections: item.sections || [],
      menuVisibility: item.menuVisibility !== false,
      sortOrder: item.sortOrder || 0,
      seoTitle: item.seoTitle || '',
      seoDescription: item.seoDescription || '',
      canonicalUrl: item.canonicalUrl || `https://riseintl.org/${item.slug || ''}`,
      ogTitle: item.ogTitle || item.seoTitle || item.title || '',
      ogDescription: item.ogDescription || item.seoDescription || '',
      ogImage: item.ogImage || item.featuredImage || '/images/wordpress/bosa-charity-img1.jpg',
      noindex: Boolean(item.noindex),
    });
    setIsModalOpen(true);
  };

  // Section Builder Helpers
  const addSection = (type: string = 'text') => {
    const newSection: PageSection = {
      id: `sec_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      type,
      heading: 'New Section Heading',
      subheading: '',
      content: 'Enter section content here...',
      image: '/images/wordpress/bosa-charity-img1.jpg',
      buttonText: '',
      buttonLink: '',
      isVisible: true,
      sortOrder: formData.sections.length + 1,
    };
    setFormData((prev) => ({ ...prev, sections: [...prev.sections, newSection] }));
  };

  const updateSection = (index: number, updates: Partial<PageSection>) => {
    setFormData((prev) => {
      const updated = [...prev.sections];
      updated[index] = { ...updated[index], ...updates };
      return { ...prev, sections: updated };
    });
  };

  const removeSection = (index: number) => {
    if (!confirm('Remove this section?')) return;
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const duplicateSection = (index: number) => {
    const original = formData.sections[index];
    const clone: PageSection = {
      ...original,
      id: `sec_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      heading: `${original.heading || 'Section'} (Copy)`,
      sortOrder: formData.sections.length + 1,
    };
    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections.slice(0, index + 1), clone, ...prev.sections.slice(index + 1)],
    }));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === formData.sections.length - 1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...formData.sections];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setFormData((prev) => ({ ...prev, sections: updated }));
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
    if (!confirm(`Permanently delete page "${title}"?`)) return;
    try {
      await adminService.deletePage(id);
      await loadPages();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  const handleMediaSelect = (url: string) => {
    if (mediaPickerTarget === 'featuredImage') {
      setFormData((prev) => ({ ...prev, featuredImage: url }));
    } else if (typeof mediaPickerTarget === 'object' && 'sectionIndex' in mediaPickerTarget) {
      updateSection(mediaPickerTarget.sectionIndex, { image: url });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">Content Pages &amp; CMS Page Builder</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage static institutional copy, mission &amp; vision statements, section blocks, and SEO controls.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-base">auto_awesome</span>
              <span>AI Content Assistant</span>
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

        {/* Pages Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200 text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-3.5 text-left">Page Title</th>
                <th className="px-6 py-3.5 text-left">Slug / Canonical URL</th>
                <th className="px-6 py-3.5 text-center">Sections</th>
                <th className="px-6 py-3.5 text-left">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center p-8 text-slate-400">
                    Loading institutional pages...
                  </td>
                </tr>
              ) : pages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-8 text-slate-400">
                    No pages found. Click "Create New Page" to start.
                  </td>
                </tr>
              ) : (
                pages.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      <div className="flex items-center space-x-3">
                        {item.featuredImage && (
                          <img
                            src={item.featuredImage}
                            alt=""
                            className="w-10 h-8 rounded object-cover border border-slate-200"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/logo/rise-logo.png';
                            }}
                          />
                        )}
                        <span>{item.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-mono text-[11px]">/{item.slug}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full font-bold text-[10px]">
                        {item.sections?.length || 0} block(s)
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          item.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="text-emerald-700 hover:text-emerald-900 font-semibold"
                      >
                        Edit / Builder
                      </button>
                      <button
                        onClick={() => handleDelete(item._id, item.title)}
                        className="text-rose-600 hover:text-rose-800 font-semibold ml-3"
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

        {/* Edit / Create Page Modal with Section Builder */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto border border-slate-200">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    {editingItem ? 'Edit Page & Section Builder' : 'Create Page & Section Builder'}
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

              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                {/* Core Attributes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Navigation Sort Order</label>
                    <input
                      type="number"
                      value={formData.sortOrder}
                      onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-xs"
                    />
                  </div>
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Featured Header Image</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={formData.featuredImage}
                      onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono text-[11px]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setMediaPickerTarget('featuredImage');
                        setIsMediaPickerOpen(true);
                      }}
                      className="px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium text-xs transition-colors flex items-center space-x-1 border border-emerald-200"
                    >
                      <span className="material-symbols-outlined text-base">photo_library</span>
                      <span>Media Library</span>
                    </button>
                  </div>
                </div>

                {/* Main Content */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Main Overview Content *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-xs font-sans leading-relaxed"
                  />
                </div>

                {/* Section 15: SECTION BUILDER */}
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 flex items-center space-x-1.5">
                        <span className="material-symbols-outlined text-emerald-600 text-lg">dashboard_customize</span>
                        <span>Modular Section Builder</span>
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Add, reorder, customize, or hide sections for this page.
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <select
                        id="newSectionTypeSelect"
                        className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-700"
                        defaultValue="text"
                      >
                        {SECTION_TYPE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => {
                          const select = document.getElementById('newSectionTypeSelect') as HTMLSelectElement;
                          addSection(select?.value || 'text');
                        }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center space-x-1"
                      >
                        <span className="material-symbols-outlined text-xs">add</span>
                        <span>Add Section</span>
                      </button>
                    </div>
                  </div>

                  {formData.sections.length === 0 ? (
                    <div className="text-center py-6 text-slate-400 text-xs border border-dashed border-slate-200 rounded-lg bg-white">
                      No custom modular sections added yet. Click "+ Add Section" above to add hero banners, cards, galleries, or CTAs.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formData.sections.map((section, idx) => (
                        <div
                          key={section.id}
                          className={`bg-white rounded-xl border p-4 space-y-3 transition-all ${
                            section.isVisible ? 'border-slate-200 shadow-sm' : 'border-slate-200 opacity-60 bg-slate-50/50'
                          }`}
                        >
                          {/* Section Card Header */}
                          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <div className="flex items-center space-x-2">
                              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[10px]">
                                {idx + 1}
                              </span>
                              <span className="font-semibold text-slate-800 text-xs">
                                {SECTION_TYPE_OPTIONS.find((o) => o.value === section.type)?.label || section.type}
                              </span>
                              {!section.isVisible && (
                                <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">
                                  Hidden
                                </span>
                              )}
                            </div>

                            {/* Section Controls */}
                            <div className="flex items-center space-x-1">
                              <button
                                type="button"
                                onClick={() => moveSection(idx, 'up')}
                                disabled={idx === 0}
                                className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20"
                                title="Move Up"
                              >
                                <span className="material-symbols-outlined text-base">arrow_upward</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => moveSection(idx, 'down')}
                                disabled={idx === formData.sections.length - 1}
                                className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20"
                                title="Move Down"
                              >
                                <span className="material-symbols-outlined text-base">arrow_downward</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => duplicateSection(idx)}
                                className="p-1 text-slate-400 hover:text-slate-700"
                                title="Duplicate Section"
                              >
                                <span className="material-symbols-outlined text-base">content_copy</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => updateSection(idx, { isVisible: !section.isVisible })}
                                className="p-1 text-slate-400 hover:text-slate-700"
                                title={section.isVisible ? 'Hide Section' : 'Show Section'}
                              >
                                <span className="material-symbols-outlined text-base">
                                  {section.isVisible ? 'visibility' : 'visibility_off'}
                                </span>
                              </button>
                              <button
                                type="button"
                                onClick={() => removeSection(idx)}
                                className="p-1 text-rose-500 hover:text-rose-700"
                                title="Delete Section"
                              >
                                <span className="material-symbols-outlined text-base">delete</span>
                              </button>
                            </div>
                          </div>

                          {/* Section Inputs */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Section Heading</label>
                              <input
                                type="text"
                                value={section.heading || ''}
                                onChange={(e) => updateSection(idx, { heading: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Subheading / Badge</label>
                              <input
                                type="text"
                                value={section.subheading || ''}
                                onChange={(e) => updateSection(idx, { subheading: e.target.value })}
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Body Text / Paragraph</label>
                            <textarea
                              rows={2}
                              value={section.content || ''}
                              onChange={(e) => updateSection(idx, { content: e.target.value })}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="sm:col-span-1">
                              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Section Image</label>
                              <div className="flex items-center space-x-1">
                                <input
                                  type="text"
                                  value={section.image || ''}
                                  onChange={(e) => updateSection(idx, { image: e.target.value })}
                                  className="flex-1 px-2 py-1.5 border border-slate-300 rounded-lg text-[10px] font-mono truncate"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setMediaPickerTarget({ sectionIndex: idx });
                                    setIsMediaPickerOpen(true);
                                  }}
                                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                                  title="Choose Image from Media Library"
                                >
                                  <span className="material-symbols-outlined text-sm">photo_library</span>
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Button Text</label>
                              <input
                                type="text"
                                value={section.buttonText || ''}
                                onChange={(e) => updateSection(idx, { buttonText: e.target.value })}
                                placeholder="E.g. Learn More"
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Button Link</label>
                              <input
                                type="text"
                                value={section.buttonLink || ''}
                                onChange={(e) => updateSection(idx, { buttonLink: e.target.value })}
                                placeholder="E.g. /our-work"
                                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                    {saving ? 'Saving...' : 'Save Page & Sections'}
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
          pageTitle={formData.title || 'Institutional Page'}
          pageType="page"
          currentContent={formData.content}
          onApply={handleApplyAiData}
        />

        {/* Media Picker Modal */}
        <MediaPickerModal
          isOpen={isMediaPickerOpen}
          onClose={() => setIsMediaPickerOpen(false)}
          currentValue={
            mediaPickerTarget === 'featuredImage'
              ? formData.featuredImage
              : typeof mediaPickerTarget === 'object'
              ? formData.sections[mediaPickerTarget.sectionIndex]?.image
              : ''
          }
          onSelect={handleMediaSelect}
          title="Select Image from Media Library"
        />
      </div>
    </AdminLayout>
  );
};
