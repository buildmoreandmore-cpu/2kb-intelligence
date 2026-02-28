import { useState } from 'react';
import { useStore } from '@/store';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle2, DollarSign, Leaf, Search, Filter, Plus, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Benchmarking({ projectId }: { projectId?: string }) {
  const buildings = useStore(state => state.buildings);
  const utilityBills = useStore(state => state.utilityBills);
  const assets = useStore(state => state.assets);
  const projects = useStore(state => state.projects);
  
  const [activeTab, setActiveTab] = useState<'energy' | 'capital'>('energy');
  const [selectedBuildingId, setSelectedBuildingId] = useState(buildings[0].id);
  
  let displayBuildings = buildings;
  if (projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      displayBuildings = buildings.filter(b => b.orgId === project.orgId);
    }
  }

  const selectedBuilding = displayBuildings.find(b => b.id === selectedBuildingId) || displayBuildings[0];
  const buildingBills = utilityBills.filter(b => b.buildingId === selectedBuilding?.id);
  const buildingAssets = assets.filter(a => a.buildingId === selectedBuilding?.id);
  
  // Calculate EUI
  const totalKbtu = buildingBills.reduce((sum, bill) => {
    return sum + (bill.electricKwh * 3.412) + (bill.gasTherms * 100);
  }, 0);
  
  const eui = selectedBuilding ? (totalKbtu / selectedBuilding.sqft).toFixed(1) : 0;
  const totalCost = buildingBills.reduce((sum, bill) => sum + bill.electricCost + bill.gasCost, 0);
  const costPerSqft = selectedBuilding ? (totalCost / selectedBuilding.sqft).toFixed(2) : 0;
  
  // Mock regression data
  const rSquared = 0.92;
  const baseLoad = 15000;
  const hddCoeff = 45.2;
  const cddCoeff = 68.4;

  // Capital Planning Calculations
  const currentYear = new Date().getFullYear();
  const capitalTimeline = Array.from({ length: 10 }, (_, i) => currentYear + i).map(year => {
    const assetsReachingEol = buildingAssets.filter(a => a.year + a.remainingLife === year);
    const cost = assetsReachingEol.reduce((sum, a) => sum + (a.replacementCost || 0), 0);
    return { year, count: assetsReachingEol.length, cost, assets: assetsReachingEol };
  });

  const total5YearCost = capitalTimeline.slice(0, 5).reduce((sum, t) => sum + t.cost, 0);
  const critical2YearCount = capitalTimeline.slice(0, 2).reduce((sum, t) => sum + t.assets.filter(a => a.condition === 'Critical').length, 0);

  return (
    <div className="flex flex-col h-full">
      {!projectId && (
        <div className="flex-shrink-0 border-b border-[#1C2030] bg-[#12151C] px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Facility Assessment & Benchmarking</h1>
              <p className="text-sm text-neutral-400 mt-1">Ingest utility data, normalize for weather, calculate EUI.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#1C2030] border border-[#252A3A] rounded-lg text-sm font-medium text-white hover:bg-[#252A3A] transition-colors">
                <DollarSign className="w-4 h-4" />
                Upload Bills (CSV)
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
                <Plus className="w-4 h-4" />
                Add Manual Entry
              </button>
            </div>
          </div>

          <div className="flex space-x-6 border-b border-[#1C2030]">
            <button
              onClick={() => setActiveTab('energy')}
              className={cn(
                "pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                activeTab === 'energy' 
                  ? "border-emerald-500 text-emerald-500" 
                  : "border-transparent text-neutral-400 hover:text-white hover:border-[#252A3A]"
              )}
            >
              <BarChart3 className="w-4 h-4" />
              Energy Profile
            </button>
            <button
              onClick={() => setActiveTab('capital')}
              className={cn(
                "pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                activeTab === 'capital' 
                  ? "border-emerald-500 text-emerald-500" 
                  : "border-transparent text-neutral-400 hover:text-white hover:border-[#252A3A]"
              )}
            >
              <Calendar className="w-4 h-4" />
              Capital Planning
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex items-center gap-4">
          <select 
            value={selectedBuilding?.id}
            onChange={(e) => setSelectedBuildingId(e.target.value)}
            className="bg-[#12151C] border border-[#1C2030] text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-64 p-2.5"
          >
            {displayBuildings.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        {activeTab === 'energy' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#12151C] border border-[#1C2030] rounded-xl p-6">
                <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-2">Energy Use Intensity (EUI)</h3>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-white">{eui}</span>
                  <span className="text-sm text-neutral-500 mb-1">kBtu/sqft/yr</span>
                </div>
                <div className="mt-4 pt-4 border-t border-[#1C2030]">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Portfolio Median</span>
                    <span className="text-white font-medium">65.2</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-neutral-400">National Median</span>
                    <span className="text-white font-medium">72.4</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#12151C] border border-[#1C2030] rounded-xl p-6">
                <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-2">Annual Energy Cost</h3>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-white">${totalCost.toLocaleString()}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-[#1C2030]">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Cost per SqFt</span>
                    <span className="text-white font-medium">${costPerSqft}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#12151C] border border-[#1C2030] rounded-xl p-6">
                <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-2">Weather Normalization</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-500 text-xs font-medium border border-emerald-500/20">
                    Good Fit
                  </span>
                  <span className="text-sm text-neutral-400">R² = {rSquared}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Base Load</span>
                    <span className="text-white font-mono">{baseLoad} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Cooling (CDD)</span>
                    <span className="text-white font-mono">{cddCoeff} kWh/DD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Heating (HDD)</span>
                    <span className="text-white font-mono">{hddCoeff} kWh/DD</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#12151C] border border-[#1C2030] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-6">Monthly Consumption (kWh)</h3>
              <div className="h-64 flex items-end gap-2">
                {buildingBills.map((bill, i) => {
                  const maxKwh = Math.max(...buildingBills.map(b => b.electricKwh));
                  const height = (bill.electricKwh / maxKwh) * 100;
                  return (
                    <div key={bill.id} className="flex-1 flex flex-col items-center gap-2 group relative">
                      <div 
                        className="w-full bg-blue-500/80 rounded-t-sm hover:bg-blue-400 transition-colors"
                        style={{ height: `${height}%` }}
                      >
                        <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#252A3A] text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10 pointer-events-none">
                          {bill.electricKwh.toLocaleString()} kWh
                        </div>
                      </div>
                      <span className="text-[10px] text-neutral-500 uppercase">{bill.month.split('-')[1]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#12151C] border border-[#1C2030] rounded-xl overflow-hidden">
              <div className="p-6 border-b border-[#1C2030]">
                <h3 className="text-sm font-semibold text-white">Utility Bill Ledger</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-neutral-400 uppercase bg-[#0E1118] border-b border-[#1C2030]">
                    <tr>
                      <th className="px-6 py-4 font-medium">Period</th>
                      <th className="px-6 py-4 font-medium text-right">Electric (kWh)</th>
                      <th className="px-6 py-4 font-medium text-right">Peak (kW)</th>
                      <th className="px-6 py-4 font-medium text-right">Electric Cost</th>
                      <th className="px-6 py-4 font-medium text-right">Gas (Therms)</th>
                      <th className="px-6 py-4 font-medium text-right">Gas Cost</th>
                      <th className="px-6 py-4 font-medium text-right">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C2030]">
                    {buildingBills.map((bill) => (
                      <tr key={bill.id} className="hover:bg-[#181C25] transition-colors">
                        <td className="px-6 py-4 font-medium text-white">{bill.month}</td>
                        <td className="px-6 py-4 text-right text-neutral-300 font-mono">{bill.electricKwh.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right text-neutral-300 font-mono">{bill.peakKw}</td>
                        <td className="px-6 py-4 text-right text-neutral-300 font-mono">${bill.electricCost.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right text-neutral-300 font-mono">{bill.gasTherms.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right text-neutral-300 font-mono">${bill.gasCost.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right text-white font-mono font-medium">${(bill.electricCost + bill.gasCost).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#12151C] border border-[#1C2030] rounded-xl p-6">
                <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-2">5-Year Capital Need</h3>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-white">${total5YearCost.toLocaleString()}</span>
                </div>
              </div>
              <div className="bg-[#12151C] border border-[#1C2030] rounded-xl p-6">
                <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-2">Critical Assets (2yr)</h3>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-red-500">{critical2YearCount}</span>
                </div>
              </div>
              <div className="bg-[#12151C] border border-[#1C2030] rounded-xl p-6">
                <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-2">ESPC Potential</h3>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-emerald-500">High</span>
                </div>
                <p className="text-xs text-neutral-500 mt-2">Significant overlap between EOL assets and ECM categories.</p>
              </div>
            </div>

            <div className="bg-[#12151C] border border-[#1C2030] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-6">Equipment Replacement Timeline</h3>
              <div className="space-y-4">
                {capitalTimeline.map((t) => (
                  <div key={t.year} className="flex items-center gap-4">
                    <div className="w-16 text-sm font-mono text-neutral-400">{t.year}</div>
                    <div className="flex-1 h-8 bg-[#0E1118] rounded border border-[#1C2030] flex items-center px-2 gap-1 overflow-hidden">
                      {t.assets.map(a => (
                        <div 
                          key={a.id} 
                          className={cn(
                            "h-4 rounded px-2 text-[10px] font-medium flex items-center whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity",
                            a.condition === 'Critical' ? "bg-red-500/20 text-red-500 border border-red-500/30" :
                            a.condition === 'Poor' ? "bg-amber-500/20 text-amber-500 border border-amber-500/30" :
                            "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
                          )}
                          title={`${a.type} - ${a.manufacturer} ($${a.replacementCost?.toLocaleString()})`}
                        >
                          {a.type}
                        </div>
                      ))}
                    </div>
                    <div className="w-24 text-right text-sm font-mono text-neutral-300">
                      ${t.cost.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
