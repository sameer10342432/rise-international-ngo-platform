import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  getStoredToken,
  getStoredAdmin,
  clearAdminSession,
  AdminUser,
  adminService,
} from '../../services/adminService';

import { SEO } from '../common/SEO';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [admin, setAdmin] = useState<AdminUser | null>(getStoredAdmin());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }

    // Refresh profile in background to ensure session is active
    adminService
      .getMe()
      .then((user) => setAdmin(user))
      .catch(() => {
        clearAdminSession();
        navigate('/admin/login', { replace: true });
      });
  }, [navigate]);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await adminService.logout();
    } catch {
      clearAdminSession();
    } finally {
      navigate('/admin/login', { replace: true });
    }
  };

  type NavItem = { label: string; path: string; icon: string; roles?: string[] };
  type NavSection =
    | { label: string; path: string; icon: string; items?: never; group?: never }
    | { group: string; items: NavItem[]; label?: never; path?: never; icon?: never };

  const navItems: NavSection[] = [
    { label: 'Dashboard', path: '/admin', icon: 'dashboard' },

    {
      group: 'Content Management',
      items: [
        { label: 'Programmes', path: '/admin/programmes', icon: 'school' },
        { label: 'Field Stories', path: '/admin/stories', icon: 'auto_stories' },
        { label: 'News & Media', path: '/admin/news', icon: 'newspaper' },
        { label: 'Team Members', path: '/admin/team', icon: 'groups' },
        { label: 'Partners', path: '/admin/partners', icon: 'handshake' },
        { label: 'Pages CMS', path: '/admin/pages', icon: 'article' },
      ],
    },
    {
      group: 'Impact & Reports',
      items: [
        { label: 'Impact Statistics', path: '/admin/impact', icon: 'analytics' },
        { label: 'Audit Trail', path: '/admin/audit', icon: 'history', roles: ['super_admin', 'admin'] },
      ],
    },
    {
      group: 'Engagement & Donor Relations',
      items: [
        { label: 'Donations Ledger', path: '/admin/donations', icon: 'payments' },
        { label: 'Volunteers', path: '/admin/volunteers', icon: 'volunteer_activism' },
        { label: 'Contact Messages', path: '/admin/contact', icon: 'mail' },
        { label: 'Newsletter', path: '/admin/newsletter', icon: 'mark_email_read' },
      ],
    },
    {
      group: 'Administration & System',
      items: [
        { label: 'Website Settings & SEO', path: '/admin/settings', icon: 'tune' },
        { label: 'Admin Users', path: '/admin/users', icon: 'manage_accounts', roles: ['super_admin'] },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <SEO title="Admin CMS Portal | RISE International" noindex={true} />
      {/* Top Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <Link to="/admin" className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-wider text-emerald-400 font-serif">RISE</span>
              <span className="text-xs bg-emerald-950 text-emerald-300 font-semibold px-2 py-0.5 rounded border border-emerald-800 uppercase tracking-wider">
                CMS Portal
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>View Live Website</span>
            </Link>

            {admin && (
              <div className="flex items-center space-x-3 border-l border-slate-800 pl-4">
                <div className="hidden sm:block text-right">
                  <div className="text-xs font-semibold text-slate-200">{admin.name}</div>
                  <div className="text-[10px] text-emerald-400 uppercase tracking-wider font-mono">
                    {admin.role.replace('_', ' ')}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  title="Sign out of Admin Portal"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors flex items-center space-x-1 text-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Backdrop on Mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/60 z-20 md:hidden"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed md:static inset-y-16 left-0 z-30 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 text-sm">
            {navItems.map((section, idx) => {
              if ('items' in section && Array.isArray(section.items)) {
                const visibleSubItems = section.items.filter((item) => {
                  if (!item.roles) return true;
                  return admin && item.roles.includes(admin.role);
                });


                if (visibleSubItems.length === 0) return null;

                return (
                  <div key={idx} className="space-y-1">
                    <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {section.group}
                    </div>
                    {visibleSubItems.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                            isActive
                              ? 'bg-emerald-500/10 text-emerald-400 font-semibold border-l-2 border-emerald-500'
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                          <span>{item.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                );
              }

              const path = section.path || '/admin';
              const isActive = location.pathname === path;
              return (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 font-semibold border-l-2 border-emerald-500'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{section.icon || 'dashboard'}</span>
                  <span>{section.label || 'Link'}</span>
                </NavLink>
              );

            })}
          </div>

          <div className="p-3 border-t border-slate-800 text-[11px] text-slate-300 text-center">
            RISE Admin v1.0.0 &bull; Secure API
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};
