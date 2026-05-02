import { useDocumentTitle } from '@shared/hooks/useDocumentTitle';
import SignupForm from './SignupForm';

export default function SignupPage() {
  useDocumentTitle('Create account');

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
            <span className="text-lg font-bold">H</span>
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">Create your account</h1>
          <p className="mt-1 text-sm text-slate-500">Start managing your patients in minutes</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SignupForm />
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Protected by Firebase Authentication
        </p>
      </div>
    </div>
  );
}
