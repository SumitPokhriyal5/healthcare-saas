import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Card, CardBody } from '@shared/components';
import type { KpiMetric } from './types';

const toneClasses: Record<KpiMetric['tone'], string> = {
  brand: 'bg-brand-50 text-brand-600',
  success: 'bg-emerald-50 text-emerald-600',
  warning: 'bg-amber-50 text-amber-600',
  danger: 'bg-red-50 text-red-600',
};

interface KpiCardProps {
  metric: KpiMetric;
}

export function KpiCard({ metric }: KpiCardProps) {
  const Icon = metric.icon;
  const isPositive = metric.change >= 0;
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${toneClasses[metric.tone]}`}
          >
            <Icon size={20} />
          </div>
          <div
            className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${
              isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
            }`}
          >
            <TrendIcon size={12} />
            {Math.abs(metric.change)}%
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-500">{metric.label}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-slate-900">{metric.value}</span>
          <span className="text-xs text-slate-400">{metric.changeLabel}</span>
        </div>
      </CardBody>
    </Card>
  );
}
