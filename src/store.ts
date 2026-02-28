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
    { id: 'p1', orgId: 'o1', name: 'Clayton County Schools ESPC', phase: 'M&V' as Phase, esco: 'Trane', value: 8500000, riskScore: 35, engineer: 'Martin' },
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
    { id: 'u12', buildingId: 'b1', month: '2024-12', electricKwh: 46000, electricCost: 4600, gasTherms: 1100, gasCost: 1100, peakKw: 155 },
    // City Hall Annex (b2) — 42,000 sqft Office, built 1985
    { id: 'u13', buildingId: 'b2', month: '2024-01', electricKwh: 28000, electricCost: 2800, gasTherms: 900, gasCost: 900, peakKw: 95 },
    { id: 'u14', buildingId: 'b2', month: '2024-02', electricKwh: 26000, electricCost: 2600, gasTherms: 850, gasCost: 850, peakKw: 90 },
    { id: 'u15', buildingId: 'b2', month: '2024-03', electricKwh: 30000, electricCost: 3000, gasTherms: 600, gasCost: 600, peakKw: 100 },
    { id: 'u16', buildingId: 'b2', month: '2024-04', electricKwh: 35000, electricCost: 3500, gasTherms: 250, gasCost: 250, peakKw: 115 },
    { id: 'u17', buildingId: 'b2', month: '2024-05', electricKwh: 42000, electricCost: 4200, gasTherms: 80, gasCost: 80, peakKw: 140 },
    { id: 'u18', buildingId: 'b2', month: '2024-06', electricKwh: 50000, electricCost: 5000, gasTherms: 30, gasCost: 30, peakKw: 165 },
    { id: 'u19', buildingId: 'b2', month: '2024-07', electricKwh: 54000, electricCost: 5400, gasTherms: 30, gasCost: 30, peakKw: 175 },
    { id: 'u20', buildingId: 'b2', month: '2024-08', electricKwh: 55000, electricCost: 5500, gasTherms: 30, gasCost: 30, peakKw: 180 },
    { id: 'u21', buildingId: 'b2', month: '2024-09', electricKwh: 46000, electricCost: 4600, gasTherms: 60, gasCost: 60, peakKw: 150 },
    { id: 'u22', buildingId: 'b2', month: '2024-10', electricKwh: 38000, electricCost: 3800, gasTherms: 200, gasCost: 200, peakKw: 125 },
    { id: 'u23', buildingId: 'b2', month: '2024-11', electricKwh: 30000, electricCost: 3000, gasTherms: 650, gasCost: 650, peakKw: 100 },
    { id: 'u24', buildingId: 'b2', month: '2024-12', electricKwh: 29000, electricCost: 2900, gasTherms: 880, gasCost: 880, peakKw: 98 },
    // Westside Recreation Center (b3) — 31,000 sqft Recreation, built 1994
    { id: 'u25', buildingId: 'b3', month: '2024-01', electricKwh: 22000, electricCost: 2200, gasTherms: 1400, gasCost: 1400, peakKw: 80 },
    { id: 'u26', buildingId: 'b3', month: '2024-02', electricKwh: 21000, electricCost: 2100, gasTherms: 1300, gasCost: 1300, peakKw: 78 },
    { id: 'u27', buildingId: 'b3', month: '2024-03', electricKwh: 24000, electricCost: 2400, gasTherms: 1000, gasCost: 1000, peakKw: 85 },
    { id: 'u28', buildingId: 'b3', month: '2024-04', electricKwh: 28000, electricCost: 2800, gasTherms: 700, gasCost: 700, peakKw: 95 },
    { id: 'u29', buildingId: 'b3', month: '2024-05', electricKwh: 34000, electricCost: 3400, gasTherms: 500, gasCost: 500, peakKw: 115 },
    { id: 'u30', buildingId: 'b3', month: '2024-06', electricKwh: 40000, electricCost: 4000, gasTherms: 400, gasCost: 400, peakKw: 135 },
    { id: 'u31', buildingId: 'b3', month: '2024-07', electricKwh: 44000, electricCost: 4400, gasTherms: 400, gasCost: 400, peakKw: 145 },
    { id: 'u32', buildingId: 'b3', month: '2024-08', electricKwh: 45000, electricCost: 4500, gasTherms: 400, gasCost: 400, peakKw: 148 },
    { id: 'u33', buildingId: 'b3', month: '2024-09', electricKwh: 38000, electricCost: 3800, gasTherms: 500, gasCost: 500, peakKw: 125 },
    { id: 'u34', buildingId: 'b3', month: '2024-10', electricKwh: 30000, electricCost: 3000, gasTherms: 800, gasCost: 800, peakKw: 100 },
    { id: 'u35', buildingId: 'b3', month: '2024-11', electricKwh: 24000, electricCost: 2400, gasTherms: 1100, gasCost: 1100, peakKw: 85 },
    { id: 'u36', buildingId: 'b3', month: '2024-12', electricKwh: 23000, electricCost: 2300, gasTherms: 1350, gasCost: 1350, peakKw: 82 },
    // Public Safety Complex (b4) — 55,000 sqft Public Safety, built 1968
    { id: 'u37', buildingId: 'b4', month: '2024-01', electricKwh: 52000, electricCost: 5200, gasTherms: 1600, gasCost: 1600, peakKw: 180 },
    { id: 'u38', buildingId: 'b4', month: '2024-02', electricKwh: 50000, electricCost: 5000, gasTherms: 1400, gasCost: 1400, peakKw: 175 },
    { id: 'u39', buildingId: 'b4', month: '2024-03', electricKwh: 55000, electricCost: 5500, gasTherms: 1100, gasCost: 1100, peakKw: 190 },
    { id: 'u40', buildingId: 'b4', month: '2024-04', electricKwh: 62000, electricCost: 6200, gasTherms: 600, gasCost: 600, peakKw: 210 },
    { id: 'u41', buildingId: 'b4', month: '2024-05', electricKwh: 74000, electricCost: 7400, gasTherms: 200, gasCost: 200, peakKw: 245 },
    { id: 'u42', buildingId: 'b4', month: '2024-06', electricKwh: 88000, electricCost: 8800, gasTherms: 100, gasCost: 100, peakKw: 290 },
    { id: 'u43', buildingId: 'b4', month: '2024-07', electricKwh: 95000, electricCost: 9500, gasTherms: 100, gasCost: 100, peakKw: 310 },
    { id: 'u44', buildingId: 'b4', month: '2024-08', electricKwh: 97000, electricCost: 9700, gasTherms: 100, gasCost: 100, peakKw: 315 },
    { id: 'u45', buildingId: 'b4', month: '2024-09', electricKwh: 82000, electricCost: 8200, gasTherms: 200, gasCost: 200, peakKw: 270 },
    { id: 'u46', buildingId: 'b4', month: '2024-10', electricKwh: 66000, electricCost: 6600, gasTherms: 500, gasCost: 500, peakKw: 220 },
    { id: 'u47', buildingId: 'b4', month: '2024-11', electricKwh: 55000, electricCost: 5500, gasTherms: 1100, gasCost: 1100, peakKw: 190 },
    { id: 'u48', buildingId: 'b4', month: '2024-12', electricKwh: 53000, electricCost: 5300, gasTherms: 1500, gasCost: 1500, peakKw: 185 }
  ],
  ecms: [
    { id: 'e1', projectId: 'p2', number: 'ECM-1', description: 'LED Lighting Upgrade', category: 'Lighting', cost: 450000, savings: 65000, life: 15 },
    { id: 'e2', projectId: 'p2', number: 'ECM-2', description: 'Chiller Replacement', category: 'HVAC', cost: 1200000, savings: 85000, life: 20 },
    { id: 'e3', projectId: 'p2', number: 'ECM-3', description: 'Building Automation', category: 'Controls', cost: 350000, savings: 45000, life: 15 },
    { id: 'e4', projectId: 'p2', number: 'ECM-4', description: 'Water Conservation', category: 'Water', cost: 150000, savings: 25000, life: 10 },
    { id: 'e5', projectId: 'p1', number: 'ECM-1', description: 'LED Lighting Retrofit', category: 'Lighting', cost: 620000, savings: 78000, life: 15 },
    { id: 'e6', projectId: 'p1', number: 'ECM-2', description: 'Chiller Optimization', category: 'HVAC', cost: 1450000, savings: 92000, life: 20 },
    { id: 'e7', projectId: 'p1', number: 'ECM-3', description: 'BAS Upgrade', category: 'Controls', cost: 480000, savings: 54000, life: 15 }
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
    { id: 'mv3', projectId: 'p3', year: 3, guaranteed: 159135, calculated: 140000, driftDetected: true },
    { id: 'mv4', projectId: 'p1', year: 1, guaranteed: 180000, calculated: 195000, driftDetected: false },
    { id: 'mv5', projectId: 'p1', year: 2, guaranteed: 185400, calculated: 188000, driftDetected: false }
  ],
  buildingSavings: (() => {
    // Georgia cooling profile weights: Jan-Dec (higher Jun-Aug, lower winter)
    const weights = [0.055, 0.052, 0.065, 0.078, 0.095, 0.135, 0.140, 0.138, 0.098, 0.072, 0.042, 0.030];
    function distribute(annual: number): number[] {
      const result = weights.map(w => Math.round(annual * w));
      // Absorb rounding error into December
      const sum = result.reduce((a, b) => a + b, 0);
      result[11] += annual - sum;
      return result;
    }
    // Actual monthly weights vary slightly per building for realism
    const overWeights = [0.054, 0.051, 0.064, 0.080, 0.098, 0.138, 0.142, 0.140, 0.100, 0.070, 0.038, 0.025];
    function distributeOver(annual: number): number[] {
      const result = overWeights.map(w => Math.round(annual * w));
      const sum = result.reduce((a, b) => a + b, 0);
      result[11] += annual - sum;
      return result;
    }
    return [
      { id: 'bs1', projectId: 'p1', buildingName: 'Clayton County HS', baselineAnnualKwh: 2340000, currentAnnualKwh: 2150000, monthlyBaseline: distribute(2340000), monthlyActual: distribute(2150000) },
      { id: 'bs2', projectId: 'p1', buildingName: 'Clayton County MS', baselineAnnualKwh: 1850000, currentAnnualKwh: 1920000, monthlyBaseline: distribute(1850000), monthlyActual: distributeOver(1920000) },
      { id: 'bs3', projectId: 'p1', buildingName: 'Jonesboro Elementary', baselineAnnualKwh: 980000, currentAnnualKwh: 870000, monthlyBaseline: distribute(980000), monthlyActual: distribute(870000) },
      { id: 'bs4', projectId: 'p1', buildingName: 'Riverdale Elementary', baselineAnnualKwh: 1120000, currentAnnualKwh: 1045000, monthlyBaseline: distribute(1120000), monthlyActual: distribute(1045000) },
      { id: 'bs5', projectId: 'p1', buildingName: 'Admin Building', baselineAnnualKwh: 540000, currentAnnualKwh: 510000, monthlyBaseline: distribute(540000), monthlyActual: distribute(510000) },
      { id: 'bs6', projectId: 'p1', buildingName: 'Transportation Center', baselineAnnualKwh: 420000, currentAnnualKwh: 395000, monthlyBaseline: distribute(420000), monthlyActual: distribute(395000) },
    ];
  })(),
  lessonsLearned: [
    { id: 'll1', title: 'Honeywell Lighting Controls Integration', projectId: 'p2', category: 'Technical', description: 'Wireless controls had interference issues with existing school wifi.', recommendation: 'Require dedicated frequency survey before approving wireless controls submittal.' }
  ],
  pricingReview: [
    { id: 'pr1', projectId: 'p2', ecmId: 'e1', description: 'LED Lighting Upgrade', escoCost: 450000, benchLow: 380000, benchMid: 420000, benchHigh: 480000, internalNote: 'Includes demolition and disposal — cost justified.', clientSummary: 'Cost verified against market data.' },
    { id: 'pr2', projectId: 'p2', ecmId: 'e2', description: 'Chiller Replacement', escoCost: 1200000, benchLow: 850000, benchMid: 980000, benchHigh: 1100000, internalNote: 'ESCO markup excessive at 22% above high benchmark. Vendor quote inflated vs. direct procurement. Negotiate.', clientSummary: 'Under discussion with ESCO — pending revised quote.' },
    { id: 'pr3', projectId: 'p2', ecmId: 'e3', description: 'Building Automation System', escoCost: 350000, benchLow: 280000, benchMid: 340000, benchHigh: 400000, internalNote: 'Within range. Scope matches spec.', clientSummary: 'Cost verified against market data.' },
    { id: 'pr4', projectId: 'p2', ecmId: 'e4', description: 'Water Conservation', escoCost: 150000, benchLow: 110000, benchMid: 135000, benchHigh: 160000, internalNote: 'Slightly above mid but within range.', clientSummary: 'Cost verified against market data.' },
    { id: 'pr5', projectId: 'p2', ecmId: '', description: 'Roof Insulation', escoCost: 280000, benchLow: 200000, benchMid: 240000, benchHigh: 270000, internalNote: 'Amber — 3.7% above high. Material spec may be premium. Requesting breakdown.', clientSummary: 'Under review — requesting cost breakdown from ESCO.' },
    { id: 'pr6', projectId: 'p2', ecmId: '', description: 'VFD Installation', escoCost: 95000, benchLow: 70000, benchMid: 85000, benchHigh: 100000, internalNote: 'Within range. Standard VFD pricing for this tonnage.', clientSummary: 'Cost verified against market data.' }
  ],
  contractObligations: [
    // Guarantee Obligations
    { id: 'co1', projectId: 'p3', category: 'Guarantee', description: 'Annual energy savings guarantee of $150,000 (Year 1), escalating 3% per year', responsibleParty: 'ESCO', dueDate: '2024-12-31', trigger: 'Annual M&V report acceptance', status: 'Completed', contractRef: 'Section 4.2.1', evidence: 'Year 1 M&V Report (Approved)', internalNote: 'Year 1 achieved $155K — surplus. Monitor Year 3 drift.', clientSummary: 'Year 1 guarantee met. $155,000 achieved vs. $150,000 guaranteed.', internalOnly: false },
    { id: 'co2', projectId: 'p3', category: 'Guarantee', description: 'Shortfall remedy: ESCO pays difference if savings fall below guarantee in any year', responsibleParty: 'ESCO', dueDate: '', trigger: 'If annual savings < guaranteed amount', status: 'Not Yet Due', contractRef: 'Section 4.3.1', evidence: '', internalNote: 'Year 3 tracking below guarantee — may trigger. Preparing demand letter framework.', clientSummary: 'Shortfall provision active. 2KB monitoring Year 3 performance.', internalOnly: false },
    { id: 'co3', projectId: 'p3', category: 'Guarantee', description: 'M&V methodology: IPMVP Option C with weather normalization per Section 5.1', responsibleParty: '2KB', dueDate: '', trigger: 'Each annual M&V period', status: 'Completed', contractRef: 'Section 5.1', evidence: 'M&V Plan v2.1', internalNote: '', clientSummary: 'M&V methodology established and applied consistently.', internalOnly: false },
    // Warranty Obligations
    { id: 'co4', projectId: 'p3', category: 'Warranty', description: 'Chiller: 5-year parts, 1-year labor warranty from Johnson Controls', responsibleParty: 'ESCO', dueDate: '2028-06-15', trigger: 'Substantial completion date', status: 'Not Yet Due', contractRef: 'Exhibit D-2', evidence: 'Warranty certificate on file', internalNote: '', clientSummary: 'Chiller warranty active through June 2028.', internalOnly: false },
    { id: 'co5', projectId: 'p3', category: 'Warranty', description: 'LED fixtures: 10-year warranty from manufacturer', responsibleParty: 'ESCO', dueDate: '2033-03-10', trigger: 'Installation date per ECM', status: 'Not Yet Due', contractRef: 'Exhibit D-1', evidence: '', internalNote: 'Confirm warranty registration was completed by ESCO.', clientSummary: 'LED warranty active through March 2033.', internalOnly: false },
    { id: 'co6', projectId: 'p3', category: 'Warranty', description: 'BAS software: 3-year support and updates from JCI', responsibleParty: 'ESCO', dueDate: '2026-09-01', trigger: 'System acceptance date', status: 'Coming Due', contractRef: 'Exhibit D-3', evidence: '', internalNote: 'Expiring in 6 months. Flag for contract extension discussion.', clientSummary: 'BAS support agreement expiring September 2026. Renewal recommended.', internalOnly: false },
    // Reporting Obligations
    { id: 'co7', projectId: 'p3', category: 'Reporting', description: 'Annual M&V Report due within 90 days of each performance period end', responsibleParty: '2KB', dueDate: '2025-03-31', trigger: 'Annual — performance period ends Dec 31', status: 'Coming Due', contractRef: 'Section 5.4', evidence: '', internalNote: 'Year 3 report in progress. Drift section being added.', clientSummary: 'Year 3 M&V report in preparation. Expected delivery by March 31.', internalOnly: false },
    { id: 'co8', projectId: 'p3', category: 'Reporting', description: 'Quarterly project status update to Owner', responsibleParty: '2KB', dueDate: '2025-01-15', trigger: 'Quarterly', status: 'Overdue', contractRef: 'Section 6.1', evidence: '', internalNote: 'Q4 update delayed due to Year 3 drift investigation. Need to send ASAP.', clientSummary: 'Q4 status update being finalized. Delivery expected within the week.', internalOnly: false },
    { id: 'co9', projectId: 'p3', category: 'Reporting', description: 'Commissioning report within 60 days of substantial completion', responsibleParty: 'ESCO', dueDate: '2024-04-30', trigger: 'Substantial completion', status: 'Completed', contractRef: 'Section 3.8', evidence: 'Cx Report v1.0 (Approved)', internalNote: '', clientSummary: 'Commissioning report received and approved.', internalOnly: false },
    // Financial Obligations
    { id: 'co10', projectId: 'p3', category: 'Financial', description: 'Progress payment #4: $1,950,000 upon substantial completion', responsibleParty: 'Owner', dueDate: '2024-03-15', trigger: 'Substantial completion certificate', status: 'Completed', contractRef: 'Exhibit B', evidence: 'Payment confirmation #4022', internalNote: '', clientSummary: 'Payment completed March 15, 2024.', internalOnly: false },
    { id: 'co11', projectId: 'p3', category: 'Financial', description: 'Annual performance payment: $520,000 due each July 1', responsibleParty: 'Owner', dueDate: '2025-07-01', trigger: 'Annual — July 1 each year', status: 'Not Yet Due', contractRef: 'Exhibit B, Schedule 2', evidence: '', internalNote: '', clientSummary: 'Next annual payment due July 1, 2025.', internalOnly: false },
    { id: 'co12', projectId: 'p3', category: 'Financial', description: 'Performance bond maintained through guarantee period', responsibleParty: 'ESCO', dueDate: '2038-12-31', trigger: 'Duration of guarantee period', status: 'Not Yet Due', contractRef: 'Section 8.2', evidence: 'Bond certificate on file', internalNote: 'Verify bond renewal annually.', clientSummary: 'Performance bond active through guarantee period.', internalOnly: false },
    // Operational Obligations
    { id: 'co13', projectId: 'p3', category: 'Operational', description: 'Owner to maintain HVAC filter replacement schedule per manufacturer specs', responsibleParty: 'Owner', dueDate: '', trigger: 'Ongoing — quarterly', status: 'Not Yet Due', contractRef: 'Exhibit E', evidence: '', internalNote: 'Include in owner training package.', clientSummary: 'Quarterly filter replacement required per contract.', internalOnly: false },
    { id: 'co14', projectId: 'p3', category: 'Operational', description: 'ESCO to provide 2 days of BAS operator training annually', responsibleParty: 'ESCO', dueDate: '2025-06-30', trigger: 'Annual', status: 'Not Yet Due', contractRef: 'Section 3.10', evidence: '', internalNote: '', clientSummary: 'Annual BAS training session to be scheduled by June 2025.', internalOnly: false },
    { id: 'co15', projectId: 'p3', category: 'Operational', description: 'Owner shall not modify BAS setpoints without written ESCO approval during guarantee period', responsibleParty: 'Owner', dueDate: '', trigger: 'Ongoing', status: 'Not Yet Due', contractRef: 'Section 5.6', evidence: '', internalNote: 'Critical — setpoint changes void guarantee. Ensure owner understands.', clientSummary: 'BAS setpoint changes require written approval during guarantee period.', internalOnly: false },
    { id: 'co16', projectId: 'p3', category: 'Operational', description: 'ESCO preventive maintenance on chiller and cooling tower per Exhibit F schedule', responsibleParty: 'ESCO', dueDate: '2025-04-01', trigger: 'Semi-annual', status: 'Coming Due', contractRef: 'Exhibit F', evidence: 'Last PM completed Oct 2024', internalNote: '', clientSummary: 'Next scheduled preventive maintenance due April 2025.', internalOnly: false }
  ],
  clientNotifications: [
    { id: 'cn1', projectId: 'p3', type: 'report', title: 'New Report Available', description: 'Year 2 M&V Annual Report has been approved and is ready for download.', date: '2024-03-22', read: false },
    { id: 'cn2', projectId: 'p3', type: 'milestone', title: 'Milestone Completed', description: 'Substantial Completion certificate has been issued.', date: '2024-03-01', read: true },
    { id: 'cn3', projectId: 'p3', type: 'document', title: 'Document Uploaded', description: 'Change Order CO-01 has been approved and filed.', date: '2024-02-20', read: true },
    { id: 'cn4', projectId: 'p3', type: 'alert', title: 'Performance Notice', description: 'Year 3 savings trending below guarantee. Investigation in progress.', date: '2024-12-15', read: false },
    { id: 'cn5', projectId: 'p2', type: 'report', title: 'IGEA Report Available', description: 'IGEA Report v1 has been approved and is available for review.', date: '2024-03-20', read: false },
    { id: 'cn6', projectId: 'p2', type: 'milestone', title: 'Phase Update', description: 'Project has entered IGEA review phase.', date: '2024-02-01', read: true }
  ],
  meetingNotes: [
    { id: 'mn1', projectId: 'p3', date: '2024-03-15', title: 'Monthly Progress Meeting', attendees: ['David Chen (2KB)', 'Robert Williams (Henry County)', 'Mark Thompson (JCI)'], summary: 'Reviewed construction progress on ECM-1 and ECM-2. Discussed lighting fixture submittal deviation. ESCO to provide revised shop drawings by March 25.', actionItems: [{ text: 'ESCO to resubmit lighting shop drawings', owner: 'JCI', dueDate: '2024-03-25', completed: false }, { text: '2KB to review revised submittal within 5 business days', owner: '2KB', dueDate: '2024-04-01', completed: false }], acknowledged: true },
    { id: 'mn2', projectId: 'p3', date: '2024-02-10', title: 'Change Order Review', attendees: ['David Chen (2KB)', 'Robert Williams (Henry County)', 'Mark Thompson (JCI)'], summary: 'Reviewed CO-01 for additional asbestos abatement. 2KB confirmed scope is justified based on site conditions. Owner approved $45,000 cost and 5-day extension.', actionItems: [{ text: 'Owner to execute change order', owner: 'Henry County', dueDate: '2024-02-15', completed: true }, { text: 'ESCO to update project schedule', owner: 'JCI', dueDate: '2024-02-20', completed: true }], acknowledged: true },
    { id: 'mn3', projectId: 'p2', date: '2024-03-18', title: 'IGEA Review Kickoff', attendees: ['Sarah Kim (2KB)', 'James Morton (City of Morrow)', 'Lisa Park (Honeywell)'], summary: 'Initiated review of Honeywell IGEA report. Discussed escalation rates and ECM cost reconciliation. Sarah flagged electric escalation rate of 4.5% as aggressive.', actionItems: [{ text: 'Sarah to complete IGEA review checklist', owner: '2KB', dueDate: '2024-04-15', completed: false }, { text: 'Honeywell to provide sensitivity analysis at 3% escalation', owner: 'Honeywell', dueDate: '2024-04-01', completed: false }], acknowledged: false }
  ],
  timelineItems: [
    // Henry County Public Safety — Construction phase (p3)
    { id: 'tl1', projectId: 'p3', name: 'Pre-Construction Planning', startDate: '2023-10-01', endDate: '2023-12-15', status: 'completed', phase: 'Pre-Construction' },
    { id: 'tl2', projectId: 'p3', name: 'Submittals & Procurement', startDate: '2023-12-16', endDate: '2024-02-15', status: 'completed', phase: 'Procurement' },
    { id: 'tl3', projectId: 'p3', name: 'LED Lighting Installation', startDate: '2024-02-16', endDate: '2024-04-30', status: 'completed', phase: 'Construction' },
    { id: 'tl4', projectId: 'p3', name: 'Chiller Replacement', startDate: '2024-03-01', endDate: '2024-06-30', status: 'in progress', phase: 'Construction' },
    { id: 'tl5', projectId: 'p3', name: 'BAS Installation & Programming', startDate: '2024-04-01', endDate: '2024-07-15', status: 'in progress', phase: 'Construction' },
    { id: 'tl6', projectId: 'p3', name: 'Commissioning', startDate: '2024-07-01', endDate: '2024-08-15', status: 'pending', phase: 'Commissioning' },
    { id: 'tl7', projectId: 'p3', name: 'Substantial Completion', startDate: '2024-08-30', endDate: '2024-08-30', status: 'pending', phase: 'Milestone' },
    { id: 'tl8', projectId: 'p3', name: 'Punch List & Closeout', startDate: '2024-08-16', endDate: '2024-09-30', status: 'pending', phase: 'Closeout' },
    { id: 'tl9', projectId: 'p3', name: 'Owner Training', startDate: '2024-09-01', endDate: '2024-09-15', status: 'pending', phase: 'Closeout' },
    { id: 'tl10', projectId: 'p3', name: 'M&V Baseline Period Starts', startDate: '2024-10-01', endDate: '2024-10-01', status: 'pending', phase: 'Milestone' },
    // Clayton County Schools — Audit phase (p1)
    { id: 'tl11', projectId: 'p1', name: 'Project Kickoff', startDate: '2024-01-15', endDate: '2024-01-15', status: 'completed', phase: 'Milestone' },
    { id: 'tl12', projectId: 'p1', name: 'Utility Data Collection', startDate: '2024-01-16', endDate: '2024-02-15', status: 'completed', phase: 'Audit' },
    { id: 'tl13', projectId: 'p1', name: 'Site Surveys & Photo Capture', startDate: '2024-02-01', endDate: '2024-03-15', status: 'overdue', phase: 'Audit' },
    { id: 'tl14', projectId: 'p1', name: 'Energy Analysis & Modeling', startDate: '2024-03-01', endDate: '2024-04-15', status: 'in progress', phase: 'Audit' },
    { id: 'tl15', projectId: 'p1', name: 'Audit Report Draft', startDate: '2024-04-01', endDate: '2024-05-01', status: 'pending', phase: 'Deliverable' },
  ],
  teamContacts: [
    { id: 'tc1', projectId: 'p3', name: 'David Chen', role: 'Project Engineer', email: 'david@2kbenergyservices.com', phone: '(404) 555-2KB3' },
    { id: 'tc2', projectId: 'p3', name: 'Martin Francis', role: 'Principal / Technical Lead', email: 'martin@2kbenergyservices.com', phone: '(404) 555-2KB1' },
    { id: 'tc3', projectId: 'p2', name: 'Sarah Kim', role: 'Project Engineer', email: 'sarah@2kbenergyservices.com', phone: '(404) 555-2KB2' },
    { id: 'tc4', projectId: 'p2', name: 'Martin Francis', role: 'Principal / Technical Lead', email: 'martin@2kbenergyservices.com', phone: '(404) 555-2KB1' }
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
