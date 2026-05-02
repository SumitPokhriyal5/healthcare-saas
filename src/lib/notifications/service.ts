export type NotificationPermissionState = 'default' | 'granted' | 'denied' | 'unsupported';

export interface ShowNotificationInput {
  title: string;
  body: string;
  url?: string;
  tag?: string;
}

export function isSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator;
}

export function getPermission(): NotificationPermissionState {
  if (!isSupported()) return 'unsupported';
  return Notification.permission;
}

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!isSupported()) return null;
  try {
    const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    await navigator.serviceWorker.ready;
    return registration;
  } catch (err) {
    console.error('Service worker registration failed:', err);
    return null;
  }
}

export async function requestPermission(): Promise<NotificationPermissionState> {
  if (!isSupported()) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  const result = await Notification.requestPermission();
  return result;
}

export async function showNotification(input: ShowNotificationInput): Promise<boolean> {
  if (!isSupported() || Notification.permission !== 'granted') return false;

  const registration = await navigator.serviceWorker.ready;

  const options: NotificationOptions = {
    body: input.body,
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    tag: input.tag,
    data: { url: input.url ?? '/dashboard' },
    requireInteraction: false,
  };

  if (registration.active) {
    registration.active.postMessage({
      type: 'SHOW_NOTIFICATION',
      payload: { title: input.title, options },
    });
    return true;
  }

  await registration.showNotification(input.title, options);
  return true;
}
