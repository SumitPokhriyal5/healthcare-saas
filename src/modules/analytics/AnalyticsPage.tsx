import { useMemo, useState } from 'react';
import { PageHeader, Select, type SelectOption } from '@shared/components';
import { ChartCard } from './ChartCard';
import { AdmissionsChart } from './AdmissionsChart';
import { DepartmentChart } from './DepartmentChart';
import { AppointmentStatusChart } from './AppointmentStatusChart';
import { appointmentStatus, departmentBreakdown, getAdmissionsSeries } from './mockData';
import type { DateRange } from './types';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';

const rangeOptions: SelectOption[] = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '12m', label: 'Last 12 months' },
];

export default function AnalyticsPage() {
  const [range, setRange] = useState<DateRange>('30d');
  const admissionsData = useMemo(() => getAdmissionsSeries(range), [range]);
  useDocumentTitle('Analytics');

  const rangeSelect = (
    <div className="w-44">
      <Select
        aria-label="Date range"
        value={range}
        onChange={(e) => setRange(e.target.value as DateRange)}
        options={rangeOptions}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        subtitle="Operational insights across your facility"
        actions={rangeSelect}
      />

      <ChartCard
        title="Admissions vs discharges"
        description={`Over ${rangeOptions.find((o) => o.value === range)?.label.toLowerCase()}`}
      >
        <AdmissionsChart data={admissionsData} />
      </ChartCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Patients by department" description="Active patient distribution">
          <DepartmentChart data={departmentBreakdown} />
        </ChartCard>

        <ChartCard title="Appointment status" description="This month, by outcome">
          <AppointmentStatusChart data={appointmentStatus} />
        </ChartCard>
      </div>
    </div>
  );
}
