import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { adminService } from '../../services/adminService';

export const AdminDonationsPage: React.FC = () => {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [frequency, setFrequency] = useState('');
  const [selectedDonation, setSelectedDonation] = useState<any | null>(null);

  const loadDonations = async () => {
    setLoading(true);
    try {
      const res = await adminService.getDonations({ search, status });
      setDonations(res.data || []);
    } catch (err: any) {
      alert(err.message || 'Failed to load donations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDonations();
  }, [search, status]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await adminService.updateDonationStatus(id, newStatus);
      await loadDonations();
      if (selectedDonation && selectedDonation._id === id) {
        setSelectedDonation({ ...selectedDonation, status: newStatus });
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  const formatCurrency = (amount: number, curr = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr,
    }).format(amount);
  };

  const formatDate = (iso?: string) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filtered = donations.filter((d) => {
    if (frequency && d.frequency !== frequency) return false;
    return true;
  });

  const totalAmount = filtered
    .filter((d) => d.status === 'completed')
    .reduce((sum, d) => sum + (d.amount || 0), 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">Contributions Ledger</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Verify donor transactions, receipt dispatches, and allocation purposes.
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-lg text-right">
            <div className="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider">
              Settled Total
            </div>
            <div className="text-lg font-bold text-emerald-950 font-serif">{formatCurrency(totalAmount)}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Search donor name, email, or transaction ID..."
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
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="refunded">Refunded</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white"
          >
            <option value="">All Frequencies</option>
            <option value="one_time">One-time Gift</option>
            <option value="monthly">Monthly Recurring</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-5 py-3.5 text-left">Donor / Transaction</th>
                  <th className="px-4 py-3.5 text-left">Amount</th>
                  <th className="px-4 py-3.5 text-left">Frequency</th>
                  <th className="px-4 py-3.5 text-left">Designation</th>
                  <th className="px-4 py-3.5 text-left">Status</th>
                  <th className="px-4 py-3.5 text-left">Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">Loading donations...</td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">No donations found.</td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-slate-900">{item.donorName}</div>
                        <div className="text-[11px] text-slate-500">{item.email}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.transactionId}</div>
                      </td>
                      <td className="px-4 py-3.5 font-bold text-slate-900">
                        {formatCurrency(item.amount, item.currency)}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 capitalize">
                        {item.frequency === 'monthly' ? (
                          <span className="inline-flex items-center text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-medium">
                            Monthly
                          </span>
                        ) : (
                          'One-time'
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 capitalize">
                        {item.purpose ? item.purpose.replace(/_/g, ' ') : 'Where Needed'}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            item.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : item.status === 'refunded'
                              ? 'bg-slate-100 text-slate-700'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 text-[11px] whitespace-nowrap">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="px-5 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedDonation(item)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
                        >
                          Details
                        </button>
                        {item.status === 'completed' && (
                          <button
                            onClick={() => handleStatusChange(item._id, 'refunded')}
                            className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded text-[10px] font-medium"
                          >
                            Refund
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Donation Details Modal */}
        {selectedDonation && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 font-serif">Donation Receipt Record</h3>
                <button onClick={() => setSelectedDonation(null)} className="text-slate-400">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-mono text-slate-900 font-semibold">{selectedDonation.transactionId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Donor Name:</span>
                  <span className="font-semibold text-slate-900">{selectedDonation.donorName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Email Address:</span>
                  <span className="text-slate-900">{selectedDonation.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Amount & Currency:</span>
                  <span className="font-bold text-slate-900">
                    {formatCurrency(selectedDonation.amount, selectedDonation.currency)}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Payment Schedule:</span>
                  <span className="capitalize text-slate-900">{selectedDonation.frequency}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Designation Purpose:</span>
                  <span className="capitalize text-slate-900">
                    {selectedDonation.purpose ? selectedDonation.purpose.replace(/_/g, ' ') : 'General Fund'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Payment Processor:</span>
                  <span className="font-mono text-slate-600">{selectedDonation.paymentProvider || 'Stripe'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-bold uppercase text-emerald-700">{selectedDonation.status}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Timestamp:</span>
                  <span className="text-slate-900">{formatDate(selectedDonation.createdAt)}</span>
                </div>

                {selectedDonation.donorNotes && (
                  <div className="pt-2">
                    <span className="text-slate-500 block mb-1">Donor Note:</span>
                    <p className="p-2 bg-slate-50 rounded border border-slate-200 text-slate-700 italic">
                      "{selectedDonation.donorNotes}"
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
                >
                  Close Receipt
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
