import type { LucideIcon } from 'lucide-react';

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  tone: 'brand' | 'success' | 'warning' | 'danger';
}

export type ActivityType = 'admission' | 'discharge' | 'alert' | 'appointment' | 'lab';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  patientName?: string;
}
