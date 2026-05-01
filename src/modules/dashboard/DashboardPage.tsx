import { PageHeader } from '@shared/components/PageHeader';

export default function DashboardPage() {
  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of key metrics" />
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        KPI cards and activity feed will go here.
      </div>
    </div>
  );
}
