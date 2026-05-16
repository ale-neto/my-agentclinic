import { SkeletonCard, SkeletonText } from '@/components/Skeleton'

export default function Loading() {
  return (
    <div className="p-4 sm:p-8">
      <SkeletonText className="h-8 w-36" />
      <SkeletonText className="mt-2 h-4 w-52" />
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <SkeletonCard className="mt-4 h-20" />
      <SkeletonText className="mt-6 h-6 w-48" />
      <SkeletonCard className="mt-3 h-40" />
    </div>
  )
}
