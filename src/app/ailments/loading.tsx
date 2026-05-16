import { SkeletonCard, SkeletonText } from '@/components/Skeleton'

export default function Loading() {
  return (
    <div className="p-4 sm:p-8">
      <SkeletonText className="h-8 w-40" />
      <SkeletonText className="mt-2 h-4 w-72" />
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  )
}
