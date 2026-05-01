import { Menu, LogOut } from 'lucide-react';
import { useAuthStore } from '@lib/store/authStore';
import { useAuth } from '@modules/auth/useAuth';
import { Button } from '@shared/components/Button';

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const user = useAuthStore((s) => s.user);
  const { logout } = useAuth();

  const initials = (user?.displayName ?? user?.email ?? '?')
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('');

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      <button
        type="button"
        aria-label="Open menu"
        onClick={onMenuClick}
        className="rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
      >
        <Menu size={20} />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-900">
            {user?.displayName ?? user?.email?.split('@')[0]}
          </p>
          <p className="text-xs text-slate-500">{user?.email}</p>
        </div>

        <div
          aria-hidden="true"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700"
        >
          {initials}
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={logout}
          aria-label="Sign out"
          className="!px-2.5"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Sign out</span>
        </Button>
      </div>
    </header>
  );
}
