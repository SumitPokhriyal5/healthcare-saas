import { useEffect, type ReactNode } from 'react';
import { useAuthStore } from '@lib/store/authStore';
import { subscribeToAuthChanges } from './authService';

interface Props {
  children: ReactNode;
}

export default function AuthBootstrap({ children }: Props) {
  const { setUser, setAuthReady, isAuthReady } = useAuthStore();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setUser(user);
      setAuthReady(true);
    });
    return unsubscribe;
  }, [setUser, setAuthReady]);

  if (!isAuthReady) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-brand-600" />
      </div>
    );
  }

  return <>{children}</>;
}
