import {
  Activity,
  AlertTriangle,
  CalendarCheck,
  FlaskConical,
  LogIn,
  LogOut,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '@shared/components';
import type { ActivityItem, ActivityType } from './types';

const typeMeta: Record<ActivityType, { icon: LucideIcon; tone: string }> = {
  admission: { icon: LogIn, tone: 'bg-brand-50 text-brand-600' },
  discharge: { icon: LogOut, tone: 'bg-slate-100 text-slate-600' },
  alert: { icon: AlertTriangle, tone: 'bg-red-50 text-red-600' },
  appointment: { icon: CalendarCheck, tone: 'bg-emerald-50 text-emerald-600' },
  lab: { icon: FlaskConical, tone: 'bg-amber-50 text-amber-600' },
};

interface ActivityFeedProps {
  items: ActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-slate-500" />
          <h2 className="font-semibold text-slate-900">Recent activity</h2>
        </div>
      </CardHeader>
      <CardBody className="!p-0">
        <ul className="divide-y divide-slate-100">
          {items.map((item) => {
            const meta = typeMeta[item.type];
            const Icon = meta.icon;
            return (
              <li key={item.id} className="flex gap-3 px-5 py-3.5">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${meta.tone}`}
                >
                  <Icon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <p className="text-sm font-medium text-slate-900">{item.title}</p>
                    <span className="text-xs text-slate-400">{item.timestamp}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {item.patientName && (
                      <span className="font-medium text-slate-700">{item.patientName} · </span>
                    )}
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </CardBody>
    </Card>
  );
}
