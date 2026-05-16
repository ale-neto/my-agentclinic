import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { getAgents } from '@/lib/agents'
import { StatusBadge } from '@/components/StatusBadge'

export default async function AgentsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const agents = await getAgents()

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Agents</h1>
      <p className="mt-1 text-sm text-gray-500">All registered agents.</p>

      {agents.length === 0 ? (
        <p className="mt-8 text-sm text-gray-500">
          No agents registered yet. Run{' '}
          <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-xs">
            pnpm prisma db seed
          </code>{' '}
          to get started.
        </p>
      ) : (
        <>
      {/* Mobile cards */}
      <div className="mt-6 space-y-3 sm:hidden">
        {agents.map((agent) => (
          <div key={agent.id} className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <span className="font-medium text-gray-900">{agent.name}</span>
              <StatusBadge status={agent.status} />
            </div>
            <p className="mt-1 font-mono text-xs text-gray-500">{agent.model}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                {new Date(agent.createdAt).toLocaleDateString()}
              </span>
              <Link
                href={`/agents/${agent.id}`}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                View →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="mt-6 hidden overflow-x-auto rounded-lg border border-gray-200 sm:block">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Model</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Registered</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {agents.map((agent) => (
              <tr key={agent.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{agent.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-gray-600">{agent.model}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={agent.status} />
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(agent.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/agents/${agent.id}`}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </>
      )}
    </div>
  )
}
