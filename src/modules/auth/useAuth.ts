import { useCallback } from 'react';
import { useAuthStore } from '@lib/store/authStore';
import { signInWithEmail, signOut, mapAuthErrorCode } from './authService';
import { FirebaseError } from 'firebase/app';

export function useAuth() {
  const { setLoading, setError, reset } = useAuthStore();

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        await signInWithEmail(email, password);
        return { ok: true as const };
      } catch (err) {
        const message =
          err instanceof FirebaseError ? mapAuthErrorCode(err.code) : 'Something went wrong.';
        setError(message);
        return { ok: false as const, error: message };
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError],
  );

  const logout = useCallback(async () => {
    await signOut();
    reset();
  }, [reset]);

  return { login, logout };
}
