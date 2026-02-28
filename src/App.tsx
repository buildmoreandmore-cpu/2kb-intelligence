/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { FieldAudit } from './pages/FieldAudit';
import { Benchmarking } from './pages/Benchmarking';
import { FinancialModeling } from './pages/FinancialModeling';
import { Governance } from './pages/Governance';
import { Construction } from './pages/Construction';
import { MV } from './pages/MV';
import { Reporting } from './pages/Reporting';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { Workflows } from './pages/Workflows';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="assets" element={<FieldAudit />} />
          <Route path="benchmarking" element={<Benchmarking />} />
          <Route path="financial" element={<FinancialModeling />} />
          <Route path="governance" element={<Governance />} />
          <Route path="construction" element={<Construction />} />
          <Route path="mv" element={<MV />} />
          <Route path="reporting" element={<Reporting />} />
          <Route path="knowledge" element={<KnowledgeBase />} />
          <Route path="workflows" element={<Workflows />} />
          <Route path="*" element={<div className="p-8 text-neutral-500">Module under construction</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
