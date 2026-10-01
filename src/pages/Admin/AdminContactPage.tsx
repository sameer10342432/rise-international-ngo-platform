import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { adminService } from '../../services/adminService';

export const AdminContactPage: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  const loadMessages = async () => {
    setLoading(true);
    try {
      const res = await adminService.getContactMessages({ search, status });
      setMessages(res.data || []);
    } catch (err: any) {
      alert(err.message || 'Failed to load contact messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [search, status]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await adminService.updateContactStatus(id, newStatus, adminNotes);
      await loadMessages();
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage({ ...selectedMessage, status: newStatus, adminNotes });
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  const handleDelete = async (id: string, subject: string) => {
    if (!confirm(`Delete message "${subject}"?`)) return;
    try {
      await adminService.deleteContactMessage(id);
      await loadMessages();
      if (selectedMessage && selectedMessage._id === id) setSelectedMessage(null);
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
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">Contact Inquiries Inbox</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Field inquiries, partnership requests, and public correspondence.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Total Inquiries: <span className="font-bold text-slate-900">{messages.length}</span>
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
              placeholder="Search by sender name, email, or subject..."
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
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="spam">Spam</option>
          </select>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-5 py-3.5 text-left">Sender</th>
                  <th className="px-4 py-3.5 text-left">Subject</th>
                  <th className="px-4 py-3.5 text-left">Status</th>
                  <th className="px-4 py-3.5 text-left">Received</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">Loading inquiries...</td>
                  </tr>
                ) : messages.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">No contact inquiries found.</td>
                  </tr>
                ) : (
                  messages.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-slate-900">{item.name}</div>
                        <div className="text-[11px] text-slate-500">{item.email}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-medium text-slate-900 line-clamp-1">{item.subject}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.message}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            item.status === 'resolved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.status === 'in_progress'
                              ? 'bg-blue-100 text-blue-800'
                              : item.status === 'spam'
                              ? 'bg-slate-100 text-slate-600'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{formatDate(item.createdAt)}</td>
                      <td className="px-5 py-3.5 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setSelectedMessage(item);
                            setAdminNotes(item.adminNotes || '');
                          }}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
                        >
                          Read
                        </button>
                        <button
                          onClick={() => handleDelete(item._id, item.subject)}
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

        {/* Message Reader Modal */}
        {selectedMessage && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 font-serif">Inquiry Details</h3>
                <button onClick={() => setSelectedMessage(null)} className="text-slate-400">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">From:</span>
                  <span className="font-semibold text-slate-900">
                    {selectedMessage.name} &lt;{selectedMessage.email}&gt;
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Subject:</span>
                  <span className="font-semibold text-slate-900">{selectedMessage.subject}</span>
                </div>

                <div className="py-2">
                  <span className="text-slate-500 block mb-1">Message Body:</span>
                  <p className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 whitespace-pre-line leading-relaxed">
                    {selectedMessage.message}
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
                    placeholder="e.g. Forwarded to East Africa regional desk for followup..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="space-x-1">
                  <button
                    onClick={() => handleUpdateStatus(selectedMessage._id, 'resolved')}
                    className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold"
                  >
                    Mark Resolved
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedMessage._id, 'in_progress')}
                    className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold"
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedMessage._id, 'spam')}
                    className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-medium"
                  >
                    Spam
                  </button>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
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
