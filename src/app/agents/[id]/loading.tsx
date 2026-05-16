import { SkeletonCard, SkeletonText, SkeletonTableRow } from '@/components/Skeleton'

export default function Loading() {
  return (
    <div className="p-4 sm:p-8">
      <SkeletonText className="h-4 w-24" />
      <SkeletonCard className="mt-4 h-32" />
      <SkeletonText className="mt-8 h-6 w-32" />
      <div className="mt-3 rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex gap-6">
            <SkeletonText className="h-4 w-20" />
            <SkeletonText className="h-4 w-16" />
            <SkeletonText className="h-4 w-14" />
          </div>
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonTableRow key={i} />
        ))}
      </div>
    </div>
  )
}
