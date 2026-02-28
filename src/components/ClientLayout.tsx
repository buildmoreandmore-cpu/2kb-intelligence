import { Outlet, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function ClientLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex flex-col">
      <header className="bg-white border-b border-[#EAEDF3] px-8 h-16 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="w-px h-5 bg-[#EAEDF3]" />
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-emerald-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-[11px]">2KB</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900 text-sm">Client Portal</span>
              <span className="ml-2 text-xs text-gray-400">Read-only view</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs text-gray-500">Live Data</span>
        </div>
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
