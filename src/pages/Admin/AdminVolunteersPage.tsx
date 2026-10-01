import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { adminService } from '../../services/adminService';

export const AdminVolunteersPage: React.FC = () => {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  const loadVolunteers = async () => {
    setLoading(true);
    try {
      const res = await adminService.getVolunteers({ search, status });
      setVolunteers(res.data || []);
    } catch (err: any) {
      alert(err.message || 'Failed to load volunteers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVolunteers();
  }, [search, status]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await adminService.updateVolunteerStatus(id, newStatus, adminNotes);
      await loadVolunteers();
      if (selectedApp && selectedApp._id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus, adminNotes });
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete application from "${name}"?`)) return;
    try {
      await adminService.deleteVolunteer(id);
      await loadVolunteers();
      if (selectedApp && selectedApp._id === id) setSelectedApp(null);
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  const formatDate = (iso?: string) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">Volunteer Applications</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Review skills, field availability, and coordinate global volunteer deployments.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Total Candidates: <span className="font-bold text-slate-900">{volunteers.length}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Search by candidate name, email, or country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="reviewing">Reviewing</option>
            <option value="accepted">Accepted</option>
            <option value="contacted">Contacted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-5 py-3.5 text-left">Applicant</th>
                  <th className="px-4 py-3.5 text-left">Country</th>
                  <th className="px-4 py-3.5 text-left">Area of Interest</th>
                  <th className="px-4 py-3.5 text-left">Status</th>
                  <th className="px-4 py-3.5 text-left">Submitted</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400">Loading applicants...</td>
                  </tr>
                ) : volunteers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400">No volunteer applications found.</td>
                  </tr>
                ) : (
                  volunteers.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-slate-900">{item.fullName}</div>
                        <div className="text-[11px] text-slate-500">{item.email}</div>
                        {item.phone && <div className="text-[10px] text-slate-400">{item.phone}</div>}
                      </td>
                      <td className="px-4 py-3.5 text-slate-700 font-medium">{item.country}</td>
                      <td className="px-4 py-3.5 text-slate-600">{item.areaOfInterest}</td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            item.status === 'accepted'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.status === 'reviewing'
                              ? 'bg-blue-100 text-blue-800'
                              : item.status === 'contacted'
                              ? 'bg-purple-100 text-purple-800'
                              : item.status === 'rejected'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-500">{formatDate(item.createdAt)}</td>
                      <td className="px-5 py-3.5 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSelectedApp(item);
                            setAdminNotes(item.adminNotes || '');
                          }}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
                        >
                          Review
                        </button>
                        <button
                          onClick={() => handleDelete(item._id, item.fullName)}
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
        {selectedApp && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 font-serif">Volunteer Application Review</h3>
                <button onClick={() => setSelectedApp(null)} className="text-slate-400">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 py-1 border-b border-slate-100">
                  <div>
                    <span className="text-slate-500 block">Candidate:</span>
                    <span className="font-semibold text-slate-900">{selectedApp.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Country:</span>
                    <span className="font-semibold text-slate-900">{selectedApp.country}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 py-1 border-b border-slate-100">
                  <div>
                    <span className="text-slate-500 block">Email:</span>
                    <span className="text-slate-900">{selectedApp.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Phone:</span>
                    <span className="text-slate-900">{selectedApp.phone || 'N/A'}</span>
                  </div>
                </div>

                <div className="py-1 border-b border-slate-100">
                  <span className="text-slate-500 block">Program Interest:</span>
                  <span className="font-medium text-slate-900">{selectedApp.areaOfInterest}</span>
                </div>

                <div className="py-1 border-b border-slate-100">
                  <span className="text-slate-500 block">Availability:</span>
                  <span className="text-slate-900">{selectedApp.availability}</span>
                </div>

                <div className="py-1">
                  <span className="text-slate-500 block mb-1">Personal Statement / Experience:</span>
                  <p className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 whitespace-pre-line">
                    {selectedApp.message}
                  </p>
                </div>

                <div className="pt-2">
                  <label className="block text-slate-700 font-semibold mb-1">
                    Internal Staff Notes:
                  </label>
                  <textarea
                    rows={2}
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="e.g. Scheduled introductory interview for next Tuesday..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="space-x-1">
                  <button
                    onClick={() => handleUpdateStatus(selectedApp._id, 'accepted')}
                    className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedApp._id, 'reviewing')}
                    className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold"
                  >
                    Mark Reviewing
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedApp._id, 'contacted')}
                    className="px-2.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded text-xs font-semibold"
                  >
                    Contacted
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedApp._id, 'rejected')}
                    className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-medium"
                  >
                    Decline
                  </button>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-3 py-1.5 text-slate-500 hover:text-slate-700 text-xs font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
