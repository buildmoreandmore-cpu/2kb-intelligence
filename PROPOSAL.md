# 2KB Energy Intelligence Platform — Development Proposal

**Prepared for:** 2KB Energy Services
**Prepared by:** martin.builds
**Date:** March 2026

---

## Executive Summary

We've built a working demonstration of the 2KB Intelligence Platform — a custom internal tool that maps to your three service lines (Energy Audits, Owner's Representative, Construction Management) and the shared capabilities that run across all of them.

This proposal covers turning that demo into a production-ready platform your team uses daily. The goal is simple: **automate the structure so your engineers focus on judgment.**

---

## What You Saw in the Demo

| Module | What It Does |
|--------|-------------|
| Field Audit & Asset Intelligence | Photo-based equipment capture, AI extraction, deficiency flagging, asset database |
| Facility Benchmarking | Utility bill ingestion, EUI calculation, weather normalization, consumption profiling |
| Financial Modeling | ECM bundling, NPV/IRR/payback, cash flow projections, ESCO proposal comparison, guarantee risk scoring |
| Project Governance | Phase tracking (Prospect → Closeout), milestones, risks, change orders, submittals, contract obligations |
| Construction Oversight | Installation tracking per ECM, inspection findings, scope deviation alerts, photo documentation |
| M&V Engine | Baseline vs. actual comparison, savings vs. guarantee tracking, drift detection, annual report generation |
| Reporting & Deliverables | IGEA reports, council presentations, M&V reports, QA/QC workflows, PDF/slide/Excel export |
| Portfolio Dashboard | Active projects, capital exposure, risk heatmap, carbon reduction, upcoming milestones |
| Knowledge Base | Historical benchmarks, lessons learned, cost/savings database, outlier detection on new ESCO proposals |
| Workflows & Productivity | Meeting notes → action items, task assignment, milestone alerts, time tracking |

Plus: **Client Portal** — a separate view for building owners to track their project status, download reports, and see savings performance.

---

## What We're Building

The demo runs on simulated data. Production means:

- **Real database** — PostgreSQL with your actual project, building, and asset data
- **Real AI extraction** — point your phone camera at equipment, get structured data back instantly
- **Real file handling** — upload utility bills (PDF/CSV), drawings, photos — stored securely
- **Real calculations** — IPMVP-compliant weather normalization, NPV/IRR that holds up in contract negotiations
- **Real document generation** — one-click PDF reports, PowerPoint presentations, Excel exports with 2KB branding
- **Role-based access** — engineers, project managers, leadership each see what they need
- **Service line switching** — same platform adapts to Audit-only, OR-only, Construction-only, or full ESPC engagements

---

## Phased Delivery

### Phase 1 — Foundation + Field Audit (Weeks 1-4)
*Immediate value for engineers in the field*

- Production database (PostgreSQL) with full data model
- Authentication + role-based access (engineer, PM, admin, leadership)
- Field Audit module — photo capture → AI extraction → asset database
- Voice note transcription → structured audit entries
- Deficiency auto-flagging (R-22, age, efficiency, safety)
- Organization / building / asset management
- Mobile-optimized for field use
- Cloud deployment with SSL

**Deliverable:** Engineers can start capturing assets in the field on real projects.

---

### Phase 2 — Energy Analysis + Benchmarking (Weeks 5-8)
*Data-driven analysis on every building*

- Utility bill ingestion (manual entry, CSV upload, PDF extraction)
- Weather normalization using degree-day regression (IPMVP Option C)
- EUI calculation and portfolio benchmarking
- Peak demand pattern identification
- ECM opportunity flagging based on building type + consumption profile
- Historical benchmark database seeding from past 2KB projects

**Deliverable:** Upload 12 months of bills → get a complete energy profile with ECM recommendations.

---

### Phase 3 — Financial Engine + ESCO Review (Weeks 9-14)
*Where deal value lives*

- ECM bundle builder with cost/savings analysis
- NPV, IRR, simple payback, DSCR calculations
- 10-25 year cash flow projections with escalation scenarios
- Conservative / moderate / aggressive scenario modeling
- **ESCO Proposal Ingestion** — upload ESCO PDFs → extract structured data → auto-compare against 2KB benchmarks
- Red/yellow/green scorecard per ECM (flags aggressive pricing, inflated escalation rates)
- Guarantee risk scoring

**Deliverable:** Upload an ESCO proposal → get an instant comparison against your historical data with flagged deviations.

---

### Phase 4 — Governance + Construction (Weeks 15-20)
*Process control across the full ESPC lifecycle*

- Project phase tracking (Prospect → Audit → IGEA → RFP → Contract → Construction → M&V → Closeout)
- Milestone management with auto-generated defaults per phase
- Document management, risk logging, change order tracking
- Submittal tracking with approval workflows
- Contract obligation tracking (guarantees, warranties, reporting, financial, operational)
- Construction: installation progress per ECM, inspection findings, photo linkage
- Scope deviation alerts

**Deliverable:** Every project tracked from first conversation to final closeout, nothing falls through the cracks.

---

### Phase 5 — M&V + Reporting (Weeks 21-26)
*The long-term moat*

- Ongoing utility data ingestion + weather normalization
- Adjusted baseline vs. actual consumption comparison
- Savings vs. guarantee tracking with automatic shortfall detection
- Performance drift detection (flags degradation trends early)
- **Automated report generation:**
  - IGEA reports
  - M&V annual reports
  - Executive summaries
  - Council/board presentations (PowerPoint)
  - Carbon impact reports
  - Excel data exports
- QA/QC checklist workflows with reviewer sign-off
- 2KB branded templates across all output

**Deliverable:** One-click M&V reports that are contract-ready. Drift detection that catches problems before the ESCO does.

---

### Phase 6 — Dashboard + Intelligence Layer (Weeks 27-30)
*Portfolio visibility + institutional memory*

- Executive dashboard — all projects, all phases, all risk in one view
- Capital exposure and savings achievement tracking
- Carbon reduction portfolio totals
- Resource allocation visibility
- Knowledge base — lessons learned, historical benchmarks, template standardization
- Outlier detection on new ESCO proposals vs. completed project norms
- Meeting notes → auto-generated task summaries
- Milestone alert notifications (email/Slack)
- Client Portal — project status, report downloads, savings tracking, team contacts

**Deliverable:** Leadership sees the whole portfolio. Knowledge compounds instead of living in people's heads.

---

## Investment

| Phase | Scope | Timeline | Investment |
|-------|-------|----------|------------|
| 1 | Foundation + Field Audit | Weeks 1-4 | $12,000 |
| 2 | Benchmarking + Energy Analysis | Weeks 5-8 | $10,000 |
| 3 | Financial Engine + ESCO Review | Weeks 9-14 | $18,000 |
| 4 | Governance + Construction | Weeks 15-20 | $15,000 |
| 5 | M&V + Reporting | Weeks 21-26 | $18,000 |
| 6 | Dashboard + Intelligence | Weeks 27-30 | $12,000 |
| **Total** | **Full Platform** | **~7 months** | **$85,000** |

### Payment Structure

**Option A — Per Phase**
Pay at the start of each phase. No commitment beyond the current phase. Stop anytime.

**Option B — Monthly Retainer**
$12,500/month for 7 months. Includes all phases plus ongoing support and iteration.

**Option C — Upfront Discount**
$72,000 paid upfront (15% discount). Includes all 6 phases.

---

## Ongoing Support (Post-Launch)

After the platform is live:

| Tier | What's Included | Monthly |
|------|----------------|---------|
| Standard | Bug fixes, security updates, hosting management | $1,500/mo |
| Growth | Standard + new features (up to 20 hrs/mo), priority support | $3,500/mo |
| Enterprise | Dedicated development, unlimited features, SLA | $6,000/mo |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, Tailwind CSS, Recharts |
| Backend | Next.js API routes + Python microservice (energy calculations) |
| Database | PostgreSQL + TimescaleDB (utility time-series) |
| AI | Claude (equipment extraction, document analysis) |
| File Storage | AWS S3 |
| Document Gen | PDF (WeasyPrint), PowerPoint (python-pptx), Excel (openpyxl) |
| Auth | Role-based access (engineer, PM, admin, leadership) |
| Hosting | Vercel + Railway |

---

## Why martin.builds

- We built the demo you're looking at — we already understand your workflow
- AI-native development — Claude Vision, automated extraction, intelligent analysis built in from day one
- Energy engineering domain knowledge embedded in the platform design
- Rapid iteration — working software delivered every 4 weeks, not a spec doc in 6 months
- You own everything — code, data, deployment. No vendor lock-in.

---

## Next Steps

1. Monday demo walkthrough
2. Select starting phase (we recommend Phase 1 — prove the stack, deliver immediate field value)
3. Kick off within 1 week of agreement

---

*martin.builds — tools that multiply engineering capacity*
