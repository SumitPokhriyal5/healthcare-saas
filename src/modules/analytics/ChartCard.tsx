import type { ReactNode } from 'react';
import { Card, CardHeader, CardBody } from '@shared/components';

interface ChartCardProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  description,
  actions,
  children,
  className = '',
}: ChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-semibold text-slate-900">{title}</h2>
            {description && <p className="mt-0.5 text-xs text-slate-500">{description}</p>}
          </div>
          {actions}
        </div>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
}
