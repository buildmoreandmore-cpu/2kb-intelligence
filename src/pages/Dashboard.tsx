import { useStore } from '@/store';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle2, DollarSign, Leaf } from 'lucide-react';

export function Dashboard() {
  const projects = useStore(state => state.projects);
  const risks = useStore(state => state.risks);
  const milestones = useStore(state => state.milestones);
  
  const activeProjects = projects.length;
  const totalValue = projects.reduce((sum, p) => sum + p.value, 0);
  const highRisks = risks.filter(r => r.severity === 'High' || r.severity === 'Critical').length;
  const overdueMilestones = milestones.filter(m => m.status === 'overdue').length;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Portfolio Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Executive overview of all active ESPC projects.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-[#FFFFFF] border border-[#EAEDF3] rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-blue-500" />
            </div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Projects</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{activeProjects}</p>
        </div>
        
        <div className="bg-[#FFFFFF] border border-[#EAEDF3] rounded-xl p-5 shadow-sm col-span-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-emerald-500" />
            </div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Capital Exposure</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">${(totalValue / 1000000).toFixed(1)}M</p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EAEDF3] rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-amber-500" />
            </div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg Risk</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {Math.round(projects.reduce((sum, p) => sum + p.riskScore, 0) / projects.length)}
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EAEDF3] rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">High Risks</h3>
          </div>
          <p className="text-3xl font-bold text-red-500">{highRisks}</p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EAEDF3] rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-purple-500" />
            </div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Carbon (tCO2e)</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">1,240</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#FFFFFF] border border-[#EAEDF3] rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-6">Project Pipeline</h3>
          <div className="space-y-4">
            {projects.map(project => (
              <div key={project.id} className="flex items-center justify-between p-4 rounded-lg bg-[#F8FAFB] border border-[#EAEDF3]">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{project.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{project.esco} • {project.engineer}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-2.5 py-1 rounded-md bg-[#EAEDF3] text-xs font-medium text-gray-600">
                    {project.phase}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    project.riskScore > 60 ? 'bg-red-500/20 text-red-500' :
                    project.riskScore > 40 ? 'bg-amber-500/20 text-amber-500' :
                    'bg-emerald-500/20 text-emerald-500'
                  }`}>
                    {project.riskScore}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EAEDF3] rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-6">Upcoming Milestones</h3>
          <div className="space-y-4">
            {milestones.map(milestone => (
              <div key={milestone.id} className="flex items-start gap-3">
                <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                  milestone.status === 'overdue' ? 'bg-red-500' :
                  milestone.status === 'completed' ? 'bg-emerald-500' :
                  'bg-blue-500'
                }`} />
                <div>
                  <h4 className="text-sm font-medium text-gray-700">{milestone.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{milestone.dueDate} • {milestone.assignedTo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
