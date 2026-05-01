import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type PatientsViewMode = 'grid' | 'list';

interface UIState {
  patientsViewMode: PatientsViewMode;
  isSidebarOpen: boolean;
  setPatientsViewMode: (mode: PatientsViewMode) => void;
  togglePatientsViewMode: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      patientsViewMode: 'grid',
      isSidebarOpen: true,
      setPatientsViewMode: (patientsViewMode) => set({ patientsViewMode }),
      togglePatientsViewMode: () =>
        set((state) => ({
          patientsViewMode: state.patientsViewMode === 'grid' ? 'list' : 'grid',
        })),
      setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    }),
    {
      name: 'hc-ui',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
