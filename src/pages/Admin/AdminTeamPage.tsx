import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { adminService } from '../../services/adminService';

export const AdminTeamPage: React.FC = () => {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: 'Operations',
    bio: '',
    photo: '/images/african-doctor-examining-child.png',
    email: '',
    sortOrder: 1,
    isVisible: true,
  });

  const loadTeam = async () => {
    setLoading(true);
    try {
      const data = await adminService.getTeam();
      setTeam(data || []);
    } catch (err: any) {
      alert(err.message || 'Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      position: '',
      department: 'Operations',
      bio: '',
      photo: '/images/african-doctor-examining-child.png',
      email: '',
      sortOrder: team.length + 1,
      isVisible: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      position: item.position,
      department: item.department || 'Operations',
      bio: item.bio || '',
      photo: item.photo || '/images/african-doctor-examining-child.png',
      email: item.email || '',
      sortOrder: item.sortOrder || 1,
      isVisible: item.isVisible ?? true,
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await adminService.uploadImage(file);
      setFormData((prev) => ({ ...prev, photo: res.url }));
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingItem) {
        await adminService.updateTeamMember(editingItem._id, formData);
      } else {
        await adminService.createTeamMember(formData);
      }
      setIsModalOpen(false);
      await loadTeam();
    } catch (err: any) {
      alert(err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete team profile for "${name}"?`)) return;
    try {
      await adminService.deleteTeamMember(id);
      await loadTeam();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">Team Directory CMS</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Add and manage authorized organizational leadership and field personnel.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-base">person_add</span>
            <span>Add Team Member</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {loading ? (
            <div className="col-span-3 text-center py-10 text-slate-400 text-xs">Loading team profiles...</div>
          ) : team.length === 0 ? (
            <div className="col-span-3 text-center py-12 bg-white rounded-xl border border-slate-200 p-8">
              <span className="material-symbols-outlined text-4xl text-slate-300">group_off</span>
              <p className="text-sm font-semibold text-slate-700 mt-2">No team profiles added yet.</p>
              <p className="text-xs text-slate-400 mt-1">
                Per strict organisational policy, only admin-authorized team member records will appear publicly.
              </p>
              <button
                onClick={openCreateModal}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg"
              >
                Add First Team Member
              </button>
            </div>
          ) : (
            team.map((member) => (
              <div key={member._id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-5 flex flex-col justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={member.photo}
                    alt=""
                    className="w-14 h-14 rounded-full object-cover border border-slate-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/african-doctor-examining-child.png';
                    }}
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{member.name}</h3>
                    <div className="text-xs text-emerald-700 font-medium">{member.position}</div>
                    <div className="text-[11px] text-slate-400">{member.department}</div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-3">{member.bio}</p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-mono">Order: {member.sortOrder}</span>
                  <div className="space-x-2">
                    <button
                      onClick={() => openEditModal(member)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member._id, member.name)}
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
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  {editingItem ? 'Edit Team Profile' : 'Add Team Member'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
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
                    <label className="block font-semibold text-slate-700 mb-1">Role / Position</label>
                    <input
                      type="text"
                      required
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Department</label>
                    <input
                      type="text"
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Headshot Photo</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={formData.photo}
                      onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono text-[11px]"
                    />
                    <label className="cursor-pointer px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium">
                      <span>{uploading ? '...' : 'Upload'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Professional Bio</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
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
                    {saving ? 'Saving...' : 'Save Profile'}
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
