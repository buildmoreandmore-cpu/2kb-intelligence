import { useState } from 'react';
import { useStore } from '@/store';
import { ShieldCheck, Calendar, FileText, AlertTriangle, GitPullRequest, FileCheck, Plus, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Governance({ projectId }: { projectId?: string }) {
  const projects = useStore(state => state.projects);
  const milestones = useStore(state => state.milestones);
  const risks = useStore(state => state.risks);
  const changeOrders = useStore(state => state.changeOrders);
  const submittals = useStore(state => state.submittals);

  const [activeTab, setActiveTab] = useState<'pipeline' | 'milestones' | 'risks' | 'co' | 'submittals'>('pipeline');
  const [selectedProjectId, setSelectedProjectId] = useState(projectId || projects[0].id);

  const phases = ['Prospect', 'Audit', 'IGEA', 'RFP', 'Contract', 'Construction', 'M&V', 'Closeout'];

  return (
    <div className="flex flex-col h-full">
      {!projectId && (
        <div className="flex-shrink-0 border-b border-[#1C2030] bg-[#12151C] px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Owner's Rep Governance</h1>
              <p className="text-sm text-neutral-400 mt-1">Track project phases, milestones, documents, and risks.</p>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="bg-[#1C2030] border border-[#252A3A] text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-64 p-2.5"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex space-x-6 border-b border-[#1C2030]">
            {[
              { id: 'pipeline', label: 'Pipeline', icon: GitPullRequest },
              { id: 'milestones', label: 'Milestones', icon: Calendar },
              { id: 'risks', label: 'Risk Log', icon: AlertTriangle },
              { id: 'co', label: 'Change Orders', icon: FileText },
              { id: 'submittals', label: 'Submittals', icon: FileCheck },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                "pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                activeTab === tab.id 
                  ? "border-emerald-500 text-emerald-500" 
                  : "border-transparent text-neutral-400 hover:text-white hover:border-[#252A3A]"
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
                  <div key={phase} className="flex-shrink-0 w-80 bg-[#12151C] border border-[#1C2030] rounded-xl flex flex-col h-[calc(100vh-250px)]">
                    <div className="p-4 border-b border-[#1C2030] flex items-center justify-between bg-[#0E1118] rounded-t-xl">
                      <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{phase}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-[#1C2030] text-xs font-medium text-neutral-400">
                        {phaseProjects.length}
                      </span>
                    </div>
                    <div className="p-4 flex-1 overflow-y-auto space-y-3">
                      {phaseProjects.map(project => (
                        <div key={project.id} className="bg-[#181C25] border border-[#252A3A] rounded-lg p-4 hover:border-emerald-500/50 transition-colors cursor-pointer group">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">{project.name}</h4>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                              project.riskScore > 60 ? 'bg-red-500/20 text-red-500' :
                              project.riskScore > 40 ? 'bg-amber-500/20 text-amber-500' :
                              'bg-emerald-500/20 text-emerald-500'
                            }`}>
                              {project.riskScore}
                            </div>
                          </div>
                          <div className="text-xs text-neutral-500 space-y-1">
                            <p>ESCO: <span className="text-neutral-300">{project.esco}</span></p>
                            <p>Value: <span className="text-neutral-300 font-mono">${(project.value / 1000000).toFixed(1)}M</span></p>
                            <p>Lead: <span className="text-neutral-300">{project.engineer}</span></p>
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
          <div className="bg-[#12151C] border border-[#1C2030] rounded-xl overflow-hidden">
            <div className="p-6 border-b border-[#1C2030] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Project Milestones</h3>
              <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-600 border border-transparent rounded-lg text-xs font-medium text-white hover:bg-emerald-700 transition-colors">
                <Plus className="w-3.5 h-3.5" />
                Add Milestone
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-neutral-400 uppercase bg-[#0E1118] border-b border-[#1C2030]">
                  <tr>
                    <th className="px-6 py-4 font-medium">Milestone</th>
                    <th className="px-6 py-4 font-medium">Due Date</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Assigned To</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1C2030]">
                  {milestones.filter(m => m.projectId === selectedProjectId).map((milestone) => (
                    <tr key={milestone.id} className="hover:bg-[#181C25] transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{milestone.name}</td>
                      <td className="px-6 py-4 text-neutral-300 font-mono">{milestone.dueDate}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded text-xs font-medium border",
                          milestone.status === 'completed' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                          milestone.status === 'overdue' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                          milestone.status === 'in progress' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                          "bg-[#1C2030] text-neutral-400 border-[#252A3A]"
                        )}>
                          {milestone.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-neutral-300">{milestone.assignedTo}</td>
                    </tr>
                  ))}
                  {milestones.filter(m => m.projectId === selectedProjectId).length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">No milestones found for this project.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="bg-[#12151C] border border-[#1C2030] rounded-xl overflow-hidden">
            <div className="p-6 border-b border-[#1C2030] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Risk Log</h3>
              <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-600 border border-transparent rounded-lg text-xs font-medium text-white hover:bg-emerald-700 transition-colors">
                <Plus className="w-3.5 h-3.5" />
                Log Risk
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-neutral-400 uppercase bg-[#0E1118] border-b border-[#1C2030]">
                  <tr>
                    <th className="px-6 py-4 font-medium">Description</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Severity</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Owner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1C2030]">
                  {risks.filter(r => r.projectId === selectedProjectId).map((risk) => (
                    <tr key={risk.id} className="hover:bg-[#181C25] transition-colors">
                      <td className="px-6 py-4 font-medium text-white max-w-md truncate">{risk.description}</td>
                      <td className="px-6 py-4 text-neutral-300">{risk.category}</td>
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
                      <td className="px-6 py-4 text-neutral-300">{risk.status}</td>
                      <td className="px-6 py-4 text-neutral-300">{risk.owner}</td>
                    </tr>
                  ))}
                  {risks.filter(r => r.projectId === selectedProjectId).length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">No risks logged for this project.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
