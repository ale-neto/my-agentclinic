import { SkeletonCard, SkeletonText } from '@/components/Skeleton'

export default function Loading() {
  return (
    <div className="p-4 sm:p-8">
      <SkeletonText className="h-8 w-40" />
      <SkeletonText className="mt-2 h-4 w-72" />
      <div className="mt-6 space-y-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <div className="flex items-center gap-3">
              <SkeletonText className="h-6 w-40" />
              <SkeletonText className="h-5 w-16 rounded-full" />
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
