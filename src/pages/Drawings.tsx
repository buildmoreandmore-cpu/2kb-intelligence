import { useState } from 'react';
import { useStore } from '@/store';
import { Upload, MapPin, Search, Filter, Maximize2, X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Drawings({ projectId }: { projectId: string }) {
  const drawings = useStore(state => state.drawings.filter(d => d.projectId === projectId));
  const buildings = useStore(state => state.buildings);
  const assets = useStore(state => state.assets);

  const [selectedDrawing, setSelectedDrawing] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const drawing = drawings.find(d => d.id === selectedDrawing);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search drawings by name or type..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#12151C] border border-[#1C2030] rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-3 py-2 bg-[#1C2030] border border-[#252A3A] rounded-lg text-sm font-medium text-white hover:bg-[#252A3A] transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-emerald-700 transition-colors shadow-sm">
              <Upload className="w-4 h-4" />
              Upload Drawing
            </button>
          </div>
        </div>

        <div className="bg-[#12151C] border border-[#1C2030] rounded-xl overflow-hidden">
          <div className="p-6 border-b border-[#1C2030]">
            <h3 className="text-sm font-semibold text-white">Facility Drawings & Plans</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-neutral-400 uppercase bg-[#0E1118] border-b border-[#1C2030]">
                <tr>
                  <th className="px-6 py-4 font-medium">Filename</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Building</th>
                  <th className="px-6 py-4 font-medium">Version</th>
                  <th className="px-6 py-4 font-medium">Uploaded</th>
                  <th className="px-6 py-4 font-medium">Annotations</th>
                  <th className="px-6 py-4 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C2030]">
                {drawings.filter(d => d.filename.toLowerCase().includes(searchQuery.toLowerCase())).map((d) => (
                  <tr key={d.id} className="hover:bg-[#181C25] transition-colors cursor-pointer group" onClick={() => setSelectedDrawing(d.id)}>
                    <td className="px-6 py-4 font-medium text-white group-hover:text-emerald-400 transition-colors">{d.filename}</td>
                    <td className="px-6 py-4 text-neutral-300">{d.type}</td>
                    <td className="px-6 py-4 text-neutral-300">{buildings.find(b => b.id === d.buildingId)?.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded bg-[#1C2030] text-xs font-medium border border-[#252A3A] text-neutral-300">
                        {d.version}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-300 font-mono text-xs">
                      {d.date} <br/> <span className="text-neutral-500">by {d.by}</span>
                    </td>
                    <td className="px-6 py-4">
                      {d.annotations > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium border border-emerald-500/20">
                          <MapPin className="w-3 h-3" />
                          {d.annotations}
                        </span>
                      ) : (
                        <span className="text-neutral-500 text-xs">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-neutral-400 hover:text-white hover:bg-[#1C2030] rounded transition-colors">
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {drawings.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-neutral-500">No drawings uploaded for this project.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Drawing Detail Modal */}
      {selectedDrawing && drawing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8">
          <div className="bg-[#12151C] border border-[#1C2030] rounded-2xl w-full h-full max-w-7xl flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-[#1C2030] bg-[#0E1118]">
              <div>
                <h2 className="text-lg font-bold text-white">{drawing.filename}</h2>
                <p className="text-sm text-neutral-400">{drawing.type} • {drawing.version}</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1C2030] border border-[#252A3A] rounded-lg text-xs font-medium text-white hover:bg-[#252A3A] transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  Add Pin
                </button>
                <button 
                  onClick={() => setSelectedDrawing(null)}
                  className="p-2 text-neutral-400 hover:text-white hover:bg-[#1C2030] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-[#0B0E13] relative overflow-hidden flex items-center justify-center p-8">
              {/* Simulated Drawing Canvas */}
              <div className="relative w-full max-w-4xl aspect-[4/3] bg-white rounded shadow-lg border border-neutral-200 overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${drawing.id}/1200/900?grayscale`} 
                  alt="Drawing Placeholder" 
                  className="w-full h-full object-cover opacity-50"
                  referrerPolicy="no-referrer"
                />
                
                {/* Simulated Annotations */}
                <div className="absolute top-1/4 left-1/3 group cursor-pointer">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#12151C] border border-[#1C2030] rounded shadow-xl p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <p className="text-xs font-bold text-white mb-1">RTU-4</p>
                    <p className="text-[10px] text-neutral-400">Linked to Asset: {assets.find(a => a.type === 'AHU')?.manufacturer} {assets.find(a => a.type === 'AHU')?.model}</p>
                  </div>
                </div>

                <div className="absolute top-1/2 left-2/3 group cursor-pointer">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#12151C] border border-[#1C2030] rounded shadow-xl p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <p className="text-xs font-bold text-white mb-1">Chiller Plant</p>
                    <p className="text-[10px] text-neutral-400">Linked to Asset: {assets.find(a => a.type === 'Chiller')?.manufacturer} {assets.find(a => a.type === 'Chiller')?.model}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
