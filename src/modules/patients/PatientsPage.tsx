import { PageHeader } from '@shared/components/PageHeader';

export default function PatientsPage() {
  return (
    <div>
      <PageHeader title="Patients" subtitle="Manage your patient list" />
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Grid and list views will go here.
      </div>
    </div>
  );
}
