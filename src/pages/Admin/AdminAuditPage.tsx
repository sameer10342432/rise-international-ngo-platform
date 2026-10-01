import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { adminService } from '../../services/adminService';

export const AdminAuditPage: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService
      .getAuditLogs(1, 50)
      .then((res) => setLogs(res.data || []))
      .catch((err) => alert(err.message || 'Failed to load audit trail'))
      .finally(() => setLoading(false));
  }, []);

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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">Security Audit Trail</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Immutable system logs documenting administrative access, content changes, and security events.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-5 py-3.5 text-left">Action</th>
                  <th className="px-4 py-3.5 text-left">Resource</th>
                  <th className="px-4 py-3.5 text-left">Operator Email</th>
                  <th className="px-4 py-3.5 text-left">IP Address</th>
                  <th className="px-5 py-3.5 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400 font-sans">
                      Loading audit trail...
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400 font-sans">
                      No audit events recorded yet.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3 text-slate-900 font-bold">{log.action}</td>
                      <td className="px-4 py-3 text-emerald-700">{log.resource}</td>
                      <td className="px-4 py-3 text-slate-700 font-sans">{log.adminEmail}</td>
                      <td className="px-4 py-3 text-slate-500">{log.ipAddress || '—'}</td>
                      <td className="px-5 py-3 text-right text-slate-500 font-sans">
                        {formatDate(log.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
