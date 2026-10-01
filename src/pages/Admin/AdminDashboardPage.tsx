import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { adminService, getStoredAdmin } from '../../services/adminService';

export const AdminDashboardPage: React.FC = () => {
  const admin = getStoredAdmin();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminService
      .getDashboard()
      .then((res) => setData(res))
      .catch((err) => setError(err.message || 'Failed to load dashboard metrics.'))
      .finally(() => setLoading(false));
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return '—';
    return new Date(isoString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-serif">
              Administrative Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Welcome back, <span className="font-semibold text-slate-700">{admin?.name || 'Administrator'}</span>.
              Here is your organisation's current operational status.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/admin/programmes"
              className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>New Programme</span>
            </Link>
            <Link
              to="/admin/news"
              className="inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">post_add</span>
              <span>Publish News</span>
            </Link>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center space-x-2">
            <span className="material-symbols-outlined">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Total Donations */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Contributions
              </span>
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">payments</span>
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-slate-900 font-serif">
              {loading ? '...' : formatCurrency(data?.counts?.totalDonationAmount || 0)}
            </div>
            <div className="mt-1 flex items-center text-xs text-slate-500 space-x-1">
              <span className="text-emerald-600 font-medium font-mono">
                {loading ? '0' : data?.counts?.completedDonationCount || 0}
              </span>
              <span>completed records</span>
            </div>
          </div>

          {/* Volunteer Applications */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Volunteers
              </span>
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">volunteer_activism</span>
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-slate-900 font-serif">
              {loading ? '...' : data?.counts?.volunteers || 0}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              <Link to="/admin/volunteers" className="text-blue-600 hover:underline">
                Review submitted profiles &rarr;
              </Link>
            </div>
          </div>

          {/* Contact Inquiries */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Field Inquiries
              </span>
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">mail</span>
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-slate-900 font-serif">
              {loading ? '...' : data?.counts?.messages || 0}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              <Link to="/admin/contact" className="text-amber-700 hover:underline">
                View incoming messages &rarr;
              </Link>
            </div>
          </div>

          {/* Newsletter Subscribers */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Subscribers
              </span>
              <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">mark_email_read</span>
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-slate-900 font-serif">
              {loading ? '...' : data?.counts?.subscribers || 0}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              <Link to="/admin/newsletter" className="text-purple-600 hover:underline">
                Manage email dispatches &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Content Pillars Quick Count */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center space-x-3">
            <span className="material-symbols-outlined text-emerald-600 text-2xl">school</span>
            <div>
              <div className="text-lg font-bold text-slate-900">{loading ? '...' : data?.counts?.programmes || 0}</div>
              <div className="text-[11px] text-slate-500 font-medium">Core Programmes</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center space-x-3">
            <span className="material-symbols-outlined text-blue-600 text-2xl">analytics</span>
            <div>
              <div className="text-lg font-bold text-slate-900">{loading ? '...' : data?.counts?.impactStats || 0}</div>
              <div className="text-[11px] text-slate-500 font-medium">Impact Statistics</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center space-x-3">
            <span className="material-symbols-outlined text-amber-600 text-2xl">auto_stories</span>
            <div>
              <div className="text-lg font-bold text-slate-900">{loading ? '...' : data?.counts?.stories || 0}</div>
              <div className="text-[11px] text-slate-500 font-medium">Field Stories</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center space-x-3">
            <span className="material-symbols-outlined text-indigo-600 text-2xl">newspaper</span>
            <div>
              <div className="text-lg font-bold text-slate-900">{loading ? '...' : data?.counts?.news || 0}</div>
              <div className="text-[11px] text-slate-500 font-medium">News Articles</div>
            </div>
          </div>
        </div>

        {/* Recent Submissions & Activity Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Contact Messages */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <span className="material-symbols-outlined text-slate-400 text-base">mail</span>
                <span>Recent Inquiries</span>
              </h2>
              <Link to="/admin/contact" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                View all
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {loading ? (
                <div className="p-6 text-center text-xs text-slate-400">Loading inquiries...</div>
              ) : !data?.recent?.messages?.length ? (
                <div className="p-6 text-center text-xs text-slate-400">No recent messages recorded.</div>
              ) : (
                data.recent.messages.map((msg: any) => (
                  <div key={msg._id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-900">{msg.name}</span>
                      <span className="text-[10px] text-slate-400">{formatDate(msg.createdAt)}</span>
                    </div>
                    <div className="text-xs font-medium text-slate-700 mt-0.5 line-clamp-1">{msg.subject}</div>
                    <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">{msg.message}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Volunteer Applications */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <span className="material-symbols-outlined text-slate-400 text-base">volunteer_activism</span>
                <span>Recent Volunteer Applicants</span>
              </h2>
              <Link to="/admin/volunteers" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                View all
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {loading ? (
                <div className="p-6 text-center text-xs text-slate-400">Loading applicants...</div>
              ) : !data?.recent?.volunteers?.length ? (
                <div className="p-6 text-center text-xs text-slate-400">No recent volunteer applications.</div>
              ) : (
                data.recent.volunteers.map((vol: any) => (
                  <div key={vol._id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-900">{vol.fullName}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                        {vol.country}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      <span className="font-medium text-slate-800">Interest:</span> {vol.areaOfInterest}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">Applied: {formatDate(vol.createdAt)}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Audit Log Stream */}
        {data?.recent?.auditLogs && data.recent.auditLogs.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <span className="material-symbols-outlined text-slate-400 text-base">history</span>
              <span>Recent System Audit Actions</span>
            </h2>
            <div className="space-y-2 text-xs">
              {data.recent.auditLogs.map((log: any) => (
                <div
                  key={log._id}
                  className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                >
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-mono text-[10px]">
                      {log.action}
                    </span>
                    <span className="text-slate-600">
                      by <span className="font-semibold text-slate-800">{log.adminEmail}</span>
                    </span>
                  </div>
                  <span className="text-slate-400 text-[11px]">{formatDate(log.createdAt)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
