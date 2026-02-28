import { Outlet, NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Camera,
  BarChart3,
  FileText,
  BookOpen,
  Zap,
  FolderOpen,
  Layers,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore, ServiceLineMode } from '@/store';

const allNavigation = [
  { name: 'Dashboard', href: '/app', icon: LayoutDashboard, modes: ['Full', 'OR'] },
  { name: 'Projects', href: '/app/projects', icon: FolderOpen, modes: ['Full', 'Audit', 'OR', 'Construction'] },
  { name: 'All Assets', href: '/app/assets', icon: Camera, modes: ['Full', 'Audit', 'Construction'] },
  { name: 'Benchmarking', href: '/app/benchmarking', icon: BarChart3, modes: ['Full', 'Audit', 'OR'] },
  { name: 'Reports', href: '/app/reporting', icon: FileText, modes: ['Full', 'Audit', 'OR', 'Construction'] },
  { name: 'Knowledge Base', href: '/app/knowledge', icon: BookOpen, modes: ['Full', 'Audit'] },
  { name: 'Timeline', href: '/app/timeline', icon: Calendar, modes: ['Full', 'Audit', 'Construction'] },
  { name: 'Tasks & Workflow', href: '/app/workflows', icon: Zap, modes: ['Full', 'Audit', 'OR', 'Construction'] },
];

const modeLabels: Record<ServiceLineMode, string> = {
  Full: 'Full Platform',
  Audit: 'Energy Audit',
  OR: "Owner's Rep",
  Construction: 'Construction Mgt',
};

export function Layout() {
  const mode = useStore(state => state.serviceLineMode);
  const setMode = useStore(state => state.setServiceLineMode);

  const navigation = allNavigation.filter(item => item.modes.includes(mode));

  return (
    <div className="flex h-screen bg-[#F4F6FA] text-gray-700">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r border-[#EAEDF3] bg-[#FFFFFF] flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-[#EAEDF3]">
          <div className="flex items-center gap-2.5">
            <img src="/logo.webp" alt="2KB Energy" className="w-8 h-8 object-contain" />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 tracking-tight leading-tight">Intelligence</span>
              <span
                className={cn(
                  "text-[10px] font-medium uppercase tracking-wider transition-all duration-200",
                  mode !== 'Full' ? "text-emerald-600 opacity-100" : "text-gray-400 opacity-100"
                )}
              >
                {mode !== 'Full' ? `${mode} Mode` : 'Full Platform'}
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5 stagger-children">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === '/app'}
              className={({ isActive }) =>
                cn(
                  'nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 active'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                )
              }
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-[#EAEDF3]">
          <div className="flex items-center gap-3 px-1">
            <div className="w-8 h-8 rounded-full bg-emerald-600/20 border border-emerald-600/30 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-emerald-600">ME</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-gray-900 truncate">Martin Engineer</span>
              <span className="text-xs text-gray-500 truncate">martin@2kb.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F4F6FA]">
        {/* Top Bar — Service Line Toggle */}
        <header className="h-16 flex-shrink-0 border-b border-[#EAEDF3] bg-[#FFFFFF] flex items-center justify-between px-8">
          <div className="flex items-center gap-1.5 bg-[#F8FAFB] p-1 rounded-xl border border-[#EAEDF3]">
            <Layers className="w-3.5 h-3.5 text-neutral-500 ml-1.5" />
            {(['Full', 'Audit', 'OR', 'Construction'] as ServiceLineMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "mode-pill px-3 py-1.5 text-xs font-medium rounded-lg",
                  mode === m
                    ? "active bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-white/60"
                )}
              >
                {modeLabels[m]}
              </button>
            ))}
          </div>

          {/* Right side — notification dot placeholder */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-badge-pulse" title="System online" />
            <span className="text-xs text-gray-500">2KB Intelligence v2.1</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="animate-page-enter h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
