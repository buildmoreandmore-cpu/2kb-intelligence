import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import { ArrowLeft, Camera, BarChart3, Calculator, ShieldCheck, HardHat, LineChart, FileText, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FieldAudit } from './FieldAudit';
import { Benchmarking } from './Benchmarking';
import { FinancialModeling } from './FinancialModeling';
import { Governance } from './Governance';
import { Construction } from './Construction';
import { MV } from './MV';
import { Drawings } from './Drawings';

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = useStore(state => state.projects.find(p => p.id === id));
  const org = useStore(state => state.organizations.find(o => o.id === project?.orgId));

  const [activeTab, setActiveTab] = useState<'audit' | 'drawings' | 'energy' | 'financial' | 'governance' | 'construction' | 'mv'>('audit');

  if (!project) {
    return <div className="p-8 text-gray-500">Project not found</div>;
  }

  const tabs = [
    { id: 'audit', label: 'Audit', icon: Camera },
    { id: 'drawings', label: 'Drawings', icon: MapPin },
    { id: 'energy', label: 'Energy', icon: BarChart3 },
    { id: 'financial', label: 'Financial', icon: Calculator },
    { id: 'governance', label: 'Governance', icon: ShieldCheck },
    { id: 'construction', label: 'Construction', icon: HardHat },
    { id: 'mv', label: 'M&V', icon: LineChart },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F4F6FA]">
      <div className="flex-shrink-0 border-b border-[#EAEDF3] bg-[#FFFFFF] px-8 py-6">
        <button 
          onClick={() => navigate('/projects')}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </button>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{project.name}</h1>
            <p className="text-sm text-gray-500 mt-1">{org?.name} • {project.esco} • ${(project.value / 1000000).toFixed(1)}M</p>
          </div>
          <span className={cn(
            "px-3 py-1.5 rounded text-sm font-medium border",
            project.phase === 'Construction' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
            project.phase === 'M&V' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
            "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
          )}>
            {project.phase.toUpperCase()}
          </span>
        </div>

        <div className="flex space-x-6 border-b border-[#EAEDF3]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                activeTab === tab.id 
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'audit' && <FieldAudit projectId={project.id} />}
        {activeTab === 'drawings' && <Drawings projectId={project.id} />}
        {activeTab === 'energy' && <Benchmarking projectId={project.id} />}
        {activeTab === 'financial' && <FinancialModeling projectId={project.id} />}
        {activeTab === 'governance' && <Governance projectId={project.id} />}
        {activeTab === 'construction' && <Construction projectId={project.id} />}
        {activeTab === 'mv' && <MV projectId={project.id} />}
      </div>
    </div>
  );
}
