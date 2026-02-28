import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from '@iconify/react';

const CAPABILITIES = [
  {
    num: '01',
    title: 'Energy Auditing & Field Intelligence',
    description:
      'We deploy advanced field audit technology to capture, classify, and analyze every asset across your building portfolio — transforming raw inspections into actionable intelligence.',
  },
  {
    num: '02',
    title: "Owner's Representation & Governance",
    description:
      'We serve as the technical bridge between building owners and ESCOs — ensuring transparency, accountability, and maximum value throughout the entire ESPC lifecycle.',
  },
  {
    num: '03',
    title: 'Construction Management & M&V',
    description:
      'From construction oversight to measurement & verification, we ensure every dollar of guaranteed savings is engineered, installed, and proven to perform.',
  },
];

const SERVICE_CARDS = [
  {
    icon: 'solar:buildings-2-bold-duotone',
    title: 'Field Audit Intelligence',
    description:
      'AI-powered asset capture, deficiency detection, and building-wide energy analytics from the field to the dashboard.',
    accent: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
  {
    icon: 'solar:shield-check-bold-duotone',
    title: "Owner's Representation",
    description:
      "Independent oversight ensuring your ESPC project delivers on every promise — from RFP through closeout.",
    accent: 'bg-[#0F1F17]',
    iconColor: 'text-emerald-400',
    dark: true,
  },
  {
    icon: 'solar:chart-square-bold-duotone',
    title: 'M&V Performance Tracking',
    description:
      'Real-time savings verification against contractual guarantees, with transparent reporting for all stakeholders.',
    accent: 'bg-gray-100',
    iconColor: 'text-emerald-600',
  },
];

const NAV_LINKS = ['Services', 'Platform', 'About'];

export function Landing() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CAPABILITIES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#060E09] text-white overflow-x-hidden">
      {/* ─── Navigation ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#060E09]/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <span className="text-white font-bold text-sm tracking-tight">2KB</span>
            </div>
            <span className="font-semibold text-white text-lg tracking-tight">Intelligence</span>
          </div>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md rounded-full px-1.5 py-1.5 border border-white/10">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() =>
                  scrollToSection(link.toLowerCase())
                }
                className="px-5 py-2 text-sm font-medium text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-all duration-200"
              >
                {link}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate('/app')}
            className="px-5 py-2.5 bg-white text-[#060E09] text-sm font-semibold rounded-full hover:bg-emerald-50 transition-colors duration-200"
          >
            Launch Platform
          </button>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Animated energy background */}
        <div className="absolute inset-0 hero-gradient-bg">
          <div className="energy-blob energy-blob-1" />
          <div className="energy-blob energy-blob-2" />
          <div className="energy-blob energy-blob-3" />
          <div className="energy-grid" />
        </div>

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-24">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-400">
              Energy Performance Intelligence
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] max-w-5xl mb-8"
          >
            Engineering the
            <br />
            future of{' '}
            <span className="text-emerald-400">energy</span>
            <br />
            performance.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-white/50 max-w-xl mb-12 leading-relaxed"
          >
            2KB Energy Services delivers independent oversight, advanced analytics,
            and proven performance tracking for ESPC projects nationwide.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToSection('services')}
              className="group inline-flex items-center gap-3 px-7 py-4 bg-emerald-500 text-white text-sm font-semibold rounded-full hover:bg-emerald-400 transition-all duration-200 shadow-lg shadow-emerald-500/25"
            >
              <Icon icon="solar:bolt-circle-bold-duotone" className="w-5 h-5" />
              Discover Our Platform
              <Icon
                icon="solar:arrow-right-bold-duotone"
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={() => navigate('/client')}
              className="inline-flex items-center gap-3 px-7 py-4 bg-white/5 text-white text-sm font-semibold rounded-full border border-white/10 hover:bg-white/10 backdrop-blur-sm transition-all duration-200"
            >
              <Icon icon="solar:monitor-bold-duotone" className="w-5 h-5 text-emerald-400" />
              Client Portal
            </button>
          </motion.div>
        </div>

        {/* Scrolling capabilities counter */}
        <div className="relative z-10 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
            <div className="flex items-start gap-8 md:gap-16">
              {/* Counter */}
              <div className="flex-shrink-0 flex flex-col items-center gap-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30">
                  What We Do
                </span>
                <div className="flex items-center gap-1.5">
                  {CAPABILITIES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === activeSlide ? 'w-8 bg-emerald-400' : 'w-2 bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-mono text-white/40">
                  {String(activeSlide + 1).padStart(2, '0')}/{String(CAPABILITIES.length).padStart(2, '0')}
                </span>
              </div>

              {/* Capability text */}
              <div className="flex-1 min-h-[120px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                      {CAPABILITIES[activeSlide].title}
                    </h3>
                    <p className="text-base text-white/40 max-w-2xl leading-relaxed">
                      {CAPABILITIES[activeSlide].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services Section ─── */}
      <section id="services" className="bg-white text-gray-900 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 mb-4 block">
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-gray-900">
              Full-lifecycle ESPC{' '}
              <span className="text-emerald-600">intelligence</span> for building owners.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SERVICE_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-2xl p-8 md:p-10 flex flex-col ${
                  card.dark ? 'bg-[#0F1F17] text-white' : card.accent
                } ${!card.dark ? 'border border-gray-100' : ''}`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-8 ${
                    card.dark ? 'bg-emerald-500/15' : 'bg-emerald-100'
                  }`}
                >
                  <Icon icon={card.icon} className={`w-7 h-7 ${card.iconColor}`} />
                </div>
                <h3
                  className={`text-xl font-bold mb-3 tracking-tight ${
                    card.dark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    card.dark ? 'text-white/60' : 'text-gray-500'
                  }`}
                >
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Platform Section ─── */}
      <section id="platform" className="bg-[#F4F6FA] text-gray-900 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-600 mb-4 block">
                The Platform
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-gray-900 mb-6">
                One platform.
                <br />
                Every phase.
              </h2>
              <p className="text-lg text-gray-500 mb-10 leading-relaxed max-w-md">
                From initial field audit through 20-year M&V tracking — manage the
                entire ESPC lifecycle in a single intelligent workspace.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: 'solar:camera-bold-duotone', label: 'Field Auditing' },
                  { icon: 'solar:graph-up-bold-duotone', label: 'Benchmarking' },
                  { icon: 'solar:calculator-bold-duotone', label: 'Financial Modeling' },
                  { icon: 'solar:clipboard-check-bold-duotone', label: 'Governance' },
                  { icon: 'solar:buildings-bold-duotone', label: 'Construction Mgt' },
                  { icon: 'solar:chart-2-bold-duotone', label: 'M&V Tracking' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 py-2.5">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-200 shadow-sm">
                      <Icon icon={item.icon} className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '150+', label: 'Buildings Audited', icon: 'solar:buildings-2-bold-duotone' },
                { value: '$2.1B', label: 'Project Value Managed', icon: 'solar:wallet-bold-duotone' },
                { value: '99.2%', label: 'M&V Achievement Rate', icon: 'solar:graph-up-bold-duotone' },
                { value: '15K+', label: 'Assets Cataloged', icon: 'solar:server-bold-duotone' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                >
                  <Icon icon={stat.icon} className="w-6 h-6 text-emerald-500 mb-4" />
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── About Section ─── */}
      <section id="about" className="bg-[#060E09] text-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-emerald-400 mb-4 block">
                About 2KB
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
                Built by engineers.
                <br />
                For engineers.
              </h2>
              <p className="text-lg text-white/50 leading-relaxed mb-8 max-w-md">
                2KB Energy Services is an independent energy consulting firm
                specializing in ESPC project delivery, owner's representation,
                and performance assurance for public and institutional building owners.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/15 rounded-full flex items-center justify-center">
                  <Icon icon="solar:verified-check-bold-duotone" className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-sm font-medium text-white/60">Trusted by government agencies nationwide</span>
              </div>
            </div>

            {/* Portal entry */}
            <div className="space-y-4">
              <button
                onClick={() => navigate('/app')}
                className="group w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 rounded-2xl p-8 text-left transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Icon icon="solar:widget-bold-duotone" className="w-6 h-6 text-white" />
                  </div>
                  <Icon
                    icon="solar:arrow-right-up-bold-duotone"
                    className="w-5 h-5 text-white/30 group-hover:text-emerald-400 transition-colors"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-1.5">Team Platform</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  Full ESPC project management suite for 2KB engineers, auditors, and project managers.
                </p>
              </button>

              <button
                onClick={() => navigate('/client')}
                className="group w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 rounded-2xl p-8 text-left transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Icon icon="solar:monitor-bold-duotone" className="w-6 h-6 text-white" />
                  </div>
                  <Icon
                    icon="solar:arrow-right-up-bold-duotone"
                    className="w-5 h-5 text-white/30 group-hover:text-blue-400 transition-colors"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-1.5">Client Portal</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  Monitor project progress, track savings vs. guarantees, and review milestones.
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-[#060E09] border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-emerald-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">2KB</span>
            </div>
            <span className="text-sm text-white/30">
              &copy; {new Date().getFullYear()} 2KB Energy Services
            </span>
          </div>
          <span className="text-xs text-white/20 font-mono">Intelligence v2.1</span>
        </div>
      </footer>
    </div>
  );
}
