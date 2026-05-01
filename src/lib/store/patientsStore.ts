import { create } from 'zustand';
import type { Patient, PatientStatus } from '@shared/types/patient';

interface PatientsFilters {
  search: string;
  status: PatientStatus | 'all';
}

interface PatientsState {
  patients: Patient[];
  filters: PatientsFilters;
  isLoading: boolean;
  setPatients: (patients: Patient[]) => void;
  setSearch: (search: string) => void;
  setStatusFilter: (status: PatientStatus | 'all') => void;
  resetFilters: () => void;
  setLoading: (loading: boolean) => void;
}

const initialFilters: PatientsFilters = {
  search: '',
  status: 'all',
};

export const usePatientsStore = create<PatientsState>((set) => ({
  patients: [],
  filters: initialFilters,
  isLoading: false,
  setPatients: (patients) => set({ patients }),
  setSearch: (search) => set((state) => ({ filters: { ...state.filters, search } })),
  setStatusFilter: (status) => set((state) => ({ filters: { ...state.filters, status } })),
  resetFilters: () => set({ filters: initialFilters }),
  setLoading: (isLoading) => set({ isLoading }),
}));

export const selectFilteredPatients = (state: PatientsState): Patient[] => {
  const { search, status } = state.filters;
  const q = search.trim().toLowerCase();
  return state.patients.filter((p) => {
    if (status !== 'all' && p.status !== status) return false;
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.condition.toLowerCase().includes(q) ||
      p.doctor.toLowerCase().includes(q)
    );
  });
};
