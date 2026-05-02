import type { AdmissionPoint, AppointmentStatusBucket, DateRange, DepartmentSlice } from './types';

const RANGE_POINTS: Record<DateRange, number> = {
  '7d': 7,
  '30d': 30,
  '90d': 12,
  '12m': 12,
};

const RANGE_LABEL: Record<DateRange, (i: number, total: number) => string> = {
  '7d': (i) => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] ?? `D${i + 1}`,
  '30d': (i) => `D${i + 1}`,
  '90d': (i) => `Wk ${i + 1}`,
  '12m': (i) =>
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i] ??
    `M${i + 1}`,
};

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function getAdmissionsSeries(range: DateRange): AdmissionPoint[] {
  const points = RANGE_POINTS[range];
  const rand = seeded(points * 7);
  return Array.from({ length: points }, (_, i) => ({
    label: RANGE_LABEL[range](i, points),
    admissions: Math.round(40 + rand() * 60),
    discharges: Math.round(30 + rand() * 50),
  }));
}

export const departmentBreakdown: DepartmentSlice[] = [
  { name: 'Cardiology', value: 320 },
  { name: 'Orthopedics', value: 240 },
  { name: 'Pediatrics', value: 180 },
  { name: 'Neurology', value: 140 },
  { name: 'General', value: 220 },
];

export const appointmentStatus: AppointmentStatusBucket[] = [
  { status: 'Completed', count: 412 },
  { status: 'Scheduled', count: 187 },
  { status: 'Cancelled', count: 64 },
  { status: 'No-show', count: 38 },
];
