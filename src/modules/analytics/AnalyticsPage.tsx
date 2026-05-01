import { PageHeader } from '@shared/components/PageHeader';

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader title="Analytics" subtitle="Charts and insights" />
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Charts will go here.
      </div>
    </div>
  );
}
