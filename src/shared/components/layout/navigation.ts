import { LayoutDashboard, BarChart3, Users, type LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Analytics', to: '/analytics', icon: BarChart3 },
  { label: 'Patients', to: '/patients', icon: Users },
];
