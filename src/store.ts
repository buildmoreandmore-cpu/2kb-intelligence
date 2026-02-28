import { create } from 'zustand';

export type Phase = 'Prospect' | 'Audit' | 'IGEA' | 'RFP' | 'Contract' | 'Construction' | 'M&V' | 'Closeout';
export type ServiceLineMode = 'Full' | 'Audit' | 'OR' | 'Construction';

export const seedData = {
  serviceLineMode: 'Full' as ServiceLineMode,
  organizations: [
    { id: 'o1', name: 'Clayton County School District' },
    { id: 'o2', name: 'City of Morrow' },
    { id: 'o3', name: 'Henry County Government' }
  ],
  buildings: [
    { id: 'b1', orgId: 'o1', name: 'Lincoln Elementary', type: 'K-12 School', sqft: 68000, yearBuilt: 1972 },
    { id: 'b2', orgId: 'o2', name: 'City Hall Annex', type: 'Office', sqft: 42000, yearBuilt: 1985 },
    { id: 'b3', orgId: 'o2', name: 'Westside Recreation Center', type: 'Recreation', sqft: 31000, yearBuilt: 1994 },
    { id: 'b4', orgId: 'o3', name: 'Public Safety Complex', type: 'Public Safety', sqft: 55000, yearBuilt: 1968 }
  ],
  projects: [
    { id: 'p1', orgId: 'o1', name: 'Clayton County Schools ESPC', phase: 'Audit' as Phase, esco: 'Trane', value: 0, riskScore: 35, engineer: 'Martin' },
    { id: 'p2', orgId: 'o2', name: 'City of Morrow Municipal', phase: 'IGEA' as Phase, esco: 'Honeywell', value: 4200000, riskScore: 58, engineer: 'Sarah' },
    { id: 'p3', orgId: 'o3', name: 'Henry County Public Safety', phase: 'Construction' as Phase, esco: 'Johnson Controls', value: 7800000, riskScore: 72, engineer: 'David' }
  ],
  assets: [
    { id: 'a1', buildingId: 'b1', type: 'Chiller', manufacturer: 'Trane', model: 'CVHF', year: 2005, condition: 'Poor', ecmCategory: 'HVAC', remainingLife: 2, flags: ['R-22 Refrigerant', 'Past Useful Life'], aiConfidence: 0.95, replacementCost: 150000 },
    { id: 'a2', buildingId: 'b1', type: 'AHU', manufacturer: 'Carrier', model: 'Aero 39M', year: 2018, condition: 'Good', ecmCategory: 'HVAC', remainingLife: 15, flags: [], aiConfidence: 0.88, replacementCost: 45000 },
    { id: 'a3', buildingId: 'b2', type: 'Boiler', manufacturer: 'Cleaver-Brooks', model: 'CB-LE', year: 1998, condition: 'Critical', ecmCategory: 'HVAC', remainingLife: 0, flags: ['Safety Risk', 'Efficiency Below Standard'], aiConfidence: 0.92, replacementCost: 85000 },
    { id: 'a4', buildingId: 'b4', type: 'Lighting', manufacturer: 'Lithonia', model: 'T8 Troffer', year: 2010, condition: 'Fair', ecmCategory: 'Lighting', remainingLife: 5, flags: ['Efficiency Below Standard'], aiConfidence: 0.99, replacementCost: 120000 }
  ],
  utilityBills: [
    { id: 'u1', buildingId: 'b1', month: '2024-01', electricKwh: 45000, electricCost: 4500, gasTherms: 1200, gasCost: 1200, peakKw: 150 },
    { id: 'u2', buildingId: 'b1', month: '2024-02', electricKwh: 42000, electricCost: 4200, gasTherms: 1000, gasCost: 1000, peakKw: 145 },
    { id: 'u3', buildingId: 'b1', month: '2024-03', electricKwh: 48000, electricCost: 4800, gasTherms: 800, gasCost: 800, peakKw: 160 },
    { id: 'u4', buildingId: 'b1', month: '2024-04', electricKwh: 55000, electricCost: 5500, gasTherms: 400, gasCost: 400, peakKw: 180 },
    { id: 'u5', buildingId: 'b1', month: '2024-05', electricKwh: 65000, electricCost: 6500, gasTherms: 100, gasCost: 100, peakKw: 210 },
    { id: 'u6', buildingId: 'b1', month: '2024-06', electricKwh: 75000, electricCost: 7500, gasTherms: 50, gasCost: 50, peakKw: 250 },
    { id: 'u7', buildingId: 'b1', month: '2024-07', electricKwh: 80000, electricCost: 8000, gasTherms: 50, gasCost: 50, peakKw: 260 },
    { id: 'u8', buildingId: 'b1', month: '2024-08', electricKwh: 82000, electricCost: 8200, gasTherms: 50, gasCost: 50, peakKw: 265 },
    { id: 'u9', buildingId: 'b1', month: '2024-09', electricKwh: 70000, electricCost: 7000, gasTherms: 100, gasCost: 100, peakKw: 230 },
    { id: 'u10', buildingId: 'b1', month: '2024-10', electricKwh: 58000, electricCost: 5800, gasTherms: 300, gasCost: 300, peakKw: 190 },
    { id: 'u11', buildingId: 'b1', month: '2024-11', electricKwh: 48000, electricCost: 4800, gasTherms: 800, gasCost: 800, peakKw: 160 },
    { id: 'u12', buildingId: 'b1', month: '2024-12', electricKwh: 46000, electricCost: 4600, gasTherms: 1100, gasCost: 1100, peakKw: 155 }
  ],
  ecms: [
    { id: 'e1', projectId: 'p2', number: 'ECM-1', description: 'LED Lighting Upgrade', category: 'Lighting', cost: 450000, savings: 65000, life: 15 },
    { id: 'e2', projectId: 'p2', number: 'ECM-2', description: 'Chiller Replacement', category: 'HVAC', cost: 1200000, savings: 85000, life: 20 },
    { id: 'e3', projectId: 'p2', number: 'ECM-3', description: 'Building Automation', category: 'Controls', cost: 350000, savings: 45000, life: 15 },
    { id: 'e4', projectId: 'p2', number: 'ECM-4', description: 'Water Conservation', category: 'Water', cost: 150000, savings: 25000, life: 10 }
  ],
  milestones: [
    { id: 'm1', projectId: 'p1', name: 'Kickoff Meeting', dueDate: '2024-01-15', status: 'completed', assignedTo: 'Martin' },
    { id: 'm2', projectId: 'p1', name: 'Audit Report Draft', dueDate: '2024-03-01', status: 'overdue', assignedTo: 'Martin' },
    { id: 'm3', projectId: 'p2', name: 'IGEA Review', dueDate: '2024-04-15', status: 'in progress', assignedTo: 'Sarah' },
    { id: 'm4', projectId: 'p3', name: 'Substantial Completion', dueDate: '2024-08-30', status: 'pending', assignedTo: 'David' }
  ],
  risks: [
    { id: 'r1', projectId: 'p2', description: 'Aggressive electric escalation rate (4.5%)', severity: 'High', category: 'Financial', status: 'Open', owner: 'Sarah' },
    { id: 'r2', projectId: 'p3', description: 'Chiller lead time delay (12 weeks)', severity: 'Critical', category: 'Schedule', status: 'Mitigated', owner: 'David' }
  ],
  changeOrders: [
    { id: 'c1', projectId: 'p3', number: 'CO-01', description: 'Additional asbestos abatement in boiler room', requestedBy: 'ESCO', cost: 45000, days: 5, status: 'Approved' }
  ],
  submittals: [
    { id: 's1', projectId: 'p3', number: 'SUB-01', ecm: 'ECM-2', description: 'Chiller Shop Drawings', submitted: '2024-02-01', status: 'Approved' },
    { id: 's2', projectId: 'p3', number: 'SUB-02', ecm: 'ECM-3', description: 'BAS Control Sequences', submitted: '2024-02-15', status: 'Pending' }
  ],
  inspectionFindings: [
    { id: 'i1', projectId: 'p3', buildingId: 'b4', ecm: 'ECM-1', date: '2024-03-10', type: 'Deviation from Scope', severity: 'Major', description: 'Installed fixtures do not match approved submittal (lower lumen output)', status: 'Open' },
    { id: 'i2', projectId: 'p3', buildingId: 'b4', ecm: 'ECM-2', date: '2024-03-12', type: 'Safety', severity: 'Critical', description: 'Missing disconnect switch on new CHW pump', status: 'Resolved' }
  ],
  tasks: [
    { id: 't1', title: 'Review Honeywell IGEA Draft', projectId: 'p2', assignedTo: 'Sarah', dueDate: '2024-04-10', priority: 'High', status: 'In Progress' },
    { id: 't2', title: 'Site visit for punch list', projectId: 'p3', assignedTo: 'David', dueDate: '2024-04-05', priority: 'Medium', status: 'To Do' }
  ],
  benchmarks: [
    { id: 'bm1', category: 'Lighting', buildingType: 'K-12 School', unitCostMid: 1.25, unit: '$/sqft', savingsMid: 15, source: '2KB Historical' },
    { id: 'bm2', category: 'HVAC', buildingType: 'Office', unitCostMid: 2500, unit: '$/ton', savingsMid: 20, source: 'RSMeans' }
  ],
  activityFeed: [
    { id: 'af1', type: 'asset_created', title: 'New Asset Added', description: 'Chiller added to Lincoln Elementary', user: 'Martin', date: '2024-03-25T10:00:00Z' },
    { id: 'af2', type: 'risk_flagged', title: 'Risk Flagged', description: 'High escalation rate detected in City of Morrow proposal', user: 'System', date: '2024-03-24T14:30:00Z' }
  ],
  drawings: [
    { id: 'd1', projectId: 'p1', buildingId: 'b1', filename: 'Lincoln_FloorPlan_L1.pdf', type: 'Floor Plan', date: '2024-01-10', by: 'Martin', version: 'v1', annotations: 3 },
    { id: 'd2', projectId: 'p1', buildingId: 'b1', filename: 'Lincoln_MEP_Roof.pdf', type: 'MEP', date: '2024-01-12', by: 'Martin', version: 'v2', annotations: 5 }
  ],
  reports: [
    { id: 'rep1', projectId: 'p2', type: 'IGEA Report', version: 'v1', date: '2024-03-20', by: 'Sarah', status: 'QA Complete', qaItems: 10, qaCompleted: 10 },
    { id: 'rep2', projectId: 'p3', type: 'M&V Annual Report', version: 'v1', date: '2024-03-22', by: 'David', status: 'In Review', qaItems: 8, qaCompleted: 4 }
  ],
  mvData: [
    { id: 'mv1', projectId: 'p3', year: 1, guaranteed: 150000, calculated: 155000, driftDetected: false },
    { id: 'mv2', projectId: 'p3', year: 2, guaranteed: 154500, calculated: 152000, driftDetected: false },
    { id: 'mv3', projectId: 'p3', year: 3, guaranteed: 159135, calculated: 140000, driftDetected: true }
  ],
  lessonsLearned: [
    { id: 'll1', title: 'Honeywell Lighting Controls Integration', projectId: 'p2', category: 'Technical', description: 'Wireless controls had interference issues with existing school wifi.', recommendation: 'Require dedicated frequency survey before approving wireless controls submittal.' }
  ]
};

type StoreType = typeof seedData & {
  setServiceLineMode: (mode: ServiceLineMode) => void;
  addAsset: (asset: any) => void;
  updateAsset: (id: string, asset: any) => void;
  addUtilityBill: (bill: any) => void;
  addECM: (ecm: any) => void;
  updateECM: (id: string, ecm: any) => void;
  addRisk: (risk: any) => void;
  addTask: (task: any) => void;
  updateTaskStatus: (id: string, status: string) => void;
  addActivity: (activity: any) => void;
};

export const useStore = create<StoreType>((set) => ({
  ...seedData,
  setServiceLineMode: (mode) => set({ serviceLineMode: mode }),
  addAsset: (asset) => set((state) => ({ assets: [...state.assets, { ...asset, id: `a${Date.now()}` }] })),
  updateAsset: (id, asset) => set((state) => ({ assets: state.assets.map(a => a.id === id ? { ...a, ...asset } : a) })),
  addUtilityBill: (bill) => set((state) => ({ utilityBills: [...state.utilityBills, { ...bill, id: `u${Date.now()}` }] })),
  addECM: (ecm) => set((state) => ({ ecms: [...state.ecms, { ...ecm, id: `e${Date.now()}` }] })),
  updateECM: (id, ecm) => set((state) => ({ ecms: state.ecms.map(e => e.id === id ? { ...e, ...ecm } : e) })),
  addRisk: (risk) => set((state) => ({ risks: [...state.risks, { ...risk, id: `r${Date.now()}` }] })),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, { ...task, id: `t${Date.now()}` }] })),
  updateTaskStatus: (id, status) => set((state) => ({ tasks: state.tasks.map(t => t.id === id ? { ...t, status } : t) })),
  addActivity: (activity) => set((state) => ({ activityFeed: [{ ...activity, id: `af${Date.now()}`, date: new Date().toISOString() }, ...state.activityFeed] }))
}));
