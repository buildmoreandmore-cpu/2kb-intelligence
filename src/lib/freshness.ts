import type { FreshnessConfig } from '@/store';

export type FreshnessStatus = 'fresh' | 'amber' | 'red';

export function daysSinceUpdate(lastUpdated: string): number {
  const now = new Date();
  const updated = new Date(lastUpdated);
  const diffMs = now.getTime() - updated.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function getFreshnessStatus(lastUpdated: string, config: FreshnessConfig): FreshnessStatus {
  const days = daysSinceUpdate(lastUpdated);
  if (days >= config.redThresholdDays) return 'red';
  if (days >= config.amberThresholdDays) return 'amber';
  return 'fresh';
}

export function formatLastUpdated(lastUpdated: string): string {
  const days = daysSinceUpdate(lastUpdated);
  if (days === 0) return 'Updated today';
  if (days === 1) return 'Updated yesterday';
  if (days < 7) return `Updated ${days} days ago`;
  if (days < 30) return `Updated ${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `Updated ${Math.floor(days / 30)} months ago`;
  return `Updated ${Math.floor(days / 365)} years ago`;
}
