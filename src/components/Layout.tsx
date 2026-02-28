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
  CalendarRange
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore, ServiceLineMode } from '@/store';

const allNavigation = [
  { name: 'Dashboard', href: '/app', icon: LayoutDashboard, modes: ['Full', 'OR'], badgeKey: null as string | null },
  { name: 'Projects', href: '/app/projects', icon: FolderOpen, modes: ['Full', 'Audit', 'OR', 'Construction'], badgeKey: 'projects' },
  { name: 'All Assets', href: '/app/assets', icon: Camera, modes: ['Full', 'Audit', 'Construction'], badgeKey: 'assets' },
  { name: 'Benchmarking', href: '/app/benchmarking', icon: BarChart3, modes: ['Full', 'Audit', 'OR'], badgeKey: null },
  { name: 'Reports', href: '/app/reporting', icon: FileText, modes: ['Full', 'Audit', 'OR', 'Construction'], badgeKey: 'reports' },
  { name: 'Knowledge Base', href: '/app/knowledge', icon: BookOpen, modes: ['Full', 'Audit'], badgeKey: null },
  { name: 'Schedule', href: '/app/timeline', icon: CalendarRange, modes: ['Full', 'Audit', 'Construction'], badgeKey: null },
  { name: 'Tasks & Workflow', href: '/app/workflows', icon: Zap, modes: ['Full', 'Audit', 'OR', 'Construction'], badgeKey: 'tasks' },
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
  const projects = useStore(state => state.projects);
  const assets = useStore(state => state.assets);
  const reports = useStore(state => state.reports);
  const tasks = useStore(state => state.tasks);
  const milestones = useStore(state => state.milestones);
  const contractObligations = useStore(state => state.contractObligations);

  const navigation = allNavigation.filter(item => item.modes.includes(mode));

  // Badge counts
  const badgeCounts: Record<string, number> = {
    projects: projects.length,
    assets: assets.length,
    reports: reports.length,
    tasks: tasks.length,
  };

  // Attention indicators — red dot if overdue/critical items exist
  const hasOverdueReports = reports.some(r => r.status === 'In Review' || r.status === 'Draft');
  const hasOverdueTasks = tasks.some(t => t.status === 'To Do' || t.priority === 'High');
  const hasOverdueMilestones = milestones.some(m => m.status === 'overdue');
  const hasOverdueObligations = contractObligations.some(c => c.status === 'Overdue');

  const attentionKeys: Record<string, boolean> = {
    reports: hasOverdueReports,
    tasks: hasOverdueTasks,
    projects: hasOverdueMilestones || hasOverdueObligations,
  };

  return (
    <div className="flex h-screen bg-[#0B1120] text-[#CBD2DF]">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r border-[#1E2A45] bg-[#080D1A] flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-[#1E2A45]">
          <div className="flex items-center gap-3">
            <img src="/logo.webp" alt="2KB Energy" className="w-10 h-10 object-contain" />
            <div className="flex flex-col">
              <span className="font-semibold text-white tracking-tight leading-tight text-[15px]">Intelligence</span>
              <span
                className={cn(
                  "text-[10px] font-medium uppercase tracking-wider transition-all duration-200",
                  mode !== 'Full' ? "text-emerald-400 opacity-100" : "text-[#7A8BA8] opacity-100"
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
                  'nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium relative',
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 active'
                    : 'text-[#7A8BA8] hover:bg-[#121C35] hover:text-white'
                )
              }
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{item.name}</span>
              {/* Badge count */}
              {item.badgeKey && badgeCounts[item.badgeKey] != null && (
                <span className="text-[10px] font-medium text-[#5A6B88] tabular-nums">
                  {badgeCounts[item.badgeKey]}
                </span>
              )}
              {/* Attention dot */}
              {item.badgeKey && attentionKeys[item.badgeKey] && (
                <span className="absolute top-2 left-7 w-1.5 h-1.5 rounded-full bg-red-500" />
              )}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-[#1E2A45]">
          <div className="flex items-center gap-3 px-1">
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-emerald-400">MF</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-white truncate">Martin Francis</span>
              <span className="text-[11px] text-[#5A6B88] truncate">Principal • {modeLabels[mode]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0B1120]">
        {/* Top Bar — Service Line Toggle */}
        <header className="h-14 flex-shrink-0 border-b border-[#1E2A45] bg-[#080D1A] flex items-center justify-between px-8">
          <div className="flex items-center gap-1.5 bg-[#0B1120] p-1 rounded-xl border border-[#1E2A45]">
            <Layers className="w-3.5 h-3.5 text-[#5A6B88] ml-1.5" />
            {(['Full', 'Audit', 'OR', 'Construction'] as ServiceLineMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "mode-pill px-3 py-1.5 text-xs font-medium rounded-lg",
                  mode === m
                    ? "active bg-[#121C35] text-white shadow-sm"
                    : "text-[#5A6B88] hover:text-[#CBD2DF] hover:bg-[#121C35]/50"
                )}
              >
                {modeLabels[m]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-badge-pulse" title="System online" />
            <span className="text-xs text-[#5A6B88]">2KB Intelligence v2.1</span>
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
