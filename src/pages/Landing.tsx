import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#EAEDF3] px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow shadow-emerald-900/20">
            <span className="text-white font-bold text-sm">2KB</span>
          </div>
          <div>
            <span className="font-semibold text-gray-900">Intelligence</span>
            <span className="ml-2 text-xs text-gray-400">Energy Services Platform</span>
          </div>
        </div>
        <span className="text-xs text-gray-400 font-mono">v2.1</span>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-medium text-emerald-700 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            System Online
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
            2KB Energy Intelligence
          </h1>
          <p className="text-gray-500 max-w-xs mx-auto leading-relaxed">
            Select your portal to continue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          {/* Team Platform */}
          <button
            onClick={() => navigate('/app')}
            className="group bg-white border border-[#EAEDF3] rounded-2xl p-8 text-left hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-200"
          >
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-600/25 group-hover:scale-105 transition-transform duration-200">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1.5">Team Platform</h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Full project management suite for 2KB engineers and project managers.
            </p>
            <ul className="space-y-2.5 mb-8">
              {[
                'Project pipeline & governance',
                'Field audit & asset intelligence',
                'Financial modeling & M&V',
                'Reporting & workflow automation',
              ].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm group-hover:gap-3 transition-all duration-150">
              Enter Platform
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          {/* Client Portal */}
          <button
            onClick={() => navigate('/client')}
            className="group bg-white border border-[#EAEDF3] rounded-2xl p-8 text-left hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-200"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/25 group-hover:scale-105 transition-transform duration-200">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1.5">Client Portal</h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Monitor your project progress, track savings, and review key milestones.
            </p>
            <ul className="space-y-2.5 mb-8">
              {[
                'Project status & phase tracker',
                'Savings vs. guarantee (M&V)',
                'Milestone & schedule overview',
                'Inspection findings log',
              ].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all duration-150">
              Enter Portal
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-gray-400">
        © 2025 2KB Energy Services · Confidential
      </footer>
    </div>
  );
}
