export function AuthDivider({ label = 'or' }: { label?: string }) {
  return (
    <div className="relative my-5 flex items-center">
      <div className="flex-1 border-t border-slate-200" />
      <span className="px-3 text-xs uppercase tracking-wide text-slate-400">{label}</span>
      <div className="flex-1 border-t border-slate-200" />
    </div>
  );
}
