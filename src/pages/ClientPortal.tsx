import { useState } from 'react';
import { useStore } from '@/store';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

const PHASES = ['Prospect', 'Audit', 'IGEA', 'RFP', 'Contract', 'Construction', 'M&V', 'Closeout'];
type Tab = 'overview' | 'savings' | 'contract' | 'documents' | 'timeline' | 'team';

const TAB_CONFIG: { id: Tab; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: 'solar:widget-bold-duotone' },
  { id: 'savings', label: 'Savings', icon: 'solar:graph-up-bold-duotone' },
  { id: 'contract', label: 'Contract', icon: 'solar:shield-check-bold-duotone' },
  { id: 'documents', label: 'Documents', icon: 'solar:folder-check-bold-duotone' },
  { id: 'timeline', label: 'Timeline', icon: 'solar:flag-bold-duotone' },
  { id: 'team', label: 'Team', icon: 'solar:users-group-rounded-bold-duotone' },
];

export function ClientPortal() {
  const projects = useStore(s => s.projects);
  const milestones = useStore(s => s.milestones);
  const mvData = useStore(s => s.mvData);
  const inspectionFindings = useStore(s => s.inspectionFindings);
  const ecms = useStore(s => s.ecms);
  const reports = useStore(s => s.reports);
  const submittals = useStore(s => s.submittals);
  const changeOrders = useStore(s => s.changeOrders);
  const contractObligations = useStore(s => s.contractObligations);
  const clientNotifications = useStore(s => s.clientNotifications);
  const meetingNotes = useStore(s => s.meetingNotes);
  const teamContacts = useStore(s => s.teamContacts);
  const pricingReview = useStore(s => s.pricingReview);

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);

  const project = projects.find(p => p.id === selectedProjectId)!;
  const pMilestones = milestones.filter(m => m.projectId === selectedProjectId);
  const pMvData = mvData.filter(d => d.projectId === selectedProjectId);
  const pFindings = inspectionFindings.filter(f => f.projectId === selectedProjectId && f.status === 'Open');
  const pEcms = ecms.filter(e => e.projectId === selectedProjectId);
  const pReports = reports.filter(r => r.projectId === selectedProjectId && r.status === 'Approved');
  const pSubmittals = submittals.filter(s => s.projectId === selectedProjectId);
  const pChangeOrders = changeOrders.filter(c => c.projectId === selectedProjectId);
  const pObligations = contractObligations.filter(o => o.projectId === selectedProjectId && !o.internalOnly);
  const pNotifications = clientNotifications.filter(n => n.projectId === selectedProjectId);
  const pMeetingNotes = meetingNotes.filter(m => m.projectId === selectedProjectId);
  const pTeam = teamContacts.filter(t => t.projectId === selectedProjectId);
  const pPricing = pricingReview.filter(p => p.projectId === selectedProjectId);

  const phaseIndex = PHASES.indexOf(project.phase);
  const totalGuaranteed = pMvData.reduce((s, d) => s + d.guaranteed, 0);
  const totalCalculated = pMvData.reduce((s, d) => s + d.calculated, 0);
  const mvAchievement = totalGuaranteed > 0 ? (totalCalculated / totalGuaranteed) * 100 : null;
  const contractValue = project.value > 0 ? `$${(project.value / 1_000_000).toFixed(1)}M` : '\u2014';

  // Carbon estimate: ~0.0004 tCO2e per dollar saved (rough ESPC average)
  const carbonReduction = totalCalculated > 0 ? Math.round(totalCalculated * 0.0004) : null;

  const ownerObligations = pObligations.filter(o => o.responsibleParty === 'Owner' || o.status === 'Coming Due' || o.status === 'Overdue');
  const completedObligations = pObligations.filter(o => o.status === 'Completed').length;
  const totalObligationsCount = pObligations.length;

  const pricingReviewed = pPricing.filter(p => !p.clientSummary.includes('Under')).length;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-6">
      {/* Project selector + phase */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-0.5">ESCO: {project.esco} &middot; Owner's Rep: 2KB Energy Services</p>
        </div>
        <select
          value={selectedProjectId}
          onChange={e => { setSelectedProjectId(e.target.value); setActiveTab('overview'); }}
          className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 p-2.5 shadow-sm"
        >
          {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto bg-white rounded-xl border border-gray-200 p-1.5 shadow-sm">
        {TAB_CONFIG.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
              activeTab === tab.id
                ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            )}
          >
            <Icon icon={tab.icon} className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── OVERVIEW TAB ─── */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Phase bar */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Project Phase</h3>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                {project.phase}
              </span>
            </div>
            <div className="relative">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${((phaseIndex + 1) / PHASES.length) * 100}%` }} />
              </div>
              <div className="flex justify-between">
                {PHASES.map((phase, i) => (
                  <div key={phase} className="flex flex-col items-center gap-1">
                    <div className={cn('w-2.5 h-2.5 rounded-full border-2 -mt-[22px]',
                      i < phaseIndex ? 'bg-emerald-500 border-emerald-500' :
                      i === phaseIndex ? 'bg-white border-emerald-500 shadow-sm shadow-emerald-300' :
                      'bg-white border-gray-300'
                    )} />
                    <span className={cn('text-[9px] font-medium uppercase tracking-wide hidden sm:block', i <= phaseIndex ? 'text-emerald-600' : 'text-gray-400')}>{phase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPICard label="Contract Value" value={contractValue} />
            <KPICard label="M&V Achievement" value={mvAchievement !== null ? `${mvAchievement.toFixed(1)}%` : '\u2014'} color={mvAchievement !== null ? (mvAchievement >= 100 ? 'emerald' : 'amber') : undefined} />
            <KPICard label="Carbon Reduced" value={carbonReduction !== null ? `${carbonReduction} tCO\u2082e` : '\u2014'} color="emerald" />
            <KPICard label="Open Findings" value={String(pFindings.length)} color={pFindings.length > 0 ? 'amber' : 'emerald'} />
          </div>

          {/* Pricing Review card */}
          {pPricing.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <Icon icon="solar:tag-price-bold-duotone" className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Pricing Review</h3>
                    <p className="text-xs text-gray-500">{pricingReviewed} of {pPricing.length} line items verified</p>
                  </div>
                </div>
                <span className={cn('px-3 py-1 text-xs font-semibold rounded-full border',
                  pricingReviewed === pPricing.length
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                )}>
                  {pricingReviewed === pPricing.length ? 'All Pricing Verified' : `${pPricing.length - pricingReviewed} Under Review`}
                </span>
              </div>
            </div>
          )}

          {/* Notifications */}
          {pNotifications.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Recent Updates</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {pNotifications.slice(0, 5).map(n => (
                  <div key={n.id} className="px-5 py-4 flex items-start gap-3">
                    <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5',
                      n.type === 'alert' ? 'bg-amber-50' : n.type === 'report' ? 'bg-blue-50' : n.type === 'milestone' ? 'bg-emerald-50' : 'bg-gray-50'
                    )}>
                      <Icon
                        icon={n.type === 'alert' ? 'solar:danger-triangle-bold-duotone' : n.type === 'report' ? 'solar:document-bold-duotone' : n.type === 'milestone' ? 'solar:flag-bold-duotone' : 'solar:folder-bold-duotone'}
                        className={cn('w-4 h-4', n.type === 'alert' ? 'text-amber-500' : n.type === 'report' ? 'text-blue-500' : n.type === 'milestone' ? 'text-emerald-500' : 'text-gray-400')}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900">{n.title}</p>
                        {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{n.description}</p>
                      <p className="text-[10px] text-gray-400 mt-1 font-mono">{n.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── SAVINGS TAB ─── */}
      {activeTab === 'savings' && (
        <div className="space-y-6">
          {/* Achievement header */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Total Guaranteed</p>
                <p className="text-2xl font-bold text-gray-900">${totalGuaranteed.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Total Achieved</p>
                <p className={cn('text-2xl font-bold', totalCalculated >= totalGuaranteed ? 'text-emerald-600' : 'text-amber-600')}>${totalCalculated.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Achievement Rate</p>
                <p className={cn('text-2xl font-bold', mvAchievement !== null && mvAchievement >= 100 ? 'text-emerald-600' : 'text-amber-600')}>
                  {mvAchievement !== null ? `${mvAchievement.toFixed(1)}%` : '\u2014'}
                </p>
                {pMvData.length >= 2 && (
                  <p className={cn('text-xs mt-1', pMvData[pMvData.length - 1].calculated >= pMvData[pMvData.length - 2].calculated ? 'text-emerald-600' : 'text-red-500')}>
                    {pMvData[pMvData.length - 1].calculated >= pMvData[pMvData.length - 2].calculated ? '\u2191 Trending up' : '\u2193 Trending down'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Chart */}
          {pMvData.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-6">Annual Savings vs. Guarantee</h3>
              <div className="h-52 flex items-end gap-4">
                {pMvData.map(d => {
                  const maxVal = Math.max(...pMvData.map(x => Math.max(x.guaranteed, x.calculated)));
                  const gH = (d.guaranteed / maxVal) * 100;
                  const cH = (d.calculated / maxVal) * 100;
                  const surplus = d.calculated >= d.guaranteed;
                  return (
                    <div key={d.year} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex items-end justify-center gap-1.5 h-full">
                        <div className="w-2/5 bg-gray-100 rounded-t relative group" style={{ height: `${gH}%` }}>
                          <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-10 pointer-events-none">
                            Guaranteed: ${d.guaranteed.toLocaleString()}
                          </div>
                        </div>
                        <div className={cn('w-2/5 rounded-t relative group', surplus ? 'bg-emerald-500' : 'bg-amber-400')} style={{ height: `${cH}%` }}>
                          <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-10 pointer-events-none">
                            Achieved: ${d.calculated.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 font-mono">Year {d.year}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-center gap-5 text-xs text-gray-500">
                <span className="flex items-center gap-1.5"><span className="w-3 h-2 bg-gray-100 rounded-sm inline-block" />Guaranteed</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-2 bg-emerald-500 rounded-sm inline-block" />Achieved</span>
              </div>
            </div>
          ) : (
            <EmptyState icon="solar:graph-up-bold-duotone" text="Savings data will appear once M&V reporting begins." />
          )}

          {/* ECM list */}
          {pEcms.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Energy Conservation Measures</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {pEcms.map(ecm => (
                  <div key={ecm.id} className="px-5 py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{ecm.description}</p>
                      <p className="text-xs text-gray-500">{ecm.category} &middot; {ecm.number}</p>
                    </div>
                    <p className="text-sm font-semibold text-emerald-600">${ecm.savings.toLocaleString()}/yr</p>
                  </div>
                ))}
                <div className="px-5 py-4 flex items-center justify-between bg-gray-50">
                  <span className="text-sm font-semibold text-gray-700">Total Annual Savings</span>
                  <span className="text-lg font-bold text-emerald-600">${pEcms.reduce((s, e) => s + e.savings, 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Carbon impact */}
          {carbonReduction !== null && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Icon icon="solar:leaf-bold-duotone" className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-semibold text-emerald-800">Carbon Impact</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><p className="text-2xl font-bold text-emerald-700">{carbonReduction}</p><p className="text-xs text-emerald-600">tCO&#8322;e reduced</p></div>
                <div><p className="text-2xl font-bold text-emerald-700">{Math.round(carbonReduction * 0.22)}</p><p className="text-xs text-emerald-600">cars off road equivalent</p></div>
                <div><p className="text-2xl font-bold text-emerald-700">{Math.round(carbonReduction * 16.5)}</p><p className="text-xs text-emerald-600">trees planted equivalent</p></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── CONTRACT TAB ─── */}
      {activeTab === 'contract' && (
        <div className="space-y-6">
          {/* Guarantee summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Guarantee Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div><p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Annual Guarantee</p><p className="text-xl font-bold text-gray-900">${pMvData.length > 0 ? pMvData[pMvData.length - 1].guaranteed.toLocaleString() : '\u2014'}</p></div>
              <div><p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Achievement</p><p className={cn('text-xl font-bold', mvAchievement !== null && mvAchievement >= 100 ? 'text-emerald-600' : 'text-amber-600')}>{mvAchievement !== null ? `${mvAchievement.toFixed(1)}%` : '\u2014'}</p></div>
              <div><p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Years Remaining</p><p className="text-xl font-bold text-gray-900">17</p></div>
              <div><p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Next Verification</p><p className="text-xl font-bold text-gray-900">Dec 2025</p></div>
            </div>
          </div>

          {/* Warranty tracker */}
          {(() => {
            const warranties = pObligations.filter(o => o.category === 'Warranty');
            return warranties.length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="p-5 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-900">Warranty Tracker</h3></div>
                <div className="divide-y divide-gray-100">
                  {warranties.map(w => (
                    <div key={w.id} className="px-5 py-4 flex items-center justify-between">
                      <div><p className="text-sm font-medium text-gray-900">{w.description}</p></div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 font-mono">{w.dueDate || 'Ongoing'}</span>
                        <span className={cn('px-2 py-0.5 rounded text-[10px] font-semibold uppercase border',
                          w.status === 'Coming Due' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          w.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          'bg-blue-50 text-blue-600 border-blue-200'
                        )}>{w.status === 'Not Yet Due' ? 'Active' : w.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null;
          })()}

          {/* Upcoming obligations */}
          {ownerObligations.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-900">Upcoming Obligations</h3></div>
              <div className="divide-y divide-gray-100">
                {ownerObligations.map(o => (
                  <div key={o.id} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{o.description}</p>
                        <p className="text-xs text-gray-500 mt-1">Responsible: {o.responsibleParty} {o.dueDate ? `\u00B7 Due: ${o.dueDate}` : ''}</p>
                        {o.clientSummary && <p className="text-xs text-gray-400 mt-1 italic">{o.clientSummary}</p>}
                      </div>
                      <span className={cn('px-2 py-0.5 rounded text-[10px] font-semibold uppercase border flex-shrink-0',
                        o.status === 'Overdue' ? 'bg-red-50 text-red-600 border-red-200' :
                        o.status === 'Coming Due' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        o.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        'bg-gray-50 text-gray-500 border-gray-200'
                      )}>{o.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compliance snapshot */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Compliance Snapshot</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${totalObligationsCount > 0 ? (completedObligations / totalObligationsCount) * 100 : 0}%` }} />
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-900">{completedObligations} of {totalObligationsCount} completed</span>
            </div>
          </div>

          {/* Payment schedule */}
          {(() => {
            const payments = pObligations.filter(o => o.category === 'Financial');
            return payments.length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="p-5 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-900">Payment Schedule</h3></div>
                <div className="divide-y divide-gray-100">
                  {payments.map(p => (
                    <div key={p.id} className="px-5 py-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{p.description}</p>
                        <p className="text-xs text-gray-400 mt-0.5 italic">{p.clientSummary}</p>
                      </div>
                      <span className={cn('px-2 py-0.5 rounded text-[10px] font-semibold uppercase border',
                        p.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        p.status === 'Coming Due' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-gray-50 text-gray-500 border-gray-200'
                      )}>{p.status === 'Completed' ? 'Paid' : p.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null;
          })()}
        </div>
      )}

      {/* ─── DOCUMENTS TAB ─── */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          {/* Reports */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-900">Reports</h3></div>
            {pReports.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {pReports.map(r => (
                  <div key={r.id} className="px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center"><Icon icon="solar:document-bold-duotone" className="w-4 h-4 text-blue-500" /></div>
                      <div><p className="text-sm font-medium text-gray-900">{r.type}</p><p className="text-xs text-gray-500">{r.version} &middot; {r.date}</p></div>
                    </div>
                    <button className="text-xs text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1">
                      <Icon icon="solar:download-minimalistic-bold-duotone" className="w-4 h-4" />Download
                    </button>
                  </div>
                ))}
              </div>
            ) : <EmptyState icon="solar:document-bold-duotone" text="Approved reports will appear here." />}
          </div>

          {/* Submittals */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-900">Submittals</h3></div>
            {pSubmittals.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {pSubmittals.map(s => (
                  <div key={s.id} className="px-5 py-4 flex items-center justify-between">
                    <div><p className="text-sm font-medium text-gray-900">{s.description}</p><p className="text-xs text-gray-500">{s.number} &middot; {s.ecm} &middot; Submitted {s.submitted}</p></div>
                    <span className={cn('px-2 py-0.5 rounded text-[10px] font-semibold uppercase border',
                      s.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                    )}>{s.status}</span>
                  </div>
                ))}
              </div>
            ) : <EmptyState icon="solar:clipboard-bold-duotone" text="No submittals for this project." />}
          </div>

          {/* Change Orders */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-900">Change Orders</h3></div>
            {pChangeOrders.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {pChangeOrders.map(c => (
                  <div key={c.id} className="px-5 py-4 flex items-center justify-between">
                    <div><p className="text-sm font-medium text-gray-900">{c.description}</p><p className="text-xs text-gray-500">{c.number} &middot; Requested by {c.requestedBy} &middot; ${c.cost.toLocaleString()} &middot; +{c.days} days</p></div>
                    <span className={cn('px-2 py-0.5 rounded text-[10px] font-semibold uppercase border',
                      c.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      c.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    )}>{c.status}</span>
                  </div>
                ))}
              </div>
            ) : <EmptyState icon="solar:pen-new-square-bold-duotone" text="No change orders for this project." />}
          </div>

          {/* Pricing review (client-safe) */}
          {pPricing.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-900">Pricing Verification</h3></div>
              <div className="divide-y divide-gray-100">
                {pPricing.map(p => {
                  const isVerified = !p.clientSummary.includes('Under') && !p.clientSummary.includes('pending');
                  return (
                    <div key={p.id} className="px-5 py-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{p.description}</p>
                        <p className="text-xs text-gray-500">${p.escoCost.toLocaleString()}</p>
                        <p className="text-xs text-gray-400 mt-0.5 italic">{p.clientSummary}</p>
                      </div>
                      <span className={cn('px-2 py-0.5 rounded text-[10px] font-semibold uppercase border',
                        isVerified ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                      )}>{isVerified ? 'Verified' : 'Under Review'}</span>
                    </div>
                  );
                })}
              </div>
              <div className="px-5 py-3 bg-gray-50 text-xs text-gray-400 italic">
                All pricing validated by 2KB against proprietary project benchmarks.
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── TIMELINE TAB ─── */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          {/* Phase progress */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-6">Project Phases</h3>
            <div className="space-y-3">
              {PHASES.map((phase, i) => (
                <div key={phase} className="flex items-center gap-4">
                  <div className={cn('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2',
                    i < phaseIndex ? 'bg-emerald-500 border-emerald-500' :
                    i === phaseIndex ? 'bg-white border-emerald-500' :
                    'bg-white border-gray-200'
                  )}>
                    {i < phaseIndex ? (
                      <Icon icon="solar:check-read-bold-duotone" className="w-4 h-4 text-white" />
                    ) : i === phaseIndex ? (
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    ) : (
                      <span className="text-[10px] text-gray-400 font-mono">{i + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={cn('text-sm font-medium', i <= phaseIndex ? 'text-gray-900' : 'text-gray-400')}>{phase}</p>
                  </div>
                  {i < phaseIndex && <span className="text-[10px] text-emerald-600 font-semibold uppercase">Complete</span>}
                  {i === phaseIndex && <span className="text-[10px] text-emerald-600 font-semibold uppercase">Current</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-900">Milestones</h3></div>
            {pMilestones.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {pMilestones.map(m => (
                  <div key={m.id} className="px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                        m.status === 'completed' ? 'bg-emerald-50' : m.status === 'overdue' ? 'bg-red-50' : m.status === 'in progress' ? 'bg-blue-50' : 'bg-gray-50'
                      )}>
                        <Icon
                          icon={m.status === 'completed' ? 'solar:check-circle-bold-duotone' : m.status === 'overdue' ? 'solar:danger-circle-bold-duotone' : 'solar:clock-circle-bold-duotone'}
                          className={cn('w-4 h-4', m.status === 'completed' ? 'text-emerald-500' : m.status === 'overdue' ? 'text-red-500' : m.status === 'in progress' ? 'text-blue-500' : 'text-gray-400')}
                        />
                      </div>
                      <div><p className="text-sm font-medium text-gray-900">{m.name}</p><p className="text-xs text-gray-500 font-mono">{m.dueDate}</p></div>
                    </div>
                    <span className={cn('px-2 py-0.5 rounded text-[10px] font-semibold uppercase border',
                      m.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      m.status === 'overdue' ? 'bg-red-50 text-red-600 border-red-200' :
                      m.status === 'in progress' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                      'bg-gray-50 text-gray-500 border-gray-200'
                    )}>{m.status}</span>
                  </div>
                ))}
              </div>
            ) : <EmptyState icon="solar:flag-bold-duotone" text="No milestones for this project yet." />}
          </div>

          {/* Open findings */}
          {pFindings.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Open Inspection Findings</h3>
                <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">{pFindings.length} open</span>
              </div>
              <div className="divide-y divide-gray-100">
                {pFindings.map(f => (
                  <div key={f.id} className="px-5 py-4 flex items-start justify-between gap-4">
                    <div><p className="text-sm font-medium text-gray-900">{f.description}</p><p className="text-xs text-gray-500 mt-0.5">{f.type} &middot; {f.date}</p></div>
                    <span className={cn('px-2.5 py-1 rounded text-xs font-medium border flex-shrink-0',
                      f.severity === 'Critical' ? 'bg-red-50 text-red-600 border-red-200' : f.severity === 'Major' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-blue-50 text-blue-600 border-blue-200'
                    )}>{f.severity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── TEAM TAB ─── */}
      {activeTab === 'team' && (
        <div className="space-y-6" id="team-section">
          {/* Team contacts */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-900">Your 2KB Project Team</h3></div>
            <div className="divide-y divide-gray-100">
              {pTeam.map(t => (
                <div key={t.id} className="px-5 py-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center">
                      <span className="text-sm font-semibold text-emerald-700">{t.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <a href={`mailto:${t.email}`} className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
                      <Icon icon="solar:letter-bold-duotone" className="w-4 h-4 text-gray-500" />
                    </a>
                    <a href={`tel:${t.phone}`} className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
                      <Icon icon="solar:phone-bold-duotone" className="w-4 h-4 text-gray-500" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meeting notes */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-900">Meeting Notes</h3></div>
            {pMeetingNotes.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {pMeetingNotes.map(mn => (
                  <div key={mn.id} className="px-5 py-5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-gray-900">{mn.title}</p>
                      <span className="text-xs text-gray-500 font-mono">{mn.date}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Attendees: {mn.attendees.join(', ')}</p>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{mn.summary}</p>
                    {mn.actionItems.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-gray-700 mb-2">Action Items</p>
                        <ul className="space-y-1.5">
                          {mn.actionItems.map((ai, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                              <Icon icon={ai.completed ? 'solar:check-circle-bold-duotone' : 'solar:clock-circle-bold-duotone'} className={cn('w-3.5 h-3.5 flex-shrink-0 mt-0.5', ai.completed ? 'text-emerald-500' : 'text-gray-400')} />
                              <span className={ai.completed ? 'line-through text-gray-400' : ''}>{ai.text} <span className="text-gray-400">({ai.owner}, due {ai.dueDate})</span></span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {!mn.acknowledged && (
                      <button className="mt-3 text-xs text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1">
                        <Icon icon="solar:check-read-bold-duotone" className="w-3.5 h-3.5" />
                        Acknowledge Notes
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : <EmptyState icon="solar:notebook-bold-duotone" text="No meeting notes for this project yet." />}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="pt-4 pb-2 text-center text-xs text-gray-400 border-t border-gray-100">
        Data is refreshed in real time &middot; 2KB Energy Services &middot; Confidential
      </footer>
    </div>
  );
}

/* ── Helper Components ── */
function KPICard({ label, value, color }: { label: string; value: string; color?: 'emerald' | 'amber' }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{label}</p>
      <p className={cn('text-2xl md:text-3xl font-bold',
        color === 'emerald' ? 'text-emerald-600' : color === 'amber' ? 'text-amber-600' : 'text-gray-900'
      )}>{value}</p>
    </div>
  );
}

function EmptyState({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="p-10 text-center">
      <Icon icon={icon} className="w-8 h-8 text-gray-300 mx-auto mb-3" />
      <p className="text-sm text-gray-400">{text}</p>
    </div>
  );
}
