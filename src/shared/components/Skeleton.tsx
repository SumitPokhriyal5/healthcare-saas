interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`motion-safe:animate-pulse rounded-md bg-slate-200 ${className}`}
    />
  );
}
