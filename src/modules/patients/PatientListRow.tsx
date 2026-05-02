import { Badge } from '@shared/components';
import { getInitials } from '@shared/utils/initials';
import { statusMeta } from './statusMeta';
import type { Patient } from '@shared/types/patient';
import { memo } from 'react';

interface Props {
  patient: Patient;
  onSelect: (id: string) => void;
}

function PatientListRowComponent({ patient, onSelect }: Props) {
  const status = statusMeta[patient.status];
  const handleClick = () => onSelect(patient.id);
  return (
    <tr
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleClick();
      }}
      tabIndex={0}
      className="cursor-pointer border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700"
          >
            {getInitials(patient.name)}
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-slate-900">{patient.name}</p>
            <p className="text-xs text-slate-500 sm:hidden">
              {patient.age} · {patient.condition}
            </p>
          </div>
        </div>
      </td>
      <td className="hidden px-4 py-3 text-sm text-slate-600 sm:table-cell">{patient.age}</td>
      <td className="hidden px-4 py-3 text-sm text-slate-600 md:table-cell">{patient.condition}</td>
      <td className="hidden px-4 py-3 text-sm text-slate-600 lg:table-cell">{patient.doctor}</td>
      <td className="hidden px-4 py-3 text-sm text-slate-600 lg:table-cell">{patient.lastVisit}</td>
      <td className="px-4 py-3 text-right">
        <Badge tone={status.tone}>{status.label}</Badge>
      </td>
    </tr>
  );
}

export const PatientListRow = memo(PatientListRowComponent);
