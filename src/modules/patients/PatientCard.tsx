import { Calendar, Stethoscope } from 'lucide-react';
import { Card, CardBody, Badge } from '@shared/components';
import { getInitials } from '@shared/utils/initials';
import { statusMeta } from './statusMeta';
import type { Patient } from '@shared/types/patient';

interface Props {
  patient: Patient;
  onClick: () => void;
}

export function PatientCard({ patient, onClick }: Props) {
  const status = statusMeta[patient.status];
  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="cursor-pointer transition-all hover:border-brand-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <CardBody>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              aria-hidden="true"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700"
            >
              {getInitials(patient.name)}
            </div>
            <div className="min-w-0">
              <p className="truncate font-medium text-slate-900">{patient.name}</p>
              <p className="text-xs text-slate-500">
                {patient.age} yrs · {patient.gender}
              </p>
            </div>
          </div>
          <Badge tone={status.tone}>{status.label}</Badge>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <Stethoscope size={14} className="shrink-0 text-slate-400" />
            <span className="truncate">{patient.condition}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar size={14} className="shrink-0 text-slate-400" />
            <span>Last visit {patient.lastVisit}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
