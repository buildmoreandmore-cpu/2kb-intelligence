import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-[#060E09] text-white flex flex-col overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 hero-gradient-bg">
        <div className="energy-blob energy-blob-1" />
        <div className="energy-blob energy-blob-2" />
        <div className="energy-blob energy-blob-3" />
        <div className="energy-grid" />
      </div>
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      {/* Center content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        <img src="/logo.webp" alt="2KB Energy" className="w-32 h-32 object-contain mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          <span className="text-white">2KB</span>{' '}
          <span className="text-teal-400">Intelligence</span>
        </h1>

        <p className="text-base text-white/50 max-w-md mb-10 leading-relaxed">
          Project oversight &amp; client visibility for ESPC programs
        </p>

        {/* Dual CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => navigate('/app')}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#060E09] text-sm font-semibold rounded-full hover:bg-teal-50 transition-colors duration-200 min-w-[200px] justify-center"
          >
            <Icon icon="solar:login-3-bold-duotone" className="w-5 h-5" />
            Engineer Login
          </button>
          <button
            onClick={() => navigate('/client')}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white text-sm font-semibold rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-200 min-w-[200px] justify-center"
          >
            <Icon icon="solar:monitor-bold-duotone" className="w-5 h-5 text-teal-400" />
            Client Dashboard
          </button>
        </div>
      </div>

      {/* Minimal footer */}
      <footer className="relative z-10 py-6 text-center">
        <div className="flex items-center justify-center gap-4 text-xs text-white/25">
          <span>&copy; {new Date().getFullYear()} 2KB Energy Services, LLC</span>
          <span className="text-white/10">·</span>
          <a
            href="https://2kbenergyservices.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/40 transition-colors duration-200"
          >
            2kbenergyservices.com
          </a>
        </div>
      </footer>
    </div>
  );
}
