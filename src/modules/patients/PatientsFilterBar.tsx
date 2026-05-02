import { LayoutGrid, List, Search, X } from 'lucide-react';
import { Input, Select, Toggle, type SelectOption } from '@shared/components';
import { usePatientsStore } from '@lib/store/patientsStore';
import { useUIStore } from '@lib/store/uiStore';
import type { PatientStatus } from '@shared/types/patient';

const statusOptions: SelectOption[] = [
  { value: 'all', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'follow-up', label: 'Follow-up' },
  { value: 'critical', label: 'Critical' },
  { value: 'discharged', label: 'Discharged' },
];

export function PatientsFilterBar() {
  const { filters, setSearch, setStatusFilter, resetFilters } = usePatientsStore();
  const viewMode = useUIStore((s) => s.patientsViewMode);
  const setViewMode = useUIStore((s) => s.setPatientsViewMode);

  const isFiltered = filters.search.length > 0 || filters.status !== 'all';

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <Input
          name="patient-search"
          placeholder="Search by name, condition, or doctor"
          value={filters.search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          aria-label="Search patients"
        />
      </div>

      <div className="w-full sm:w-44">
        <Select
          name="patient-status"
          aria-label="Filter by status"
          value={filters.status}
          onChange={(e) => setStatusFilter(e.target.value as PatientStatus | 'all')}
          options={statusOptions}
        />
      </div>

      {isFiltered && (
        <button
          type="button"
          onClick={resetFilters}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={14} />
          Clear
        </button>
      )}

      <Toggle
        ariaLabel="View mode"
        value={viewMode}
        onChange={setViewMode}
        options={[
          { value: 'grid', label: 'Grid', icon: <LayoutGrid size={14} /> },
          { value: 'list', label: 'List', icon: <List size={14} /> },
        ]}
      />
    </div>
  );
}
