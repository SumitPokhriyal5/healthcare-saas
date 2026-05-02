import { useCallback } from 'react';
import { useNotificationsStore } from '@lib/store/notificationsStore';
import {
  getPermission,
  requestPermission,
  showNotification,
  type ShowNotificationInput,
} from './service';

export function useNotifications() {
  const permission = useNotificationsStore((s) => s.permission);
  const setPermission = useNotificationsStore((s) => s.setPermission);

  const enable = useCallback(async () => {
    const result = await requestPermission();
    setPermission(result);
    return result;
  }, [setPermission]);

  const notify = useCallback(
    async (input: ShowNotificationInput) => {
      if (getPermission() !== 'granted') {
        const result = await requestPermission();
        setPermission(result);
        if (result !== 'granted') return false;
      }
      return showNotification(input);
    },
    [setPermission],
  );

  return { permission, enable, notify };
}
