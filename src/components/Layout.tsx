import { Outlet, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Camera, 
  BarChart3, 
  Calculator, 
  ShieldCheck, 
  HardHat, 
  LineChart, 
  FileText, 
  BookOpen, 
  Zap,
  FolderOpen
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

export function Layout() {
  const mode = useStore(state => state.serviceLineMode);
  const setMode = useStore(state => state.setServiceLineMode);

  const navigation = allNavigation.filter(item => item.modes.includes(mode));

  return (
    <div className="flex h-screen bg-[#0B0E13] text-[#B8BDD0]">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r border-[#1C2030] bg-[#12151C] flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-[#1C2030]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">2KB</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-white tracking-tight leading-tight">Intelligence</span>
              {mode !== 'Full' && (
                <span className="text-[10px] text-emerald-500 font-medium uppercase tracking-wider">{mode} Mode</span>
              )}
            </div>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-500'
                    : 'text-neutral-400 hover:bg-[#1C2030] hover:text-white'
                )
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-[#1C2030]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1C2030] flex items-center justify-center">
              <span className="text-xs font-medium text-neutral-400">ME</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Martin Engineer</span>
              <span className="text-xs text-neutral-500">martin@2kb.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0B0E13]">
        {/* Top Bar for Service Line Toggle */}
        <header className="h-16 flex-shrink-0 border-b border-[#1C2030] bg-[#12151C] flex items-center justify-between px-8">
          <div className="flex items-center gap-2 bg-[#0E1118] p-1 rounded-lg border border-[#1C2030]">
            {(['Full', 'Audit', 'OR', 'Construction'] as ServiceLineMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                  mode === m 
                    ? "bg-[#1C2030] text-white shadow-sm" 
                    : "text-neutral-500 hover:text-neutral-300 hover:bg-[#1C2030]/50"
                )}
              >
                {m === 'Full' ? 'Full Platform' : m === 'Audit' ? 'Energy Audit' : m === 'OR' ? "Owner's Rep" : 'Construction Mgt'}
              </button>
            ))}
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
