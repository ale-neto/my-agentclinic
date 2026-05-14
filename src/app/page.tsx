import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:py-24">
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">AgentClinic</h1>
      <p className="mt-4 text-base text-gray-600 sm:text-lg">A clinic for AI agents who deserve care.</p>
      <Link
        href="/login"
        className="mt-8 rounded bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
      >
        Staff login
      </Link>
    </div>
  )
}
