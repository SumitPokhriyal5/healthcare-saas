import { useEffect } from 'react';
import { X, Calendar, Stethoscope, UserCircle, Phone, Mail } from 'lucide-react';
import { Badge, Button } from '@shared/components';
import { getInitials } from '@shared/utils/initials';
import { statusMeta } from './statusMeta';
import type { Patient } from '@shared/types/patient';

interface Props {
  patient: Patient | null;
  onClose: () => void;
}

export function PatientDetailDrawer({ patient, onClose }: Props) {
  useEffect(() => {
    if (!patient) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [patient, onClose]);

  if (!patient) return null;
  const status = statusMeta[patient.status];

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close patient details"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="patient-drawer-title"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 id="patient-drawer-title" className="font-semibold text-slate-900">
            Patient details
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-base font-semibold text-brand-700">
              {getInitials(patient.name)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-slate-900">{patient.name}</p>
              <p className="text-sm text-slate-500">
                {patient.age} yrs · {patient.gender} · ID {patient.id}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <Badge tone={status.tone}>{status.label}</Badge>
          </div>

          <dl className="mt-6 space-y-4">
            <DetailRow icon={Stethoscope} label="Condition" value={patient.condition} />
            <DetailRow icon={UserCircle} label="Attending physician" value={patient.doctor} />
            <DetailRow icon={Calendar} label="Last visit" value={patient.lastVisit} />
            <DetailRow icon={Phone} label="Contact" value="+91 ••• ••• ••00 (mock)" />
            <DetailRow icon={Mail} label="Email" value={`${patient.id}@example.com`} />
          </dl>
        </div>

        <div className="border-t border-slate-200 px-5 py-3">
          <Button variant="secondary" onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </aside>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        <Icon size={15} />
      </div>
      <div>
        <dt className="text-xs uppercase tracking-wide text-slate-400">{label}</dt>
        <dd className="text-sm text-slate-800">{value}</dd>
      </div>
    </div>
  );
}
