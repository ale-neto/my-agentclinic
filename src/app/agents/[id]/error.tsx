'use client'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: Props) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-lg font-semibold text-gray-900">Could not load this agent.</p>
      <p className="mt-2 text-sm text-gray-500">
        Their record may be in a dissociative state. Try again shortly.
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
