import { Outlet, NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Camera,
  BarChart3,
  FileText,
  BookOpen,
  Zap,
  FolderOpen,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore, ServiceLineMode } from '@/store';

const allNavigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, modes: ['Full', 'OR'] },
  { name: 'Projects', href: '/projects', icon: FolderOpen, modes: ['Full', 'Audit', 'OR', 'Construction'] },
  { name: 'All Assets', href: '/assets', icon: Camera, modes: ['Full', 'Audit', 'Construction'] },
  { name: 'Benchmarking', href: '/benchmarking', icon: BarChart3, modes: ['Full', 'Audit', 'OR'] },
  { name: 'Reports', href: '/reporting', icon: FileText, modes: ['Full', 'Audit', 'OR', 'Construction'] },
  { name: 'Knowledge Base', href: '/knowledge', icon: BookOpen, modes: ['Full', 'Audit'] },
  { name: 'Tasks & Workflow', href: '/workflows', icon: Zap, modes: ['Full', 'Audit', 'OR', 'Construction'] },
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
    <div className="flex h-screen bg-[#0B0E13] text-[#B8BDD0]">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r border-[#1C2030] bg-[#12151C] flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-[#1C2030]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-900/30"
              style={{ transition: 'box-shadow 0.2s ease' }}>
              <span className="text-white font-bold text-sm">2KB</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-white tracking-tight leading-tight">Intelligence</span>
              <span
                className={cn(
                  "text-[10px] font-medium uppercase tracking-wider transition-all duration-200",
                  mode !== 'Full' ? "text-emerald-500 opacity-100" : "text-neutral-600 opacity-60"
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
              end={item.href === '/'}
              className={({ isActive }) =>
                cn(
                  'nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 active'
                    : 'text-neutral-400 hover:bg-[#1C2030] hover:text-white'
                )
              }
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-[#1C2030]">
          <div className="flex items-center gap-3 px-1">
            <div className="w-8 h-8 rounded-full bg-emerald-600/20 border border-emerald-600/30 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-emerald-400">ME</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-white truncate">Martin Engineer</span>
              <span className="text-xs text-neutral-500 truncate">martin@2kb.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0B0E13]">
        {/* Top Bar — Service Line Toggle */}
        <header className="h-16 flex-shrink-0 border-b border-[#1C2030] bg-[#12151C] flex items-center justify-between px-8">
          <div className="flex items-center gap-1.5 bg-[#0E1118] p-1 rounded-xl border border-[#1C2030]">
            <Layers className="w-3.5 h-3.5 text-neutral-500 ml-1.5" />
            {(['Full', 'Audit', 'OR', 'Construction'] as ServiceLineMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "mode-pill px-3 py-1.5 text-xs font-medium rounded-lg",
                  mode === m
                    ? "active bg-[#1C2030] text-white shadow-sm"
                    : "text-neutral-500 hover:text-neutral-300 hover:bg-[#1C2030]/60"
                )}
              >
                {modeLabels[m]}
              </button>
            ))}
          </div>

          {/* Right side — notification dot placeholder */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-badge-pulse" title="System online" />
            <span className="text-xs text-neutral-500">2KB Intelligence v2.1</span>
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
