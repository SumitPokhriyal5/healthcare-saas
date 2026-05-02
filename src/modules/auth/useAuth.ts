import { useCallback } from 'react';
import { FirebaseError } from 'firebase/app';
import { useAuthStore } from '@lib/store/authStore';
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signOut,
  mapAuthErrorCode,
} from './authService';

export function useAuth() {
  const { setLoading, setError, reset } = useAuthStore();

  const handleError = (err: unknown): string => {
    return err instanceof FirebaseError ? mapAuthErrorCode(err.code) : 'Something went wrong.';
  };

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        await signInWithEmail(email, password);
        return { ok: true as const };
      } catch (err) {
        const message = handleError(err);
        setError(message);
        return { ok: false as const, error: message };
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError],
  );

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        await signUpWithEmail(name, email, password);
        return { ok: true as const };
      } catch (err) {
        const message = handleError(err);
        setError(message);
        return { ok: false as const, error: message };
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError],
  );

  const loginWithGoogle = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      return { ok: true as const };
    } catch (err) {
      const message = handleError(err);
      setError(message);
      return { ok: false as const, error: message };
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const logout = useCallback(async () => {
    await signOut();
    reset();
  }, [reset]);

  return { login, signup, loginWithGoogle, logout };
}
