import type { ReactNode } from 'react';

export interface ToggleOption<T extends string> {
  value: T;
  label: string;
  icon?: ReactNode;
}

interface ToggleProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: ToggleOption<T>[];
  ariaLabel: string;
  size?: 'sm' | 'md';
}

const sizeClasses = {
  sm: 'h-8 text-xs',
  md: 'h-9 text-sm',
};

export function Toggle<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
  size = 'md',
}: ToggleProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1 ${sizeClasses[size]}`}
    >
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(opt.value)}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 font-medium transition-colors ${
              isActive ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            } h-full`}
          >
            {opt.icon}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
