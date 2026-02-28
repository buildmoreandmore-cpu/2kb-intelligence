import { useState } from 'react';
import { useStore } from '@/store';
import { ShieldCheck, Calendar, FileText, AlertTriangle, GitPullRequest, FileCheck, Plus, Filter } from 'lucide-react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

export function Governance({ projectId }: { projectId?: string }) {
  const projects = useStore(state => state.projects);
  const milestones = useStore(state => state.milestones);
  const risks = useStore(state => state.risks);
  const changeOrders = useStore(state => state.changeOrders);
  const submittals = useStore(state => state.submittals);
  const contractObligations = useStore(state => state.contractObligations);

  const [activeTab, setActiveTab] = useState<'pipeline' | 'milestones' | 'risks' | 'co' | 'submittals' | 'obligations'>('pipeline');
  const [selectedProjectId, setSelectedProjectId] = useState(projectId || projects[0].id);
  const [catFilter, setCatFilter] = useState<string>('All');

  const phases = ['Prospect', 'Audit', 'IGEA', 'RFP', 'Contract', 'Construction', 'M&V', 'Closeout'];

  return (
    <div className="flex flex-col h-full">
      {!projectId && (
        <div className="flex-shrink-0 border-b border-[#1E2A45] bg-[#121C35] px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Owner's Rep Governance</h1>
              <p className="text-sm text-[#7A8BA8] mt-1">Track project phases, milestones, documents, and risks.</p>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="bg-[#1E2A45] border border-[#2A3A5C] text-[#CBD2DF] text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-64 p-2.5"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex space-x-6 border-b border-[#1E2A45]">
            {[
              { id: 'pipeline', label: 'Pipeline', icon: GitPullRequest },
              { id: 'milestones', label: 'Milestones', icon: Calendar },
              { id: 'risks', label: 'Risk Log', icon: AlertTriangle },
              { id: 'co', label: 'Change Orders', icon: FileText },
              { id: 'submittals', label: 'Submittals', icon: FileCheck },
              { id: 'obligations', label: 'Contract Obligations', icon: ShieldCheck },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                "pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                activeTab === tab.id 
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-[#7A8BA8] hover:text-white hover:border-[#2A3A5C]"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full">
        {activeTab === 'pipeline' && (
          <div className="space-y-8">
            <div className="flex gap-4 overflow-x-auto pb-4">
              {phases.map(phase => {
                const phaseProjects = projects.filter(p => p.phase === phase);
                return (
                  <div key={phase} className="flex-shrink-0 w-80 bg-[#121C35] border border-[#1E2A45] rounded-xl flex flex-col h-[calc(100vh-250px)]">
                    <div className="p-4 border-b border-[#1E2A45] flex items-center justify-between bg-[#0F1829] rounded-t-xl">
                      <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{phase}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-[#1E2A45] text-xs font-medium text-[#7A8BA8]">
                        {phaseProjects.length}
                      </span>
                    </div>
                    <div className="p-4 flex-1 overflow-y-auto space-y-3">
                      {phaseProjects.map(project => (
                        <div key={project.id} className="bg-[#1A2544] border border-[#2A3A5C] rounded-lg p-4 hover:border-emerald-500/50 transition-colors cursor-pointer group">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-sm font-medium text-white group-hover:text-emerald-600 transition-colors">{project.name}</h4>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                              project.riskScore > 60 ? 'bg-red-500/20 text-red-500' :
                              project.riskScore > 40 ? 'bg-amber-500/20 text-amber-500' :
                              'bg-emerald-500/20 text-emerald-500'
                            }`}>
                              {project.riskScore}
                            </div>
                          </div>
                          <div className="text-xs text-[#7A8BA8] space-y-1">
                            <p>ESCO: <span className="text-[#9AA5B8]">{project.esco}</span></p>
                            <p>Value: <span className="text-[#9AA5B8] font-mono">${(project.value / 1000000).toFixed(1)}M</span></p>
                            <p>Lead: <span className="text-[#9AA5B8]">{project.engineer}</span></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'milestones' && (
          <div className="bg-[#121C35] border border-[#1E2A45] rounded-xl overflow-hidden">
            <div className="p-6 border-b border-[#1E2A45] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Project Milestones</h3>
              <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-600 border border-transparent rounded-lg text-xs font-medium text-white hover:bg-emerald-700 transition-colors">
                <Plus className="w-3.5 h-3.5" />
                Add Milestone
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-neutral-400 uppercase bg-[#0F1829] border-b border-[#1E2A45]">
                  <tr>
                    <th className="px-6 py-4 font-medium">Milestone</th>
                    <th className="px-6 py-4 font-medium">Due Date</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Assigned To</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E2A45]">
                  {milestones.filter(m => m.projectId === selectedProjectId).map((milestone) => (
                    <tr key={milestone.id} className="hover:bg-[#1A2544] transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{milestone.name}</td>
                      <td className="px-6 py-4 text-[#9AA5B8] font-mono">{milestone.dueDate}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded text-xs font-medium border",
                          milestone.status === 'completed' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                          milestone.status === 'overdue' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                          milestone.status === 'in progress' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                          "bg-[#1E2A45] text-[#7A8BA8] border-[#2A3A5C]"
                        )}>
                          {milestone.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[#9AA5B8]">{milestone.assignedTo}</td>
                    </tr>
                  ))}
                  {milestones.filter(m => m.projectId === selectedProjectId).length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-[#7A8BA8]">No milestones found for this project.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="bg-[#121C35] border border-[#1E2A45] rounded-xl overflow-hidden">
            <div className="p-6 border-b border-[#1E2A45] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Risk Log</h3>
              <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-600 border border-transparent rounded-lg text-xs font-medium text-white hover:bg-emerald-700 transition-colors">
                <Plus className="w-3.5 h-3.5" />
                Log Risk
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-neutral-400 uppercase bg-[#0F1829] border-b border-[#1E2A45]">
                  <tr>
                    <th className="px-6 py-4 font-medium">Description</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Severity</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Owner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E2A45]">
                  {risks.filter(r => r.projectId === selectedProjectId).map((risk) => (
                    <tr key={risk.id} className="hover:bg-[#1A2544] transition-colors">
                      <td className="px-6 py-4 font-medium text-white max-w-md truncate">{risk.description}</td>
                      <td className="px-6 py-4 text-[#9AA5B8]">{risk.category}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded text-xs font-medium border",
                          risk.severity === 'Critical' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                          risk.severity === 'High' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                          risk.severity === 'Medium' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                          "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        )}>
                          {risk.severity.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[#9AA5B8]">{risk.status}</td>
                      <td className="px-6 py-4 text-[#9AA5B8]">{risk.owner}</td>
                    </tr>
                  ))}
                  {risks.filter(r => r.projectId === selectedProjectId).length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-[#7A8BA8]">No risks logged for this project.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── CONTRACT OBLIGATIONS TAB ─── */}
        {activeTab === 'obligations' && (() => {
          const obligations = contractObligations.filter(o => o.projectId === selectedProjectId);
          const categories = ['All', 'Guarantee', 'Warranty', 'Reporting', 'Financial', 'Operational'];
          const filtered = catFilter === 'All' ? obligations : obligations.filter(o => o.category === catFilter);

          const completed = obligations.filter(o => o.status === 'Completed').length;
          const overdue = obligations.filter(o => o.status === 'Overdue').length;
          const comingDue = obligations.filter(o => o.status === 'Coming Due').length;
          const total = obligations.length;
          const upcoming90 = obligations.filter(o => o.status === 'Coming Due' || o.status === 'Overdue')
            .sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''));

          return (
            <div className="space-y-6">
              {/* Compliance summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#121C35] border border-[#1E2A45] rounded-xl p-5">
                  <p className="text-xs text-[#7A8BA8] uppercase tracking-wider mb-1">Total Obligations</p>
                  <p className="text-2xl font-bold text-white">{total}</p>
                </div>
                <div className="bg-[#121C35] border border-[#1E2A45] rounded-xl p-5">
                  <p className="text-xs text-[#7A8BA8] uppercase tracking-wider mb-1">Completed</p>
                  <p className="text-2xl font-bold text-emerald-600">{completed}</p>
                </div>
                <div className="bg-[#121C35] border border-[#1E2A45] rounded-xl p-5">
                  <p className="text-xs text-[#7A8BA8] uppercase tracking-wider mb-1">Coming Due</p>
                  <p className="text-2xl font-bold text-amber-600">{comingDue}</p>
                </div>
                <div className="bg-[#121C35] border border-[#1E2A45] rounded-xl p-5">
                  <p className="text-xs text-[#7A8BA8] uppercase tracking-wider mb-1">Overdue</p>
                  <p className={cn('text-2xl font-bold', overdue > 0 ? 'text-red-600' : 'text-emerald-600')}>{overdue}</p>
                </div>
              </div>

              {/* Compliance donut */}
              <div className="bg-[#121C35] border border-[#1E2A45] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white mb-4">Compliance Summary</h3>
                <div className="flex items-center gap-8">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#F3F4F6" strokeWidth="3" />
                      {total > 0 && (
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#10B981" strokeWidth="3"
                          strokeDasharray={`${(completed / total) * 87.96} 87.96`} strokeLinecap="round" />
                      )}
                      {overdue > 0 && (
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#EF4444" strokeWidth="3"
                          strokeDasharray={`${(overdue / total) * 87.96} 87.96`}
                          strokeDashoffset={`-${(completed / total) * 87.96}`} strokeLinecap="round" />
                      )}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-white">{total > 0 ? Math.round((completed / total) * 100) : 0}%</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 bg-emerald-500 rounded-full" /><span className="text-[#9AA5B8]">{completed} Completed on time</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 bg-amber-400 rounded-full" /><span className="text-[#9AA5B8]">{comingDue} Coming due</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 bg-red-500 rounded-full" /><span className="text-[#9AA5B8]">{overdue} Overdue</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#1E2A45] rounded-full" /><span className="text-[#9AA5B8]">{total - completed - comingDue - overdue} Not yet due</span></div>
                  </div>
                </div>
              </div>

              {/* Upcoming obligations */}
              {upcoming90.length > 0 && (
                <div className="bg-[#121C35] border border-[#1E2A45] rounded-xl overflow-hidden">
                  <div className="p-6 border-b border-[#1E2A45]">
                    <h3 className="text-sm font-semibold text-white">Upcoming & Overdue Obligations</h3>
                  </div>
                  <div className="divide-y divide-[#1E2A45]">
                    {upcoming90.map(o => (
                      <div key={o.id} className="px-6 py-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium text-white">{o.description}</p>
                            <p className="text-xs text-[#7A8BA8] mt-1">
                              {o.category} &middot; {o.responsibleParty} {o.dueDate ? `\u00B7 Due: ${o.dueDate}` : ''}
                            </p>
                            <p className="text-xs text-[#5A6B88] mt-1 italic">Ref: {o.contractRef}</p>
                            {o.internalNote && <p className="text-xs text-amber-600 mt-1">{o.internalNote}</p>}
                          </div>
                          <span className={cn('px-2.5 py-1 rounded text-xs font-medium border flex-shrink-0',
                            o.status === 'Overdue' ? 'bg-red-50 text-red-600 border-red-200' :
                            'bg-amber-50 text-amber-700 border-amber-200'
                          )}>{o.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full obligations table */}
              <div className="bg-[#121C35] border border-[#1E2A45] rounded-xl overflow-hidden">
                <div className="p-6 border-b border-[#1E2A45] flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">All Obligations</h3>
                  <div className="flex items-center gap-2">
                    {categories.map(c => (
                      <button
                        key={c}
                        onClick={() => setCatFilter(c)}
                        className={cn('px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
                          catFilter === c ? 'bg-emerald-50 text-emerald-700' : 'text-[#7A8BA8] hover:bg-[#1A2544]'
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-neutral-400 uppercase bg-[#0F1829] border-b border-[#1E2A45]">
                      <tr>
                        <th className="px-6 py-4 font-medium">Description</th>
                        <th className="px-6 py-4 font-medium">Category</th>
                        <th className="px-6 py-4 font-medium">Responsible</th>
                        <th className="px-6 py-4 font-medium">Due Date</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Ref</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E2A45]">
                      {filtered.map(o => (
                        <tr key={o.id} className="hover:bg-[#1A2544] transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-medium text-white max-w-sm">{o.description}</p>
                            {o.evidence && <p className="text-[10px] text-[#5A6B88] mt-0.5">{o.evidence}</p>}
                          </td>
                          <td className="px-6 py-4"><span className="px-2.5 py-1 rounded bg-[#1E2A45] text-xs font-medium border border-[#2A3A5C]">{o.category}</span></td>
                          <td className="px-6 py-4 text-[#9AA5B8]">{o.responsibleParty}</td>
                          <td className="px-6 py-4 text-[#9AA5B8] font-mono text-xs">{o.dueDate || 'Ongoing'}</td>
                          <td className="px-6 py-4">
                            <span className={cn('px-2.5 py-1 rounded text-xs font-medium border',
                              o.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              o.status === 'Overdue' ? 'bg-red-50 text-red-600 border-red-200' :
                              o.status === 'Coming Due' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                              'bg-[#0F1829] text-[#7A8BA8] border-[#1E2A45]'
                            )}>{o.status}</span>
                          </td>
                          <td className="px-6 py-4 text-xs text-[#5A6B88]">{o.contractRef}</td>
                        </tr>
                      ))}
                      {filtered.length === 0 && (
                        <tr><td colSpan={6} className="px-6 py-8 text-center text-[#7A8BA8]">No obligations found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
