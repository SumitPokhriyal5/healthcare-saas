import {
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { firebaseAuth } from '@lib/firebase/client';
import type { AuthUser } from '@shared/types/auth';

export function mapFirebaseUser(user: User | null): AuthUser | null {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
}

export async function signInWithEmail(email: string, password: string): Promise<AuthUser> {
  const credential = await signInWithEmailAndPassword(firebaseAuth, email, password);
  return mapFirebaseUser(credential.user)!;
}

export async function signOut(): Promise<void> {
  await fbSignOut(firebaseAuth);
}

export function subscribeToAuthChanges(callback: (user: AuthUser | null) => void): () => void {
  return onAuthStateChanged(firebaseAuth, (user) => {
    callback(mapFirebaseUser(user));
  });
}

export function mapAuthErrorCode(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.';
    default:
      return 'Something went wrong. Please try again.';
  }
}
