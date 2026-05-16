type SkeletonProps = { className?: string }

export function SkeletonText({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse rounded bg-gray-200 ${className}`} />
}

export function SkeletonCard({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse rounded-lg border border-gray-200 bg-gray-50 p-4 ${className}`}>
      <div className="mb-2 h-4 w-2/3 rounded bg-gray-200" />
      <div className="h-3 w-full rounded bg-gray-200" />
      <div className="mt-1 h-3 w-4/5 rounded bg-gray-200" />
    </div>
  )
}

export function SkeletonTableRow() {
  return (
    <div className="flex items-center gap-4 border-b border-gray-100 px-4 py-3 last:border-0">
      <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-1/6 animate-pulse rounded bg-gray-200" />
      <div className="h-5 w-16 animate-pulse rounded-full bg-gray-200" />
    </div>
  )
}
