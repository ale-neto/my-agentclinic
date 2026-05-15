import { SkeletonText, SkeletonTableRow } from '@/components/Skeleton'

export default function Loading() {
  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <SkeletonText className="h-8 w-36" />
          <SkeletonText className="mt-2 h-4 w-48" />
        </div>
        <SkeletonText className="h-9 w-24 rounded" />
      </div>
      <div className="mt-6 rounded-lg border border-gray-200">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex gap-6">
            <SkeletonText className="h-4 w-16" />
            <SkeletonText className="h-4 w-20" />
            <SkeletonText className="h-4 w-16" />
            <SkeletonText className="h-4 w-14" />
          </div>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonTableRow key={i} />
        ))}
      </div>
    </div>
  )
}
