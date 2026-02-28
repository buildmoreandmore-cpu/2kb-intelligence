import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#060E09] text-white">
      {/* ─── SECTION 1: HERO ─── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 hero-gradient-bg">
          <div className="energy-blob energy-blob-1" />
          <div className="energy-blob energy-blob-2" />
          <div className="energy-blob energy-blob-3" />
          <div className="energy-grid" />
        </div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        {/* Nav */}
        <nav className="relative z-10 px-6 md:px-12 py-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.webp" alt="2KB Energy" className="w-9 h-9 object-contain" />
              <span className="font-semibold text-white text-lg tracking-tight">Intelligence</span>
            </div>
            <span className="text-xs text-white/25 font-mono hidden md:block">2KB Energy Services, LLC</span>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-3xl mb-6">
            Your ESPC Program.
            <br />
            <span className="text-emerald-400">One Platform.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-xl mb-12 leading-relaxed">
            Project oversight for 2KB engineers. Real-time visibility for building owners.
          </p>

          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/app')}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#060E09] text-sm font-semibold rounded-full hover:bg-emerald-50 transition-colors duration-200 min-w-[200px] justify-center"
            >
              <Icon icon="solar:login-3-bold-duotone" className="w-5 h-5" />
              Engineer Login
            </button>
            <button
              onClick={() => navigate('/client')}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white text-sm font-semibold rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-200 min-w-[200px] justify-center"
            >
              <Icon icon="solar:monitor-bold-duotone" className="w-5 h-5 text-emerald-400" />
              Client Dashboard
            </button>
          </div>

          {/* Anchor link */}
          <button
            onClick={() => document.getElementById('what-this-is')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm text-white/30 hover:text-white/60 transition-colors duration-200 flex items-center gap-2"
          >
            New here? See what the platform does.
            <Icon icon="solar:arrow-down-bold-duotone" className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060E09] to-transparent" />
      </section>

      {/* ─── SECTION 2: WHAT THIS IS ─── */}
      <section id="what-this-is" className="bg-white text-gray-900 py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-600 mb-6 block">
            What This Is
          </span>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-700">
            2KB built this platform to run smarter ESPC programs. Our engineers use it to manage
            audits, model financials, track construction, and verify savings. Our clients use it to
            see exactly where their projects stand — savings performance, milestones, risks, and
            deliverables — in real time, without waiting for a monthly report.
          </p>
        </div>
      </section>

      {/* ─── SECTION 3: TWO-PANEL SPLIT ─── */}
      <section className="bg-[#F4F6FA] text-gray-900 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Engineers panel */}
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Icon icon="solar:settings-bold-duotone" className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">For 2KB Engineers</h3>
              <ul className="space-y-4 mb-8">
                {[
                  'Field audit capture and asset management',
                  'Financial modeling and proposal analysis',
                  'Project governance across every phase',
                  'Automated reports and deliverables',
                  'Institutional knowledge that stays with the firm',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600">
                    <Icon icon="solar:check-circle-bold-duotone" className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-400">
                Internal access only. Contact your admin for credentials.
              </p>
            </div>

            {/* Building owners panel */}
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Icon icon="solar:buildings-2-bold-duotone" className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">For Building Owners</h3>
              <ul className="space-y-4 mb-8">
                {[
                  'Real-time project status and milestone tracking',
                  'Savings performance vs. contractual guarantees',
                  'Financial summaries and carbon impact',
                  'Document access — reports, submittals, change orders',
                  'Direct line to your project team',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600">
                    <Icon icon="solar:check-circle-bold-duotone" className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-400">
                Client access provided during engagement. Contact your 2KB project lead.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: CLIENT DASHBOARD PREVIEW ─── */}
      <section className="bg-white text-gray-900 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-3">
              Your project. Your data. Anytime.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#F8FAFB] rounded-2xl p-8 border border-gray-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Icon icon="solar:flag-bold-duotone" className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Project Status</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Know where your ESPC stands at any moment — current phase, upcoming milestones,
                and who's responsible for what.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F8FAFB] rounded-2xl p-8 border border-gray-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Icon icon="solar:graph-up-bold-duotone" className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Savings Tracking</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                See how actual savings compare to guarantees, updated as data comes in.
                No waiting for annual reports.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F8FAFB] rounded-2xl p-8 border border-gray-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Icon icon="solar:folder-check-bold-duotone" className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Documents & Decisions</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Access every report, change order, and deliverable in one place.
                Review and approve without chasing emails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: TRUST STRIP ─── */}
      <section className="bg-[#060E09] py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p className="text-lg md:text-xl text-white/60 font-medium leading-relaxed">
            Purpose-built for Energy Savings Performance Contracts.
            <span className="text-white/30"> Not repurposed from building operations software.</span>
          </p>
        </div>
      </section>

      {/* ─── SECTION 6: FOOTER ─── */}
      <footer className="bg-[#060E09] border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Left: Logo + contact */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img src="/logo.webp" alt="2KB Energy" className="w-8 h-8 object-contain" />
                <span className="font-semibold text-white tracking-tight">2KB Energy Services, LLC</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-white/30">info@2kbenergyservices.com</p>
                <p className="text-sm text-white/30">(404) 555-2KB1</p>
              </div>
            </div>

            {/* Right: Links + copyright */}
            <div className="text-right space-y-3">
              <div className="flex items-center gap-6">
                <span className="text-xs text-white/20 hover:text-white/40 cursor-pointer transition-colors">
                  Privacy Policy
                </span>
                <span className="text-xs text-white/20 hover:text-white/40 cursor-pointer transition-colors">
                  Terms of Use
                </span>
              </div>
              <p className="text-xs text-white/15">
                &copy; {new Date().getFullYear()} 2KB Energy Services, LLC. All rights reserved.
              </p>
              <p className="text-[10px] text-white/10">Powered by 2KB</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
