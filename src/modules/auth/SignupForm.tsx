import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button } from '@shared/components';
import { useAuthStore } from '@lib/store/authStore';
import { useAuth } from './useAuth';
import { signupSchema, type SignupFormValues } from './signupSchema';
import { GoogleButton } from './GoogleButton';
import { AuthDivider } from './AuthDivider';

type FieldErrors = Partial<Record<keyof SignupFormValues, string>>;

export default function SignupForm() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const isLoading = useAuthStore((s) => s.isLoading);
  const serverError = useAuthStore((s) => s.error);
  const setError = useAuthStore((s) => s.setError);

  const [values, setValues] = useState<SignupFormValues>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, [setError]);

  const updateField = (field: keyof SignupFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const redirectAfterAuth = () => {
    navigate('/dashboard', { replace: true });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const parsed = signupSchema.safeParse(values);
    if (!parsed.success) {
      const errors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof SignupFormValues;
        if (!errors[field]) errors[field] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    const result = await signup(parsed.data.name, parsed.data.email, parsed.data.password);
    if (result.ok) redirectAfterAuth();
  };

  return (
    <div>
      <GoogleButton label="Sign up with Google" onSuccess={redirectAfterAuth} />
      <AuthDivider />

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
          name="name"
          type="text"
          label="Full name"
          placeholder="Dr. Aanya Sharma"
          autoComplete="name"
          value={values.name}
          onChange={(e) => updateField('name', e.target.value)}
          error={fieldErrors.name}
          disabled={isLoading}
        />
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
          autoComplete="new-password"
          value={values.password}
          onChange={(e) => updateField('password', e.target.value)}
          error={fieldErrors.password}
          hint={!fieldErrors.password ? '8+ chars, 1 uppercase, 1 number' : undefined}
          disabled={isLoading}
        />
        <Input
          name="confirmPassword"
          type="password"
          label="Confirm password"
          placeholder="••••••••"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={(e) => updateField('confirmPassword', e.target.value)}
          error={fieldErrors.confirmPassword}
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
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-medium text-brand-600 hover:text-brand-700 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
