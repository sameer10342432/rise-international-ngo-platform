import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { adminService } from '../../services/adminService';

export const AdminPartnersPage: React.FC = () => {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Institutional',
    website: '',
    logo: '/images/rise-logo.svg',
    description: '',
    sortOrder: 1,
    isVisible: true,
  });

  const loadPartners = async () => {
    setLoading(true);
    try {
      const data = await adminService.getPartners();
      setPartners(data || []);
    } catch (err: any) {
      alert(err.message || 'Failed to load partners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: 'Institutional',
      website: '',
      logo: '/images/rise-logo.svg',
      description: '',
      sortOrder: partners.length + 1,
      isVisible: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category || 'Institutional',
      website: item.website || '',
      logo: item.logo || '/images/rise-logo.svg',
      description: item.description || '',
      sortOrder: item.sortOrder || 1,
      isVisible: item.isVisible ?? true,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingItem) {
        await adminService.updatePartner(editingItem._id, formData);
      } else {
        await adminService.createPartner(formData);
      }
      setIsModalOpen(false);
      await loadPartners();
    } catch (err: any) {
      alert(err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete partner "${name}"?`)) return;
    try {
      await adminService.deletePartner(id);
      await loadPartners();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">Partners Directory CMS</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage verified institutional donors, corporate partners, and field implementing agencies.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Add Partner</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {loading ? (
            <div className="col-span-3 text-center py-10 text-slate-400 text-xs">Loading partners...</div>
          ) : partners.length === 0 ? (
            <div className="col-span-3 text-center py-12 bg-white rounded-xl border border-slate-200 p-8">
              <span className="material-symbols-outlined text-4xl text-slate-300">handshake</span>
              <p className="text-sm font-semibold text-slate-700 mt-2">No partners added yet.</p>
              <p className="text-xs text-slate-400 mt-1">
                Per strict organisational policy, only real verified partner records entered by admin appear here.
              </p>
              <button
                onClick={openCreateModal}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg"
              >
                Add Partner
              </button>
            </div>
          ) : (
            partners.map((partner) => (
              <div key={partner._id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {partner.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Order: {partner.sortOrder}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mt-3">{partner.name}</h3>
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline block mt-0.5 font-mono"
                    >
                      {partner.website}
                    </a>
                  )}
                  {partner.description && (
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">{partner.description}</p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end space-x-2">
                  <button
                    onClick={() => openEditModal(partner)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(partner._id, partner.name)}
                    className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded text-xs font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  {editingItem ? 'Edit Partner' : 'Add Partner'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Organization / Partner Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    <label className="block font-semibold text-slate-700 mb-1">Sort Order</label>
                    <input
                      type="number"
                      value={formData.sortOrder}
                      onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Website URL</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Partnership Scope / Description</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
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
                    {saving ? 'Saving...' : 'Save Partner'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
