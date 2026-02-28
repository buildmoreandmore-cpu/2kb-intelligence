import { useState } from 'react';
import { useStore } from '@/store';
import { HardHat, AlertTriangle, CheckCircle2, Search, Filter, Plus, ClipboardList, Hammer } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Construction({ projectId }: { projectId?: string }) {
  const projects = useStore(state => state.projects);
  const ecms = useStore(state => state.ecms);
  const inspectionFindings = useStore(state => state.inspectionFindings);

  const [activeTab, setActiveTab] = useState<'tracker' | 'inspections'>('tracker');
  const [selectedProjectId, setSelectedProjectId] = useState(projectId || projects[2].id); // Default to construction project

  const projectEcms = ecms.filter(e => e.projectId === selectedProjectId);
  const projectFindings = inspectionFindings.filter(f => f.projectId === selectedProjectId);

  const totalEcms = projectEcms.length;
  const openFindings = projectFindings.filter(f => f.status === 'Open').length;
  const scopeDeviations = projectFindings.filter(f => f.type === 'Deviation from Scope' && f.status === 'Open').length;

  return (
    <div className="flex flex-col h-full">
      {!projectId && (
        <div className="flex-shrink-0 border-b border-[#EAEDF3] bg-[#FFFFFF] px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Construction Oversight</h1>
              <p className="text-sm text-gray-500 mt-1">Track installation progress, inspections, and scope deviations.</p>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="bg-[#EAEDF3] border border-[#D4D8E2] text-gray-700 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-64 p-2.5"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex space-x-6 border-b border-[#EAEDF3]">
            <button
              onClick={() => setActiveTab('tracker')}
              className={cn(
                "pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                activeTab === 'tracker' 
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
              )}
          >
            <Hammer className="w-4 h-4" />
            Installation Tracker
          </button>
          <button
            onClick={() => setActiveTab('inspections')}
            className={cn(
              "pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
              activeTab === 'inspections'
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
            )}
          >
            <ClipboardList className="w-4 h-4" />
            Inspection Log
          </button>
        </div>
      </div>
      )}

      <div className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFFFFF] border border-[#EAEDF3] rounded-xl p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Total ECMs</h3>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-gray-900">{totalEcms}</span>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#EAEDF3] rounded-xl p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Open Findings</h3>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-amber-500">{openFindings}</span>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#EAEDF3] rounded-xl p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Scope Deviations</h3>
            <div className="flex items-end gap-3">
              <span className={`text-4xl font-bold ${scopeDeviations > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                {scopeDeviations}
              </span>
            </div>
          </div>
        </div>

        {activeTab === 'tracker' && (
          <div className="bg-[#FFFFFF] border border-[#EAEDF3] rounded-xl overflow-hidden">
            <div className="p-6 border-b border-[#EAEDF3] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Installation Progress</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-neutral-400 uppercase bg-[#F8FAFB] border-b border-[#EAEDF3]">
                  <tr>
                    <th className="px-6 py-4 font-medium">ECM</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Progress</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEDF3]">
                  {projectEcms.map((ecm, idx) => {
                    // Mock progress based on index for demo
                    const progress = idx === 0 ? 100 : idx === 1 ? 45 : 0;
                    const status = idx === 0 ? 'Complete' : idx === 1 ? 'In Progress' : 'Not Started';
                    
                    return (
                      <tr key={ecm.id} className="hover:bg-[#F0F2F6] transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">
                          <div className="flex flex-col">
                            <span>{ecm.number}</span>
                            <span className="text-xs text-gray-500 font-normal">{ecm.description}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{ecm.category}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-32 h-2 bg-[#EAEDF3] rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${progress === 100 ? 'bg-emerald-500' : progress > 0 ? 'bg-blue-500' : 'bg-transparent'}`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 font-mono">{progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-2.5 py-1 rounded text-xs font-medium border",
                            status === 'Complete' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                            status === 'In Progress' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                            "bg-[#EAEDF3] text-gray-500 border-[#D4D8E2]"
                          )}>
                            {status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {projectEcms.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No ECMs found for this project.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'inspections' && (
          <div className="bg-[#FFFFFF] border border-[#EAEDF3] rounded-xl overflow-hidden">
            <div className="p-6 border-b border-[#EAEDF3] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Inspection Log</h3>
              <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-600 border border-transparent rounded-lg text-xs font-medium text-white hover:bg-emerald-700 transition-colors">
                <Plus className="w-3.5 h-3.5" />
                Log Finding
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-neutral-400 uppercase bg-[#F8FAFB] border-b border-[#EAEDF3]">
                  <tr>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">ECM</th>
                    <th className="px-6 py-4 font-medium">Type</th>
                    <th className="px-6 py-4 font-medium">Severity</th>
                    <th className="px-6 py-4 font-medium">Description</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEDF3]">
                  {projectFindings.map((finding) => (
                    <tr key={finding.id} className="hover:bg-[#F0F2F6] transition-colors">
                      <td className="px-6 py-4 text-gray-600 font-mono">{finding.date}</td>
                      <td className="px-6 py-4 text-gray-600">{finding.ecm}</td>
                      <td className="px-6 py-4 text-gray-600">{finding.type}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded text-xs font-medium border",
                          finding.severity === 'Critical' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                          finding.severity === 'Major' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                          "bg-blue-500/10 text-blue-500 border-blue-500/20"
                        )}>
                          {finding.severity.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 max-w-md truncate">{finding.description}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded text-xs font-medium border",
                          finding.status === 'Resolved' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                          "bg-[#EAEDF3] text-gray-500 border-[#D4D8E2]"
                        )}>
                          {finding.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {projectFindings.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No inspection findings logged for this project.</td>
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
