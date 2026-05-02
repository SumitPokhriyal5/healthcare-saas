import { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotificationsStore } from '@lib/store/notificationsStore';
import { getPermission, isSupported, registerServiceWorker } from './service';

export default function NotificationsBootstrap({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const setPermission = useNotificationsStore((s) => s.setPermission);
  const setRegistering = useNotificationsStore((s) => s.setRegistering);

  useEffect(() => {
    if (!isSupported()) {
      setPermission('unsupported');
      return;
    }
    setPermission(getPermission());
    setRegistering(true);
    registerServiceWorker().finally(() => setRegistering(false));
  }, [setPermission, setRegistering]);

  useEffect(() => {
    if (!isSupported()) return;

    const onMessage = (event: MessageEvent) => {
      if (event.data?.type === 'NAVIGATE' && typeof event.data.url === 'string') {
        navigate(event.data.url);
      }
    };

    navigator.serviceWorker.addEventListener('message', onMessage);
    return () => navigator.serviceWorker.removeEventListener('message', onMessage);
  }, [navigate]);

  return <>{children}</>;
}
