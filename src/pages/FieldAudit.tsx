import { useState } from 'react';
import { useStore } from '@/store';
import { Camera, Upload, Mic, AlertTriangle, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FieldAudit({ projectId }: { projectId?: string }) {
  const [activeTab, setActiveTab] = useState<'capture' | 'assets'>('assets');
  const [searchQuery, setSearchQuery] = useState('');
  
  const allAssets = useStore(state => state.assets);
  const projects = useStore(state => state.projects);
  const buildings = useStore(state => state.buildings);

  let displayAssets = allAssets;
  
  if (projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      const projectBuildings = buildings.filter(b => b.orgId === project.orgId).map(b => b.id);
      displayAssets = allAssets.filter(a => projectBuildings.includes(a.buildingId));
    }
  }

  const filteredAssets = displayAssets.filter(a => 
    a.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {!projectId && (
        <div className="flex-shrink-0 border-b border-[#1E2A45] bg-[#121C35] px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Field Audit & Asset Intelligence</h1>
              <p className="text-sm text-[#7A8BA8] mt-1">Capture equipment data, transcribe notes, and flag deficiencies.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#EAEDF3] border border-[#D4D8E2] rounded-lg text-sm font-medium text-[#9AA5B8] hover:bg-[#D4D8E2] transition-colors">
                <Upload className="w-4 h-4" />
                Batch Upload
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
                <Camera className="w-4 h-4" />
                New Capture
              </button>
            </div>
          </div>

          <div className="flex space-x-6 border-b border-[#1E2A45]">
            <button
              onClick={() => setActiveTab('assets')}
              className={cn(
                "pb-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === 'assets' 
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-[#7A8BA8] hover:text-white hover:border-[#2A3A5C]"
              )}
            >
              Asset Database
            </button>
            <button
              onClick={() => setActiveTab('capture')}
              className={cn(
                "pb-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === 'capture' 
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-[#7A8BA8] hover:text-white hover:border-[#2A3A5C]"
              )}
            >
              AI Extraction Queue
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full">
        {activeTab === 'assets' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input 
                  type="text" 
                  placeholder="Search assets by type or manufacturer..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#121C35] border border-[#1E2A45] rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
                />
              </div>
              <button className="inline-flex items-center gap-2 px-3 py-2 bg-[#EAEDF3] border border-[#D4D8E2] rounded-lg text-sm font-medium text-[#9AA5B8] hover:bg-[#D4D8E2] transition-colors shadow-sm">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssets.map((asset) => (
                <div key={asset.id} className="bg-[#121C35] border border-[#1E2A45] rounded-xl overflow-hidden hover:border-emerald-500/50 transition-colors group cursor-pointer">
                  <div className="h-48 relative bg-[#0F1829]">
                    <img 
                      src={`https://picsum.photos/seed/${asset.id}/400/300?blur=2`} 
                      alt={asset.type}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      {asset.flags.length > 0 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/20 text-red-500 text-xs font-medium border border-red-500/30 backdrop-blur-sm">
                          <AlertTriangle className="w-3 h-3" />
                          {asset.flags.length} Flags
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-600 transition-colors">{asset.type}</h3>
                        <p className="text-sm text-[#7A8BA8]">{buildings.find(b => b.id === asset.buildingId)?.name}</p>
                      </div>
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                        asset.condition === 'Good' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                        asset.condition === 'Poor' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                        "bg-red-500/10 text-red-500 border-red-500/20"
                      )}>
                        {asset.condition}
                      </span>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                      <div>
                        <span className="block text-[#7A8BA8] text-xs font-medium uppercase tracking-wider mb-1">Make/Model</span>
                        <span className="text-[#9AA5B8] font-medium">{asset.manufacturer} {asset.model}</span>
                      </div>
                      <div>
                        <span className="block text-[#7A8BA8] text-xs font-medium uppercase tracking-wider mb-1">Year</span>
                        <span className="text-[#9AA5B8] font-medium">{asset.year}</span>
                      </div>
                    </div>

                    {asset.flags.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-[#1E2A45]">
                        <div className="flex flex-wrap gap-2">
                          {asset.flags.map((flag, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-1 rounded bg-red-500/10 text-red-500 text-xs font-medium border border-red-500/20">
                              {flag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {filteredAssets.length === 0 && (
                <div className="col-span-full p-8 text-center text-[#7A8BA8]">No assets found.</div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#121C35] border border-[#1E2A45] rounded-xl overflow-hidden">
              <div className="p-6 border-b border-[#1E2A45] bg-[#0F1829]">
                <h3 className="text-lg font-medium text-white mb-2">AI Extraction Queue</h3>
                <p className="text-sm text-[#7A8BA8]">Upload nameplate photos or record voice notes. Claude will extract structured data and flag deficiencies automatically.</p>
              </div>
              
              <div className="p-8">
                <div className="border-2 border-dashed border-[#D4D8E2] rounded-xl p-12 flex flex-col items-center justify-center text-center hover:bg-[#F0F2F6] hover:border-emerald-500/50 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 bg-[#EAEDF3] text-emerald-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Camera className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-1">Upload Equipment Photos</h4>
                  <p className="text-sm text-[#7A8BA8] max-w-sm">Drag and drop nameplate photos, wide shots, or inspection documents here.</p>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <div className="flex-1 h-px bg-[#EAEDF3]"></div>
                  <span className="text-sm font-medium text-[#5A6B88] uppercase tracking-wider">OR</span>
                  <div className="flex-1 h-px bg-[#EAEDF3]"></div>
                </div>

                <div className="mt-8 text-center">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#EAEDF3] border border-[#D4D8E2] rounded-full text-[#9AA5B8] font-medium hover:border-emerald-500 hover:text-emerald-600 transition-colors shadow-sm">
                    <Mic className="w-5 h-5" />
                    Record Voice Audit Note
                  </button>
                  <p className="text-xs text-[#7A8BA8] mt-3">Whisper will transcribe and Claude will structure the data.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
