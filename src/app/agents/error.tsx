'use client'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: Props) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-lg font-semibold text-gray-900">Could not load agents.</p>
      <p className="mt-2 text-sm text-gray-500">
        The clinic&apos;s records are temporarily unavailable.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Try again
      </button>
    </div>
  )
}
