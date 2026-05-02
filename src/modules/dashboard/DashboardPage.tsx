import { useAuthStore } from '@lib/store/authStore';
import { PageHeader } from '@shared/components';
import { KpiCard } from './KpiCard';
import { ActivityFeed } from './ActivityFeed';
import { QuickActions } from './QuickActions';
import { kpiMetrics, recentActivity } from './mockData';
import { NotificationsCard } from './NotificationsCard';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';

export default function DashboardPage() {
  useDocumentTitle('Dashboard');
  const user = useAuthStore((s) => s.user);
  const greetingName = user?.displayName ?? user?.email?.split('@')[0] ?? 'there';

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${greetingName}`}
        subtitle="Here's what's happening across your facility today"
      />

      <section
        aria-label="Key metrics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {kpiMetrics.map((metric) => (
          <KpiCard key={metric.id} metric={metric} />
        ))}
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed items={recentActivity} />
        </div>
        <div className="space-y-6">
          <NotificationsCard />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
