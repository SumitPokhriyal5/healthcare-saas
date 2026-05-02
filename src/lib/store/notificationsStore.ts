import { create } from 'zustand';
import type { NotificationPermissionState } from '@lib/notifications/service';

interface NotificationsState {
  permission: NotificationPermissionState;
  isRegistering: boolean;
  setPermission: (permission: NotificationPermissionState) => void;
  setRegistering: (registering: boolean) => void;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  permission: 'default',
  isRegistering: false,
  setPermission: (permission) => set({ permission }),
  setRegistering: (isRegistering) => set({ isRegistering }),
}));
