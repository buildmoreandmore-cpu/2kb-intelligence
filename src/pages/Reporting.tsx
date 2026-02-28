import { useState } from 'react';
import { useStore } from '@/store';
import { FileText, Download, CheckCircle2, AlertTriangle, MessageSquare, Clock, ShieldCheck, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Reporting({ projectId }: { projectId?: string }) {
  const projects = useStore(state => state.projects);
  const reports = useStore(state => state.reports);

  const [activeTab, setActiveTab] = useState<'generate' | 'history' | 'qa'>('generate');
  const [selectedProjectId, setSelectedProjectId] = useState(projectId || projects[1].id);
  const [reportType, setReportType] = useState('IGEA Report');

  const projectReports = reports.filter(r => r.projectId === selectedProjectId);

  return (
    <div className="flex flex-col h-full">
      {!projectId && (
        <div className="flex-shrink-0 border-b border-[#1C2030] bg-[#12151C] px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Automated Reporting & QA</h1>
              <p className="text-sm text-neutral-400 mt-1">Generate standardized deliverables and manage QA/QC workflows.</p>
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
            <button
              onClick={() => setActiveTab('generate')}
              className={cn(
                "pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                activeTab === 'generate' 
                  ? "border-emerald-500 text-emerald-500" 
                  : "border-transparent text-neutral-400 hover:text-white hover:border-[#252A3A]"
              )}
          >
            <FileText className="w-4 h-4" />
            Generate Report
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={cn(
              "pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
              activeTab === 'history' 
                ? "border-emerald-500 text-emerald-500" 
                : "border-transparent text-neutral-400 hover:text-white hover:border-[#252A3A]"
            )}
          >
            <Clock className="w-4 h-4" />
            Report History
          </button>
          <button
            onClick={() => setActiveTab('qa')}
            className={cn(
              "pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
              activeTab === 'qa' 
                ? "border-emerald-500 text-emerald-500" 
                : "border-transparent text-neutral-400 hover:text-white hover:border-[#252A3A]"
            )}
          >
            <ShieldCheck className="w-4 h-4" />
            QA/QC Workflow
          </button>
        </div>
      </div>
      )}

      <div className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full space-y-8">
        {activeTab === 'generate' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#12151C] border border-[#1C2030] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white mb-4">Report Type</h3>
                <div className="space-y-2">
                  {['IGEA Report', 'RFP Package', 'Executive Summary', 'Council Presentation', 'M&V Annual Report', 'Carbon Impact Report'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setReportType(type)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors border",
                        reportType === type 
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                          : "bg-[#0E1118] text-neutral-400 border-[#1C2030] hover:bg-[#1C2030] hover:text-white"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-[#1C2030]">
                  <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
                    <FileText className="w-4 h-4" />
                    Generate Draft
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-[#12151C] border border-[#1C2030] rounded-xl overflow-hidden h-full min-h-[600px] flex flex-col">
                <div className="p-4 border-b border-[#1C2030] bg-[#0E1118] flex items-center justify-between">
                  <h3 className="text-sm font-medium text-neutral-400">Preview: {reportType}</h3>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-neutral-400 hover:text-white hover:bg-[#1C2030] rounded transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 p-8 bg-[#0B0E13] overflow-y-auto">
                  {/* Mock Report Preview */}
                  <div className="max-w-2xl mx-auto bg-white rounded shadow-lg min-h-[800px] p-12 text-black">
                    <div className="border-b-2 border-emerald-600 pb-6 mb-8">
                      <h1 className="text-3xl font-bold text-neutral-900 mb-2">{projects.find(p => p.id === selectedProjectId)?.name}</h1>
                      <h2 className="text-xl text-neutral-600">{reportType}</h2>
                      <p className="text-sm text-neutral-500 mt-4">Prepared by: 2KB Energy Services</p>
                      <p className="text-sm text-neutral-500">Date: {new Date().toLocaleDateString()}</p>
                    </div>
                    
                    <div className="space-y-6">
                      <section>
                        <h3 className="text-lg font-bold text-neutral-900 mb-3">1. Executive Summary</h3>
                        <p className="text-sm text-neutral-700 leading-relaxed">
                          This report details the findings and recommendations for the {projects.find(p => p.id === selectedProjectId)?.name} project. 
                          Based on our analysis, the proposed Energy Conservation Measures (ECMs) represent a viable path forward for achieving 
                          the facility's energy reduction goals while addressing critical deferred maintenance.
                        </p>
                      </section>
                      
                      <section>
                        <h3 className="text-lg font-bold text-neutral-900 mb-3">2. Financial Overview</h3>
                        <table className="w-full text-sm text-left border-collapse">
                          <thead>
                            <tr className="bg-neutral-100">
                              <th className="border border-neutral-300 px-4 py-2 font-semibold">Metric</th>
                              <th className="border border-neutral-300 px-4 py-2 font-semibold">Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-neutral-300 px-4 py-2">Total Project Cost</td>
                              <td className="border border-neutral-300 px-4 py-2">${(projects.find(p => p.id === selectedProjectId)?.value || 0).toLocaleString()}</td>
                            </tr>
                            <tr>
                              <td className="border border-neutral-300 px-4 py-2">Simple Payback</td>
                              <td className="border border-neutral-300 px-4 py-2">14.2 Years</td>
                            </tr>
                            <tr>
                              <td className="border border-neutral-300 px-4 py-2">NPV (20yr, 5%)</td>
                              <td className="border border-neutral-300 px-4 py-2 text-emerald-600">$425,000</td>
                            </tr>
                          </tbody>
                        </table>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-[#12151C] border border-[#1C2030] rounded-xl overflow-hidden">
            <div className="p-6 border-b border-[#1C2030]">
              <h3 className="text-sm font-semibold text-white">Report History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-neutral-400 uppercase bg-[#0E1118] border-b border-[#1C2030]">
                  <tr>
                    <th className="px-6 py-4 font-medium">Report Type</th>
                    <th className="px-6 py-4 font-medium">Version</th>
                    <th className="px-6 py-4 font-medium">Generated Date</th>
                    <th className="px-6 py-4 font-medium">Generated By</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1C2030]">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-[#181C25] transition-colors">
                      <td className="px-6 py-4 font-medium text-white">
                        <div className="flex flex-col">
                          <span>{report.type}</span>
                          <span className="text-xs text-neutral-500 font-normal">{projects.find(p => p.id === report.projectId)?.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-neutral-300 font-mono">{report.version}</td>
                      <td className="px-6 py-4 text-neutral-300 font-mono">{report.date}</td>
                      <td className="px-6 py-4 text-neutral-300">{report.by}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded text-xs font-medium border",
                          report.status === 'QA Complete' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                          report.status === 'In Review' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                          "bg-[#1C2030] text-neutral-400 border-[#252A3A]"
                        )}>
                          {report.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-1.5 text-neutral-400 hover:text-white hover:bg-[#1C2030] rounded transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'qa' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {reports.map((report) => (
              <div key={report.id} className="bg-[#12151C] border border-[#1C2030] rounded-xl overflow-hidden flex flex-col">
                <div className="p-6 border-b border-[#1C2030] flex items-start justify-between bg-[#0E1118]">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{report.type}</h3>
                    <p className="text-xs text-neutral-400 mt-1">{projects.find(p => p.id === report.projectId)?.name} • {report.version}</p>
                  </div>
                  <span className={cn(
                    "px-2.5 py-1 rounded text-xs font-medium border",
                    report.status === 'QA Complete' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                    report.status === 'In Review' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                    "bg-[#1C2030] text-neutral-400 border-[#252A3A]"
                  )}>
                    {report.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="p-6 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                      <FileCheck className="w-4 h-4" />
                      QA Checklist
                    </h4>
                    <span className="text-xs font-mono text-neutral-500">{report.qaCompleted}/{report.qaItems} Completed</span>
                  </div>
                  
                  <div className="w-full h-2 bg-[#1C2030] rounded-full overflow-hidden mb-6">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all",
                        report.qaCompleted === report.qaItems ? "bg-emerald-500" : "bg-amber-500"
                      )}
                      style={{ width: `${(report.qaCompleted / report.qaItems) * 100}%` }}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    {/* Mock checklist items */}
                    <label className="flex items-start gap-3 p-3 rounded-lg bg-[#0E1118] border border-[#1C2030] cursor-pointer hover:border-[#252A3A] transition-colors">
                      <input type="checkbox" className="mt-0.5 rounded border-[#252A3A] text-emerald-500 focus:ring-emerald-500 bg-[#1C2030]" defaultChecked={true} />
                      <div className="flex-1">
                        <span className="text-sm text-neutral-300 block">Verify all ECM costs match final proposal</span>
                        <span className="text-xs text-neutral-500 block mt-1">Checked by {report.by} on {report.date}</span>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-3 rounded-lg bg-[#0E1118] border border-[#1C2030] cursor-pointer hover:border-[#252A3A] transition-colors">
                      <input type="checkbox" className="mt-0.5 rounded border-[#252A3A] text-emerald-500 focus:ring-emerald-500 bg-[#1C2030]" defaultChecked={report.status === 'QA Complete'} />
                      <div className="flex-1">
                        <span className="text-sm text-neutral-300 block">Confirm baseline utility data aligns with Module 2</span>
                        {report.status === 'QA Complete' && <span className="text-xs text-neutral-500 block mt-1">Checked by {report.by} on {report.date}</span>}
                      </div>
                    </label>
                  </div>
                </div>
                
                <div className="p-4 border-t border-[#1C2030] bg-[#0E1118] flex justify-end gap-3">
                  <button className="px-4 py-2 bg-[#1C2030] text-white text-sm font-medium rounded-lg hover:bg-[#252A3A] transition-colors">
                    Add Comment
                  </button>
                  <button 
                    disabled={report.status === 'QA Complete'}
                    className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Approve Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
