import { Lock } from 'lucide-react';
import { useState } from 'react';
import type { LockRecord } from '@/store';
import { getLockReason } from '@/lib/permissions';

export function LockIndicator({ lock }: { lock: LockRecord }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Lock className="w-3.5 h-3.5 text-[#5A6B88]" />
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#1E2A45] border border-[#2A3A5C] rounded-lg text-xs text-[#CBD2DF] whitespace-nowrap z-50 shadow-xl max-w-xs">
          {getLockReason(lock)}
        </div>
      )}
    </div>
  );
}
