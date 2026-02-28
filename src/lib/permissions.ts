import type { UserRole, LockRecord } from '@/store';

export function canEdit(role: UserRole, isOwner: boolean): boolean {
  if (role === 'Admin') return true;
  if (role === 'Project Lead') return true;
  if (role === 'Engineer' && isOwner) return true;
  return false;
}

export function canDelete(role: UserRole): boolean {
  return role === 'Admin';
}

export function canApprove(role: UserRole): boolean {
  return role === 'Admin' || role === 'Project Lead';
}

export function canUnlockBaseline(role: UserRole): boolean {
  return role === 'Admin';
}

export function getLockReason(lock: LockRecord): string {
  switch (lock.lockType) {
    case 'approval':
      return `Locked — approved by ${lock.lockedBy} on ${new Date(lock.lockedAt).toLocaleDateString()}. ${lock.reason}`;
    case 'baseline':
      return `Locked — baseline data established. ${lock.reason}`;
    case 'signed':
      return `Locked — signed document. ${lock.reason}`;
    case 'immutable':
      return `Locked — contractual value, cannot be modified. ${lock.reason}`;
    default:
      return lock.reason || 'This record is locked.';
  }
}
