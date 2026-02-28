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
    // Lincoln Elementary (b1)
    { id: 'a1', buildingId: 'b1', type: 'Chiller', manufacturer: 'Trane', model: 'CVHF', year: 2005, condition: 'Poor', ecmCategory: 'HVAC', remainingLife: 2, flags: ['R-22 Refrigerant', 'Past Useful Life'], aiConfidence: 0.95, replacementCost: 150000 },
    { id: 'a2', buildingId: 'b1', type: 'AHU', manufacturer: 'Carrier', model: 'Aero 39M', year: 2018, condition: 'Good', ecmCategory: 'HVAC', remainingLife: 15, flags: [], aiConfidence: 0.88, replacementCost: 45000 },
    { id: 'a5', buildingId: 'b1', type: 'Cooling Tower', manufacturer: 'Evapco', model: 'AT-134', year: 2005, condition: 'Poor', ecmCategory: 'HVAC', remainingLife: 3, flags: ['Efficiency Below Standard'], aiConfidence: 0.91, replacementCost: 62000 },
    { id: 'a6', buildingId: 'b1', type: 'Pump', manufacturer: 'Bell & Gossett', model: 'Series 1510', year: 2005, condition: 'Poor', ecmCategory: 'HVAC', remainingLife: 2, flags: ['Past Useful Life'], aiConfidence: 0.93, replacementCost: 18000 },
    { id: 'a7', buildingId: 'b1', type: 'Lighting Panel', manufacturer: 'Lithonia', model: 'T8 Wraparound', year: 2008, condition: 'Fair', ecmCategory: 'Lighting', remainingLife: 5, flags: ['Efficiency Below Standard'], aiConfidence: 0.99, replacementCost: 95000 },
    { id: 'a8', buildingId: 'b1', type: 'BAS Controller', manufacturer: 'Johnson Controls', model: 'Metasys NAE', year: 2012, condition: 'Good', ecmCategory: 'Controls', remainingLife: 8, flags: [], aiConfidence: 0.87, replacementCost: 35000 },
    { id: 'a9', buildingId: 'b1', type: 'Domestic HW Heater', manufacturer: 'A.O. Smith', model: 'BTH-250', year: 2010, condition: 'Fair', ecmCategory: 'Plumbing', remainingLife: 4, flags: ['Efficiency Below Standard'], aiConfidence: 0.96, replacementCost: 22000 },
    // City Hall Annex (b2)
    { id: 'a3', buildingId: 'b2', type: 'Boiler', manufacturer: 'Cleaver-Brooks', model: 'CB-LE', year: 1998, condition: 'Critical', ecmCategory: 'HVAC', remainingLife: 0, flags: ['Safety Risk', 'Efficiency Below Standard'], aiConfidence: 0.92, replacementCost: 85000 },
    { id: 'a10', buildingId: 'b2', type: 'AHU', manufacturer: 'Trane', model: 'M-Series', year: 2002, condition: 'Poor', ecmCategory: 'HVAC', remainingLife: 3, flags: ['Efficiency Below Standard'], aiConfidence: 0.89, replacementCost: 52000 },
    { id: 'a11', buildingId: 'b2', type: 'VFD', manufacturer: 'ABB', model: 'ACH550', year: 2015, condition: 'Good', ecmCategory: 'Controls', remainingLife: 12, flags: [], aiConfidence: 0.94, replacementCost: 8500 },
    { id: 'a12', buildingId: 'b2', type: 'Lighting Panel', manufacturer: 'Acuity Brands', model: 'LED Troffer', year: 2016, condition: 'Good', ecmCategory: 'Lighting', remainingLife: 10, flags: [], aiConfidence: 0.98, replacementCost: 48000 },
    { id: 'a13', buildingId: 'b2', type: 'Cooling Unit', manufacturer: 'Daikin', model: 'VRV-IV', year: 2019, condition: 'Good', ecmCategory: 'HVAC', remainingLife: 16, flags: [], aiConfidence: 0.90, replacementCost: 120000 },
    // Westside Recreation Center (b3)
    { id: 'a14', buildingId: 'b3', type: 'Pool Heater', manufacturer: 'Pentair', model: 'MasterTemp 400', year: 2013, condition: 'Fair', ecmCategory: 'Plumbing', remainingLife: 5, flags: ['Efficiency Below Standard'], aiConfidence: 0.85, replacementCost: 14000 },
    { id: 'a15', buildingId: 'b3', type: 'AHU', manufacturer: 'Carrier', model: 'EcoBlue', year: 2009, condition: 'Poor', ecmCategory: 'HVAC', remainingLife: 2, flags: ['Past Useful Life', 'R-22 Refrigerant'], aiConfidence: 0.91, replacementCost: 68000 },
    { id: 'a16', buildingId: 'b3', type: 'Lighting', manufacturer: 'Cree', model: 'LED Panel', year: 2020, condition: 'Good', ecmCategory: 'Lighting', remainingLife: 18, flags: [], aiConfidence: 0.99, replacementCost: 32000 },
    { id: 'a17', buildingId: 'b3', type: 'DOAS Unit', manufacturer: 'Munters', model: 'DCS-2', year: 2014, condition: 'Fair', ecmCategory: 'HVAC', remainingLife: 6, flags: [], aiConfidence: 0.88, replacementCost: 55000 },
    { id: 'a18', buildingId: 'b3', type: 'BAS Controller', manufacturer: 'Siemens', model: 'Desigo CC', year: 2017, condition: 'Good', ecmCategory: 'Controls', remainingLife: 11, flags: [], aiConfidence: 0.93, replacementCost: 28000 },
    // Public Safety Complex (b4)
    { id: 'a4', buildingId: 'b4', type: 'Lighting', manufacturer: 'Lithonia', model: 'T8 Troffer', year: 2010, condition: 'Fair', ecmCategory: 'Lighting', remainingLife: 5, flags: ['Efficiency Below Standard'], aiConfidence: 0.99, replacementCost: 120000 },
    { id: 'a19', buildingId: 'b4', type: 'Chiller', manufacturer: 'York', model: 'YK Centrifugal', year: 2000, condition: 'Critical', ecmCategory: 'HVAC', remainingLife: 0, flags: ['Past Useful Life', 'Efficiency Below Standard', 'Safety Risk'], aiConfidence: 0.97, replacementCost: 280000 },
    { id: 'a20', buildingId: 'b4', type: 'Boiler', manufacturer: 'Burnham', model: 'Commercial', year: 2003, condition: 'Poor', ecmCategory: 'HVAC', remainingLife: 3, flags: ['Efficiency Below Standard'], aiConfidence: 0.90, replacementCost: 95000 },
    { id: 'a21', buildingId: 'b4', type: 'Generator', manufacturer: 'Caterpillar', model: 'C15 500kW', year: 2008, condition: 'Good', ecmCategory: 'Electrical', remainingLife: 10, flags: [], aiConfidence: 0.86, replacementCost: 185000 },
    { id: 'a22', buildingId: 'b4', type: 'AHU', manufacturer: 'Daikin', model: 'MicroTech III', year: 2011, condition: 'Fair', ecmCategory: 'HVAC', remainingLife: 5, flags: [], aiConfidence: 0.89, replacementCost: 78000 },
    { id: 'a23', buildingId: 'b4', type: 'Cooling Tower', manufacturer: 'Baltimore Aircoil', model: 'VXT-200', year: 2000, condition: 'Critical', ecmCategory: 'HVAC', remainingLife: 1, flags: ['Past Useful Life', 'Safety Risk'], aiConfidence: 0.94, replacementCost: 48000 },
    { id: 'a24', buildingId: 'b4', type: 'UPS System', manufacturer: 'Eaton', model: '9395 225kVA', year: 2016, condition: 'Good', ecmCategory: 'Electrical', remainingLife: 9, flags: [], aiConfidence: 0.91, replacementCost: 65000 },
    { id: 'a25', buildingId: 'b4', type: 'Pump', manufacturer: 'Grundfos', model: 'TP100-390', year: 2000, condition: 'Critical', ecmCategory: 'HVAC', remainingLife: 0, flags: ['Past Useful Life'], aiConfidence: 0.92, replacementCost: 24000 }
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
    { id: 'bm2', category: 'HVAC', buildingType: 'Office', unitCostMid: 2500, unit: '$/ton', savingsMid: 20, source: 'RSMeans' },
    { id: 'bm3', category: 'Chiller', buildingType: 'Public Safety', unitCostMid: 350, unit: '$/ton', savingsMid: 22, source: '2KB Historical' },
    { id: 'bm4', category: 'Boiler', buildingType: 'Office', unitCostMid: 18, unit: '$/MBH', savingsMid: 18, source: 'RSMeans' },
    { id: 'bm5', category: 'Controls/BAS', buildingType: 'K-12 School', unitCostMid: 0.85, unit: '$/sqft', savingsMid: 12, source: '2KB Historical' }
  ],
  activityFeed: [
    { id: 'af1', type: 'asset_created', title: 'New Asset Added', description: 'Chiller added to Lincoln Elementary', user: 'Martin', date: '2024-03-25T10:00:00Z' },
    { id: 'af2', type: 'risk_flagged', title: 'Risk Flagged', description: 'High escalation rate detected in City of Morrow proposal', user: 'System', date: '2024-03-24T14:30:00Z' }
  ],
  drawings: [
    { id: 'd1', projectId: 'p1', buildingId: 'b1', filename: 'Lincoln_FloorPlan_L1.pdf', type: 'Floor Plan', date: '2024-01-10', by: 'Martin', version: 'v2', annotations: 4, versions: [{ v: 'v1', date: '2023-11-15' }, { v: 'v2', date: '2024-01-10' }] },
    { id: 'd2', projectId: 'p1', buildingId: 'b1', filename: 'Lincoln_MEP_Roof.pdf', type: 'MEP', date: '2024-01-12', by: 'Martin', version: 'v1', annotations: 5, versions: [{ v: 'v1', date: '2024-01-12' }] },
    { id: 'd3', projectId: 'p1', buildingId: 'b1', filename: 'Lincoln_SitePlan_2024.pdf', type: 'Site Plan', date: '2024-01-15', by: 'Martin', version: 'v1', annotations: 2, versions: [{ v: 'v1', date: '2024-01-15' }] },
    { id: 'd4', projectId: 'p2', buildingId: 'b2', filename: 'CityHall_Electrical_MV.pdf', type: 'Electrical', date: '2024-02-05', by: 'Sarah', version: 'v3', annotations: 3, versions: [{ v: 'v1', date: '2023-10-01' }, { v: 'v2', date: '2023-12-15' }, { v: 'v3', date: '2024-02-05' }] },
    { id: 'd5', projectId: 'p2', buildingId: 'b2', filename: 'CityHall_FloorPlan_1F.pdf', type: 'Floor Plan', date: '2024-02-10', by: 'Sarah', version: 'v1', annotations: 0, versions: [{ v: 'v1', date: '2024-02-10' }] },
    { id: 'd6', projectId: 'p2', buildingId: 'b3', filename: 'RecCenter_MEP_Pool.pdf', type: 'MEP', date: '2024-02-12', by: 'Sarah', version: 'v2', annotations: 3, versions: [{ v: 'v1', date: '2023-11-20' }, { v: 'v2', date: '2024-02-12' }] },
    { id: 'd7', projectId: 'p3', buildingId: 'b4', filename: 'PublicSafety_Mechanical.pdf', type: 'MEP', date: '2024-03-01', by: 'David', version: 'v1', annotations: 5, versions: [{ v: 'v1', date: '2024-03-01' }] },
    { id: 'd8', projectId: 'p3', buildingId: 'b4', filename: 'PublicSafety_SitePlan.pdf', type: 'Site Plan', date: '2024-03-05', by: 'David', version: 'v2', annotations: 2, versions: [{ v: 'v1', date: '2024-01-10' }, { v: 'v2', date: '2024-03-05' }] }
  ],
  reports: [
    {
      id: 'rep1', projectId: 'p2', type: 'IGEA Report', version: 'v1', date: '2024-03-20', by: 'Sarah',
      status: 'Approved',
      qaItems: 10, qaCompleted: 10,
      qaChecklistItems: [
        { id: 'qi1', text: 'Verify all ECM costs match final proposal', checked: true, reviewer: 'Sarah', reviewDate: '2024-03-18' },
        { id: 'qi2', text: 'Confirm baseline utility data aligns with Module 2', checked: true, reviewer: 'Sarah', reviewDate: '2024-03-18' },
        { id: 'qi3', text: 'Validate calculation methodology for each ECM', checked: true, reviewer: 'Martin', reviewDate: '2024-03-19' },
        { id: 'qi4', text: 'Confirm escalation rates within acceptable range', checked: true, reviewer: 'Martin', reviewDate: '2024-03-19' },
        { id: 'qi5', text: 'Review executive summary accuracy and tone', checked: true, reviewer: 'Sarah', reviewDate: '2024-03-19' },
        { id: 'qi6', text: 'Check recommendation alignment with site conditions', checked: true, reviewer: 'Sarah', reviewDate: '2024-03-20' },
        { id: 'qi7', text: 'Verify NPV and payback calculations', checked: true, reviewer: 'Martin', reviewDate: '2024-03-20' },
        { id: 'qi8', text: 'Confirm ESCO DSCR requirements are met', checked: true, reviewer: 'Martin', reviewDate: '2024-03-20' },
        { id: 'qi9', text: 'Check formatting and document standards', checked: true, reviewer: 'Sarah', reviewDate: '2024-03-20' },
        { id: 'qi10', text: 'Final sign-off from project engineer', checked: true, reviewer: 'Sarah', reviewDate: '2024-03-20' }
      ],
      comments: [
        { id: 'qc1', author: 'Martin', date: '2024-03-18T09:30:00Z', text: 'ECM-2 cost needs reconciliation with final vendor quote — currently showing $1.18M but quote is $1.20M.', resolved: true },
        { id: 'qc2', author: 'Sarah', date: '2024-03-18T11:00:00Z', text: 'Updated to $1.20M per vendor quote. NPV recalculated.', resolved: true },
        { id: 'qc3', author: 'Martin', date: '2024-03-20T14:00:00Z', text: 'All checks complete. Approving for client delivery.', resolved: true }
      ],
      approvedBy: 'Martin', approvedAt: '2024-03-20T15:00:00Z'
    },
    {
      id: 'rep2', projectId: 'p3', type: 'M&V Annual Report', version: 'v1', date: '2024-03-22', by: 'David',
      status: 'In Review',
      qaItems: 8, qaCompleted: 4,
      qaChecklistItems: [
        { id: 'qi11', text: 'Verify baseline period accuracy and adjustments documented', checked: true, reviewer: 'David', reviewDate: '2024-03-21' },
        { id: 'qi12', text: 'Confirm energy savings calculation against guaranteed baseline', checked: true, reviewer: 'David', reviewDate: '2024-03-21' },
        { id: 'qi13', text: 'Validate metering data completeness (no gaps >2 days)', checked: true, reviewer: 'David', reviewDate: '2024-03-22' },
        { id: 'qi14', text: 'Confirm weather normalization methodology noted', checked: true, reviewer: 'Martin', reviewDate: '2024-03-22' },
        { id: 'qi15', text: 'Verify guarantee comparison table is included', checked: false, reviewer: '', reviewDate: '' },
        { id: 'qi16', text: 'Confirm non-routine adjustments are documented', checked: false, reviewer: '', reviewDate: '' },
        { id: 'qi17', text: 'Check Year 3 drift flag is properly flagged and explained', checked: false, reviewer: '', reviewDate: '' },
        { id: 'qi18', text: 'Final sign-off from project engineer', checked: false, reviewer: '', reviewDate: '' }
      ],
      comments: [
        { id: 'qc4', author: 'Martin', date: '2024-03-22T10:00:00Z', text: 'Year 3 shows 12% drift above baseline — this needs a root cause section before we can approve.', resolved: false },
        { id: 'qc5', author: 'David', date: '2024-03-22T13:30:00Z', text: 'Investigating — preliminary finding points to chiller operating at part load more than modeled. Adding analysis section now.', resolved: false },
        { id: 'qc6', author: 'Sarah', date: '2024-03-22T15:00:00Z', text: 'Also — the guarantee comparison table on page 8 references Year 2 data, not Year 3. Please update.', resolved: false },
        { id: 'qc7', author: 'David', date: '2024-03-23T09:00:00Z', text: 'Will have updated draft by EOD today.', resolved: false }
      ],
      approvedBy: '', approvedAt: ''
    },
    {
      id: 'rep3', projectId: 'p2', type: 'Council Presentation', version: 'v1', date: '2024-03-25', by: 'Sarah',
      status: 'Draft',
      qaItems: 6, qaCompleted: 0,
      qaChecklistItems: [
        { id: 'qi19', text: 'Verify all financial figures are current and approved', checked: false, reviewer: '', reviewDate: '' },
        { id: 'qi20', text: 'Confirm risk summary reflects current risk log', checked: false, reviewer: '', reviewDate: '' },
        { id: 'qi21', text: 'Validate carbon impact figures against M&V data', checked: false, reviewer: '', reviewDate: '' },
        { id: 'qi22', text: 'Ensure milestone dates are accurate', checked: false, reviewer: '', reviewDate: '' },
        { id: 'qi23', text: 'Review presentation tone for council audience', checked: false, reviewer: '', reviewDate: '' },
        { id: 'qi24', text: 'Final approval before council meeting', checked: false, reviewer: '', reviewDate: '' }
      ],
      comments: [],
      approvedBy: '', approvedAt: ''
    }
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
  updateReportStatus: (id: string, status: string) => void;
  toggleQAItem: (reportId: string, itemId: string) => void;
  addQAComment: (reportId: string, comment: any) => void;
  approveReport: (reportId: string, approver: string) => void;
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
  addActivity: (activity) => set((state) => ({ activityFeed: [{ ...activity, id: `af${Date.now()}`, date: new Date().toISOString() }, ...state.activityFeed] })),
  updateReportStatus: (id, status) => set((state) => ({ reports: state.reports.map(r => r.id === id ? { ...r, status } : r) })),
  toggleQAItem: (reportId, itemId) => set((state) => ({
    reports: state.reports.map(r => r.id === reportId ? {
      ...r,
      qaChecklistItems: (r as any).qaChecklistItems.map((qi: any) => qi.id === itemId ? { ...qi, checked: !qi.checked } : qi),
      qaCompleted: (r as any).qaChecklistItems.filter((qi: any) => qi.id === itemId ? !qi.checked : qi.checked).length
    } : r)
  })),
  addQAComment: (reportId, comment) => set((state) => ({
    reports: state.reports.map(r => r.id === reportId ? {
      ...r,
      comments: [...(r as any).comments, { ...comment, id: `qc${Date.now()}`, date: new Date().toISOString(), resolved: false }]
    } : r)
  })),
  approveReport: (reportId, approver) => set((state) => ({
    reports: state.reports.map(r => r.id === reportId ? {
      ...r,
      status: 'Approved',
      approvedBy: approver,
      approvedAt: new Date().toISOString()
    } : r)
  }))
}));
