import type { PatientStatus } from '@shared/types/patient';

export const statusMeta: Record<
  PatientStatus,
  { label: string; tone: 'success' | 'warning' | 'danger' | 'neutral' }
> = {
  active: { label: 'Active', tone: 'success' },
  'follow-up': { label: 'Follow-up', tone: 'warning' },
  critical: { label: 'Critical', tone: 'danger' },
  discharged: { label: 'Discharged', tone: 'neutral' },
};
