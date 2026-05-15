import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-5xl font-bold text-gray-900">404</p>
      <p className="mt-3 text-gray-600">This page doesn&apos;t exist.</p>
      <Link href="/" className="mt-6 text-indigo-600 hover:text-indigo-800">
        ← Back to home
      </Link>
    </div>
  )
}
