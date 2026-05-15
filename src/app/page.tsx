import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { AppointmentStatusBadge } from '@/components/AppointmentStatusBadge'
import {
  getActiveAgentCount,
  getOpenAppointmentCount,
  getMostCommonAilment,
  getAgentStatusBreakdown,
  getRecentAppointments,
} from '@/lib/stats'

const statusDot: Record<string, string> = {
  ACTIVE: 'bg-green-500',
  INACTIVE: 'bg-gray-400',
  UNDER_OBSERVATION: 'bg-yellow-500',
}

const statusLabel: Record<string, string> = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  UNDER_OBSERVATION: 'Under Observation',
}

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const [activeAgents, openAppointments, mostCommonAilment, statusBreakdown, recentAppts] =
    await Promise.all([
      getActiveAgentCount(),
      getOpenAppointmentCount(),
      getMostCommonAilment(),
      getAgentStatusBreakdown(),
      getRecentAppointments(),
    ])

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">At-a-glance view of the clinic.</p>

      {/* Summary cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Active Agents</p>
          <p className="mt-1 text-3xl font-bold text-indigo-600">{activeAgents}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Open Appointments</p>
          <p className="mt-1 text-3xl font-bold text-yellow-600">{openAppointments}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Most Common Ailment</p>
          <p className="mt-1 text-xl font-bold leading-tight text-red-600">
            {mostCommonAilment ?? 'None yet'}
          </p>
        </div>
      </div>

      {/* Agent health breakdown */}
      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-medium text-gray-700">Agent Health</h2>
        <div className="mt-3 flex flex-wrap gap-5">
          {statusBreakdown.length === 0 ? (
            <p className="text-sm text-gray-400">No agents registered.</p>
          ) : (
            statusBreakdown.map(({ status, count }) => (
              <span key={status} className="flex items-center gap-1.5 text-sm">
                <span className={`h-2.5 w-2.5 rounded-full ${statusDot[status] ?? 'bg-gray-300'}`} />
                <span className="font-semibold text-gray-900">{count}</span>
                <span className="text-gray-500">{statusLabel[status] ?? status}</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Recent appointments */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Appointments</h2>

        {recentAppts.length === 0 ? (
          <p className="mt-3 text-sm italic text-gray-500">
            All agents are healthy today. Suspicious.
          </p>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="mt-3 space-y-3 sm:hidden">
              {recentAppts.map((appt) => (
                <div key={appt.id} className="rounded-lg border border-gray-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/agents/${appt.agent.id}`}
                      className="font-medium text-gray-900 hover:text-indigo-600"
                    >
                      {appt.agent.name}
                    </Link>
                    <AppointmentStatusBadge status={appt.status} />
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{appt.therapy.name}</p>
                  <p className="mt-2 text-xs text-gray-400">
                    {new Date(appt.scheduledAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="mt-3 hidden overflow-x-auto rounded-lg border border-gray-200 sm:block">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Agent</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Therapy</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Date</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {recentAppts.map((appt) => (
                    <tr key={appt.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        <Link
                          href={`/agents/${appt.agent.id}`}
                          className="hover:text-indigo-600"
                        >
                          {appt.agent.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{appt.therapy.name}</td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(appt.scheduledAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <AppointmentStatusBadge status={appt.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Quick actions */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/appointments/new"
          className="rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Book appointment
        </Link>
        <Link
          href="/agents"
          className="rounded border border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
        >
          View all agents
        </Link>
      </div>
    </div>
  )
}
