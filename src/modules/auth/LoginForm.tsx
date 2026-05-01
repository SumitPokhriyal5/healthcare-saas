import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@shared/components/Input';
import { Button } from '@shared/components/Button';
import { useAuthStore } from '@lib/store/authStore';
import { useAuth } from './useAuth';
import { loginSchema, type LoginFormValues } from './loginSchema';

type FieldErrors = Partial<Record<keyof LoginFormValues, string>>;

interface LocationState {
  from?: { pathname: string };
}

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const isLoading = useAuthStore((s) => s.isLoading);
  const serverError = useAuthStore((s) => s.error);

  const [values, setValues] = useState<LoginFormValues>({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const setError = useAuthStore((s) => s.setError);

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, [setError]);

  const updateField = (field: keyof LoginFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
      const errors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof LoginFormValues;
        if (!errors[field]) errors[field] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    const result = await login(parsed.data.email, parsed.data.password);
    if (result.ok) {
      const from = (location.state as LocationState | null)?.from?.pathname ?? '/dashboard';
      navigate(from, { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="you@hospital.com"
        autoComplete="email"
        value={values.email}
        onChange={(e) => updateField('email', e.target.value)}
        error={fieldErrors.email}
        disabled={isLoading}
      />
      <Input
        name="password"
        type="password"
        label="Password"
        placeholder="••••••••"
        autoComplete="current-password"
        value={values.password}
        onChange={(e) => updateField('password', e.target.value)}
        error={fieldErrors.password}
        disabled={isLoading}
      />

      {serverError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {serverError}
        </div>
      )}

      <Button type="submit" isLoading={isLoading} className="w-full">
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
}
