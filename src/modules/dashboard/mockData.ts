import { Users, Activity, AlertTriangle, CalendarCheck } from 'lucide-react';
import type { KpiMetric, ActivityItem } from './types';

export const kpiMetrics: KpiMetric[] = [
  {
    id: 'active-patients',
    label: 'Active patients',
    value: '1,284',
    change: 4.2,
    changeLabel: 'vs last week',
    icon: Users,
    tone: 'brand',
  },
  {
    id: 'appointments-today',
    label: 'Appointments today',
    value: '47',
    change: 12.5,
    changeLabel: 'vs yesterday',
    icon: CalendarCheck,
    tone: 'success',
  },
  {
    id: 'critical-alerts',
    label: 'Critical alerts',
    value: '6',
    change: -8.3,
    changeLabel: 'vs last week',
    icon: AlertTriangle,
    tone: 'danger',
  },
  {
    id: 'avg-occupancy',
    label: 'Avg. bed occupancy',
    value: '78%',
    change: 2.1,
    changeLabel: 'vs last month',
    icon: Activity,
    tone: 'warning',
  },
];

export const recentActivity: ActivityItem[] = [
  {
    id: 'a1',
    type: 'admission',
    title: 'New admission',
    description: 'Admitted to Cardiology, Room 304',
    timestamp: '12 min ago',
    patientName: 'Aanya Sharma',
  },
  {
    id: 'a2',
    type: 'alert',
    title: 'Critical vitals',
    description: 'Heart rate elevated above threshold',
    timestamp: '38 min ago',
    patientName: 'Rohan Mehta',
  },
  {
    id: 'a3',
    type: 'lab',
    title: 'Lab results ready',
    description: 'CBC panel completed',
    timestamp: '1 hr ago',
    patientName: 'Priya Iyer',
  },
  {
    id: 'a4',
    type: 'appointment',
    title: 'Appointment scheduled',
    description: 'Follow-up with Dr. Kapoor on Friday',
    timestamp: '2 hr ago',
    patientName: 'Vikram Singh',
  },
  {
    id: 'a5',
    type: 'discharge',
    title: 'Patient discharged',
    description: 'Discharged from Orthopedics',
    timestamp: '3 hr ago',
    patientName: 'Sara Khan',
  },
  {
    id: 'a6',
    type: 'admission',
    title: 'New admission',
    description: 'Admitted to Pediatrics, Room 112',
    timestamp: '4 hr ago',
    patientName: 'Aarav Reddy',
  },
];
