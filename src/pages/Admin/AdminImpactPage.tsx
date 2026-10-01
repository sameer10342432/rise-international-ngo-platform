import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { adminService } from '../../services/adminService';

export const AdminImpactPage: React.FC = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    label: '',
    value: '',
    numericValue: 0,
    suffix: '+',
    description: '',
    icon: 'public',
    colour: '#1e3a5f',
    sortOrder: 1,
    isVisible: true,
  });

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await adminService.getImpactStats();
      setStats(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load impact stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      label: '',
      value: '',
      numericValue: 0,
      suffix: '+',
      description: '',
      icon: 'public',
      colour: '#1e3a5f',
      sortOrder: stats.length + 1,
      isVisible: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setFormData({
      label: item.label,
      value: item.value,
      numericValue: item.numericValue || 0,
      suffix: item.suffix || '+',
      description: item.description || '',
      icon: item.icon || 'public',
      colour: item.colour || '#1e3a5f',
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
        await adminService.updateImpactStat(editingItem._id, formData);
      } else {
        await adminService.createImpactStat(formData);
      }
      setIsModalOpen(false);
      await loadStats();
    } catch (err: any) {
      alert(err.message || 'Failed to save impact stat');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleVisibility = async (item: any) => {
    try {
      await adminService.updateImpactStat(item._id, { isVisible: !item.isVisible });
      await loadStats();
    } catch (err: any) {
      alert(err.message || 'Failed to update visibility');
    }
  };

  const handleDelete = async (id: string, label: string) => {
    if (!confirm(`Delete impact statistic "${label}"?`)) return;
    try {
      await adminService.deleteImpactStat(id);
      await loadStats();
    } catch (err: any) {
      alert(err.message || 'Failed to delete stat');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">Impact Statistics CMS</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Configure organizational reach numbers displayed across the homepage and impact page.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Add Statistic</span>
          </button>
        </div>

        {error && <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-lg">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <div className="col-span-3 text-center py-10 text-slate-400 text-xs">
              Loading statistics...
            </div>
          ) : stats.length === 0 ? (
            <div className="col-span-3 text-center py-10 text-slate-400 text-xs">
              No impact statistics configured.
            </div>
          ) : (
            stats.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: item.colour || '#1e3a5f' }}
                    >
                      <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    </div>
                    <button
                      onClick={() => handleToggleVisibility(item)}
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        item.isVisible
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.isVisible ? 'Visible' : 'Hidden'}
                    </button>
                  </div>

                  <div className="mt-4">
                    <div className="text-2xl font-extrabold text-slate-900 font-serif">
                      {item.value}
                    </div>
                    <div className="text-sm font-semibold text-slate-800 mt-0.5">{item.label}</div>
                    {item.description && (
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2">{item.description}</p>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-mono">Order: {item.sortOrder}</span>
                  <div className="space-x-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id, item.label)}
                      className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  {editingItem ? 'Edit Impact Statistic' : 'Add Impact Statistic'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Statistic Label</label>
                  <input
                    type="text"
                    required
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                    placeholder="e.g. Countries Worldwide"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Display Value</label>
                    <input
                      type="text"
                      required
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                      placeholder="e.g. 25+"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Numeric Counter</label>
                    <input
                      type="number"
                      required
                      value={formData.numericValue}
                      onChange={(e) => setFormData({ ...formData, numericValue: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                      placeholder="e.g. 25"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Material Icon</label>
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono text-[11px]"
                      placeholder="public"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Badge Colour</label>
                    <input
                      type="text"
                      value={formData.colour}
                      onChange={(e) => setFormData({ ...formData, colour: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono text-[11px]"
                      placeholder="#1e3a5f"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Order</label>
                    <input
                      type="number"
                      value={formData.sortOrder}
                      onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contextual Description</label>
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
                    {saving ? 'Saving...' : 'Save Statistic'}
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
