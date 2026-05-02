import { useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Users } from 'lucide-react';
import { PageHeader, Card, EmptyState } from '@shared/components';
import { usePatientsStore, filterPatients } from '@lib/store/patientsStore';
import { useUIStore } from '@lib/store/uiStore';
import { mockPatients } from './mockData';
import { PatientsFilterBar } from './PatientsFilterBar';
import { PatientCard } from './PatientCard';
import { PatientListRow } from './PatientListRow';
import { PatientDetailDrawer } from './PatientDetailDrawer';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';

export default function PatientsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const setPatients = usePatientsStore((s) => s.setPatients);
  const allPatients = usePatientsStore((s) => s.patients);
  const filters = usePatientsStore((s) => s.filters);
  const viewMode = useUIStore((s) => s.patientsViewMode);
  useDocumentTitle('Patients');

  useEffect(() => {
    setPatients(mockPatients);
  }, [setPatients]);

  const filtered = useMemo(() => filterPatients(allPatients, filters), [allPatients, filters]);

  const selectedPatient = useMemo(
    () => (id ? (allPatients.find((p) => p.id === id) ?? null) : null),
    [id, allPatients],
  );

  const openPatient = useCallback(
    (patientId: string) => navigate(`/patients/${patientId}`),
    [navigate],
  );
  const closeDrawer = useCallback(() => navigate('/patients'), [navigate]);

  return (
    <div className="space-y-5">
      <div>
        <PageHeader
          title="Patients"
          subtitle={`${filtered.length} of ${allPatients.length} shown`}
        />
        <p role="status" aria-live="polite" className="sr-only">
          {filtered.length} of {allPatients.length} patients shown
        </p>
      </div>

      <PatientsFilterBar />

      {filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No patients match your filters"
          description="Try adjusting your search or clearing filters."
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <PatientCard key={p.id} patient={p} onSelect={openPatient} />
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="hidden px-4 py-3 font-medium sm:table-cell">Age</th>
                  <th className="hidden px-4 py-3 font-medium md:table-cell">Condition</th>
                  <th className="hidden px-4 py-3 font-medium lg:table-cell">Doctor</th>
                  <th className="hidden px-4 py-3 font-medium lg:table-cell">Last visit</th>
                  <th className="px-4 py-3 text-right font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <PatientListRow key={p.id} patient={p} onSelect={openPatient} />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <PatientDetailDrawer patient={selectedPatient} onClose={closeDrawer} />
    </div>
  );
}
