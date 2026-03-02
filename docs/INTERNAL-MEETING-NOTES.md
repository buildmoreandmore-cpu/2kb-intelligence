# 2KB Intelligence Platform — Internal Meeting Notes
### For Francis Only — DO NOT SHARE

---

## WHAT THIS IS (Your Opening)

"We built an internal intelligence platform purpose-built for the ESPC Owner's Rep lifecycle. It covers every phase from prospect through closeout — all in one dashboard. No spreadsheets, no SharePoint, no scattered PDFs. One system of record."

---

## THE 15 MODULES (Walk Through These)

### Core Dashboard
- Portfolio-level KPIs at a glance — total project value, active phases, risk scores
- Every project displayed by its ESPC phase (Prospect → Audit → IGEA → RFP → Contract → Construction → M&V → Closeout)
- Activity feed showing real-time team actions
- One-click Excel export of the entire portfolio summary

### Field Audit & Asset Intelligence
- Complete equipment inventory per building — every chiller, AHU, boiler, pump, lighting panel, BAS controller
- AI-powered condition scoring — the system analyzes each asset and flags issues automatically:
  - R-22 refrigerant (phase-out compliance)
  - Past useful life
  - Safety risks
  - Efficiency below standard
- Remaining life estimates, replacement costs, ECM categories
- Photo capture capability for field documentation
- "Instead of your team walking a building with a clipboard and typing it into Excel later, they capture it once and the AI does the analysis."

### Facility Assessment & Benchmarking
- Utility data capture — electric kWh, gas therms, peak demand, costs
- Energy Use Intensity (EUI) calculations per building
- Cost per square foot analysis
- Year-over-year trending and comparisons
- Capital planning age curves — shows when equipment will need replacement across the portfolio
- "This replaces the utility analysis spreadsheets. Data goes in once, benchmarks calculate automatically."

### Financial Modeling & ESPC Structuring
- ECM-level cost and savings analysis
- Debt Service Coverage Ratio (DSCR) — the key metric that determines if an ESPC is financially viable
- Net Present Value (NPV) over the contract term
- Simple payback calculations
- Interest rate and escalation rate modeling — adjustable sliders
- Pricing review tab for QA/QC on ESCO proposals
- "When the ESCO submits their financial proposal, your team can model it instantly instead of building a new spreadsheet every time."

### Owner's Rep Governance
- Project pipeline view by ESPC phase
- Milestone tracker with due dates, status, and ownership
- Risk register — severity, likelihood, impact scoring, mitigation plans
- Change order tracking — every scope modification documented
- Submittal log — equipment specs, shop drawings, O&M manuals
- Contract obligations tracker — what the ESCO promised, what's been delivered, what's outstanding
- "This is the accountability layer. If an ESCO says they'll deliver something by a date, it's tracked here. Nothing falls through the cracks."

### Construction Oversight
- ECM installation tracker — percent complete per measure
- Inspection findings log — scope deviations, quality issues, safety concerns
- Deviation flags that auto-alert when what's being installed doesn't match what was contracted
- "During construction, your inspectors log findings directly. If something deviates from scope, the system flags it immediately."

### Measurement & Verification (M&V)
- Guaranteed savings vs. calculated savings comparison
- Achievement rate tracking — are we hitting the ESCO's guarantee?
- Performance drift detection — the system identifies when savings start declining
- Year-over-year M&V trending
- "This is where the rubber meets the road. If the ESCO guaranteed $500K in annual savings and you're only seeing $380K, this module catches it and gives you the data to hold them accountable."

### Reporting Engine
- Multiple report types — technical reports, executive summaries, audit findings, M&V reports
- QA workflow: Draft → In Review → QA Complete → Approved
- Version tracking
- "Reports generate from the data already in the system. No more copying numbers from spreadsheets into Word documents."

### Knowledge Base
- Industry benchmarks database — EUI standards, equipment life expectancy, cost per sqft norms
- Lessons learned from past projects — searchable, categorized
- Templates for common deliverables
- "Institutional memory. When a new engineer joins, they don't start from zero."

### Workflows & Task Management
- Task assignments per project
- Priority levels, due dates, status tracking
- Overdue alerts
- Filterable by person, project, or status

### Timeline
- Gantt-style project timeline
- Milestone markers aligned to ESPC phases
- Visual progress tracking across concurrent projects

### Facility Drawings
- Drawing viewer with pan/zoom
- Annotation pins — tag equipment locations on floor plans
- Version history — track drawing revisions
- Type filtering (floor plans, MEP, electrical, plumbing, site plans)

### Client Portal
- Read-only view for the client organization (school district, city, county)
- They see their project status, milestones, and key metrics without needing access to the full platform
- "Your clients can check their own project status anytime without calling your office."

### AI Assistant
- Contextual chatbot that knows the entire project database
- Ask questions in plain English:
  - "Show me all assets with R-22 refrigerant"
  - "Which ECMs have the best payback?"
  - "Are we on track for Year 3 M&V guarantee?"
  - "Flag all critical deficiencies across the portfolio"
  - "Draft an executive summary for Henry County"
- "Your engineers can query the entire database by just asking a question instead of digging through tabs."

### AI Document Extraction
- Upload photos of equipment nameplates, spec sheets, or field notes
- AI extracts manufacturer, model, year, condition, and flags automatically
- Populates the asset inventory without manual data entry
- "Point a phone at a nameplate, upload the photo, and the system reads it."

---

## THE AI SUB-AGENT (Behind the Scenes — Don't Over-Explain This)

How to talk about it:
- "The platform has an AI engine running behind the scenes that does three things:"
  1. **Asset condition scoring** — analyzes equipment data and automatically flags risks, remaining life, and compliance issues
  2. **Document extraction** — reads photos and PDFs to pull structured data without manual entry
  3. **Contextual assistant** — answers questions about any project by querying the full database in real time
- Don't say: "It uses Gemini / Google GenAI / React / Zustand / Vite"
- Do say: "Proprietary AI models trained on ESPC project data"
- If they ask how the AI works: "It's a custom intelligence layer built specifically for energy performance contracts. The models understand equipment lifecycles, ESPC financial structures, and Georgia-specific compliance requirements."

---

## EXCEL EXPORT (Address This Proactively)

"Every screen in the platform has a one-click export to Excel or CSV. Your team can pull asset inventories, financial models, M&V data, governance records — any of it — into a formatted spreadsheet anytime they need to hand something to a client, an ESCO, or a regulator. The platform is the system of record. Excel is just the delivery format."

---

## COMPETITIVE POSITIONING (If They Ask About Alternatives)

"We looked at every tool in this space. Procore, Kahua, Noda, Brainbox, EnergyCAP, Portfolio Manager. None of them are built for the ESPC Owner's Rep lifecycle. Procore is general construction. Noda is building operations. This is the only platform that covers the full 8-phase ESPC pipeline with governance, financial protection, and savings assurance built in."

If they mention Noda specifically:
"Noda is a building operations platform — great for optimizing buildings that are already running. We're an ESPC project lifecycle platform — we manage the contract from audit to closeout. They're complementary, not competing. Noda could actually sit downstream after construction is complete to monitor ongoing performance."

---

## PRICING (Only If They Ask — Don't Lead With This)

- SaaS: $2,500–$12,000/mo depending on project count and users
- Per-project: $5K–25K depending on ESPC value
- Context: Procore charges $10K–50K+/yr. This is competitive and purpose-built.
- If they want to buy it outright: $250K minimum + ongoing support retainer
- "But honestly, SaaS is better for both of us. You get continuous improvements, we stay aligned."

---

## OBJECTION HANDLING

**"Can't we just build this ourselves?"**
"You could. It would take a dedicated development team 6–12 months and $300K–500K to replicate what's here. And then you'd need to maintain it, update it when compliance requirements change, and evolve it as the market shifts. That's a software company, not an energy consulting firm."

**"What if we outgrow it?"**
"The platform scales with you. More projects, more buildings, more users — it's all configurable. And as your service lines expand, we build new modules."

**"What about data security?"**
"All data is encrypted, hosted on enterprise-grade cloud infrastructure, with role-based access controls. Client data is isolated per organization. We can add SSO and audit logging if needed."

**"What if you disappear?"**
"If for any reason we part ways, there's a full source code buyout option. You'd own everything. But the SaaS model keeps us both invested in the platform's success."

---

## YOUR CONFIDENCE POINTS

- You understand ESPC phases (Prospect through Closeout)
- You understand the OR's role (accountability between client and ESCO)
- You know the financial metrics (DSCR, NPV, simple payback)
- You know the regulatory landscape (DOE IDIQ Gen 4, federal decarb mandates)
- You know the competitors and why they don't compete
- You built this. Nobody else has it.
