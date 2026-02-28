import { useState } from 'react';
import { useStore } from '@/store';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const PHASES = ['Prospect', 'Audit', 'IGEA', 'RFP', 'Contract', 'Construction', 'M&V', 'Closeout'];

export function ClientPortal() {
  const projects = useStore(state => state.projects);
  const milestones = useStore(state => state.milestones);
  const mvData = useStore(state => state.mvData);
  const inspectionFindings = useStore(state => state.inspectionFindings);
  const ecms = useStore(state => state.ecms);

  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);

  const project = projects.find(p => p.id === selectedProjectId)!;
  const projectMilestones = milestones.filter(m => m.projectId === selectedProjectId);
  const projectMvData = mvData.filter(d => d.projectId === selectedProjectId);
  const projectFindings = inspectionFindings.filter(f => f.projectId === selectedProjectId && f.status === 'Open');
  const projectEcms = ecms.filter(e => e.projectId === selectedProjectId);

  const phaseIndex = PHASES.indexOf(project.phase);
  const totalGuaranteed = projectMvData.reduce((sum, d) => sum + d.guaranteed, 0);
  const totalCalculated = projectMvData.reduce((sum, d) => sum + d.calculated, 0);
  const mvAchievement = totalGuaranteed > 0 ? (totalCalculated / totalGuaranteed) * 100 : null;
  const contractValue = project.value > 0 ? `$${(project.value / 1_000_000).toFixed(1)}M` : '—';

  return (
    <div className="max-w-5xl mx-auto px-8 py-8 space-y-6">
      {/* Project header + selector */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            ESCO: {project.esco} &nbsp;·&nbsp; Owner's Rep: 2KB Energy Services
          </p>
        </div>
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          className="bg-white border border-[#D4D8E2] text-gray-700 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 shadow-sm flex-shrink-0"
        >
          {projects.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Phase progress bar */}
      <div className="bg-white border border-[#EAEDF3] rounded-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-gray-900">Project Phase</h3>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
            {project.phase}
          </span>
        </div>
        <div className="relative">
          <div className="h-2 bg-[#EAEDF3] rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${((phaseIndex + 1) / PHASES.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between">
            {PHASES.map((phase, i) => (
              <div key={phase} className="flex flex-col items-center gap-1">
                <div className={cn(
                  "w-2.5 h-2.5 rounded-full border-2 -mt-[22px]",
                  i < phaseIndex ? "bg-emerald-500 border-emerald-500" :
                  i === phaseIndex ? "bg-white border-emerald-500 shadow-sm shadow-emerald-300" :
                  "bg-white border-[#D4D8E2]"
                )} />
                <span className={cn(
                  "text-[9px] font-medium uppercase tracking-wide hidden sm:block",
                  i <= phaseIndex ? "text-emerald-600" : "text-gray-400"
                )}>
                  {phase}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#EAEDF3] rounded-xl p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Contract Value</p>
          <p className="text-3xl font-bold text-gray-900">{contractValue}</p>
        </div>
        <div className="bg-white border border-[#EAEDF3] rounded-xl p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">ECMs Included</p>
          <p className="text-3xl font-bold text-gray-900">{projectEcms.length > 0 ? projectEcms.length : '—'}</p>
        </div>
        <div className="bg-white border border-[#EAEDF3] rounded-xl p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">M&V Achievement</p>
          <p className={cn(
            "text-3xl font-bold",
            mvAchievement !== null
              ? mvAchievement >= 100 ? "text-emerald-600" : "text-amber-600"
              : "text-gray-300"
          )}>
            {mvAchievement !== null ? `${mvAchievement.toFixed(1)}%` : '—'}
          </p>
        </div>
        <div className="bg-white border border-[#EAEDF3] rounded-xl p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Open Findings</p>
          <p className={cn(
            "text-3xl font-bold",
            projectFindings.length > 0 ? "text-amber-600" : "text-emerald-600"
          )}>
            {projectFindings.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Milestones */}
        <div className="bg-white border border-[#EAEDF3] rounded-xl overflow-hidden">
          <div className="p-5 border-b border-[#EAEDF3]">
            <h3 className="text-sm font-semibold text-gray-900">Milestones & Schedule</h3>
          </div>
          {projectMilestones.length > 0 ? (
            <div className="divide-y divide-[#EAEDF3]">
              {projectMilestones.map(m => (
                <div key={m.id} className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0",
                      m.status === 'completed' ? "bg-emerald-50" :
                      m.status === 'overdue' ? "bg-red-50" :
                      m.status === 'in progress' ? "bg-blue-50" : "bg-gray-50"
                    )}>
                      <CheckCircle2 className={cn(
                        "w-4 h-4",
                        m.status === 'completed' ? "text-emerald-500" :
                        m.status === 'overdue' ? "text-red-500" :
                        m.status === 'in progress' ? "text-blue-500" : "text-gray-400"
                      )} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{m.name}</p>
                      <p className="text-xs text-gray-500 font-mono">{m.dueDate}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-semibold uppercase border",
                    m.status === 'completed' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                    m.status === 'overdue' ? "bg-red-50 text-red-600 border-red-200" :
                    m.status === 'in progress' ? "bg-blue-50 text-blue-600 border-blue-200" :
                    "bg-gray-50 text-gray-500 border-gray-200"
                  )}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400 text-sm">No milestones for this project yet.</div>
          )}
        </div>

        {/* M&V chart or ECM list */}
        {projectMvData.length > 0 ? (
          <div className="bg-white border border-[#EAEDF3] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-6">Savings vs. Guarantee</h3>
            <div className="h-44 flex items-end gap-3">
              {projectMvData.map(d => {
                const maxVal = Math.max(...projectMvData.map(x => Math.max(x.guaranteed, x.calculated)));
                const gH = (d.guaranteed / maxVal) * 100;
                const cH = (d.calculated / maxVal) * 100;
                const surplus = d.calculated >= d.guaranteed;
                return (
                  <div key={d.year} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      <div className="w-2/5 bg-[#EAEDF3] rounded-t-sm relative group" style={{ height: `${gH}%` }}>
                        <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-10 pointer-events-none">
                          Guaranteed: ${d.guaranteed.toLocaleString()}
                        </div>
                      </div>
                      <div
                        className={cn("w-2/5 rounded-t-sm relative group", surplus ? "bg-emerald-500" : "bg-amber-400")}
                        style={{ height: `${cH}%` }}
                      >
                        <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-10 pointer-events-none">
                          Achieved: ${d.calculated.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <span className="text-[9px] text-gray-500 font-mono">Yr {d.year}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-center gap-5 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-2 bg-[#EAEDF3] rounded-sm inline-block" />Guaranteed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-2 bg-emerald-500 rounded-sm inline-block" />Achieved
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#EAEDF3] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Energy Conservation Measures</h3>
            {projectEcms.length > 0 ? (
              <div className="divide-y divide-[#EAEDF3]">
                {projectEcms.map(ecm => (
                  <div key={ecm.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{ecm.description}</p>
                      <p className="text-xs text-gray-500">{ecm.category} · {ecm.number}</p>
                    </div>
                    <p className="text-sm font-semibold text-emerald-600">${ecm.savings.toLocaleString()}/yr</p>
                  </div>
                ))}
                <div className="pt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Total Annual Savings</span>
                  <span className="text-lg font-bold text-emerald-600">
                    ${projectEcms.reduce((s, e) => s + e.savings, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center py-8">No ECM data available yet for this project.</p>
            )}
          </div>
        )}
      </div>

      {/* Open findings */}
      {projectFindings.length > 0 && (
        <div className="bg-white border border-[#EAEDF3] rounded-xl overflow-hidden">
          <div className="p-5 border-b border-[#EAEDF3] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-gray-900">Open Inspection Findings</h3>
            <span className="ml-auto px-2.5 py-0.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
              {projectFindings.length} open
            </span>
          </div>
          <div className="divide-y divide-[#EAEDF3]">
            {projectFindings.map(f => (
              <div key={f.id} className="px-5 py-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{f.description}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{f.type} · {f.date}</p>
                </div>
                <span className={cn(
                  "px-2.5 py-1 rounded text-xs font-medium border flex-shrink-0",
                  f.severity === 'Critical' ? "bg-red-50 text-red-600 border-red-200" :
                  f.severity === 'Major' ? "bg-amber-50 text-amber-600 border-amber-200" :
                  "bg-blue-50 text-blue-600 border-blue-200"
                )}>
                  {f.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <footer className="pt-4 pb-2 text-center text-xs text-gray-400 border-t border-[#EAEDF3]">
        Data is refreshed in real time · 2KB Energy Services · Confidential
      </footer>
    </div>
  );
}
