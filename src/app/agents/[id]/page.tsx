import { getServerSession } from 'next-auth'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { getAgentById } from '@/lib/agents'
import { StatusBadge } from '@/components/StatusBadge'
import { AppointmentStatusBadge } from '@/components/AppointmentStatusBadge'

type Props = { params: { id: string } }

export default async function AgentDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const agent = await getAgentById(params.id)
  if (!agent) notFound()

  return (
    <div className="p-4 sm:p-8">
      <Link href="/agents" className="text-sm text-indigo-600 hover:text-indigo-800">
        ← All agents
      </Link>

      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{agent.name}</h1>
          <StatusBadge status={agent.status} />
        </div>
        <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-medium text-gray-500">Model</dt>
            <dd className="mt-1 font-mono text-gray-900">{agent.model}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Registered</dt>
            <dd className="mt-1 text-gray-900">
              {new Date(agent.createdAt).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </dd>
          </div>
        </dl>
      </div>

      <h2 className="mt-8 text-lg font-semibold text-gray-900">Appointments</h2>

      {agent.appointments.length === 0 ? (
        <p className="mt-3 text-sm text-gray-500">No appointments booked yet.</p>
      ) : (
        <div className="mt-3 overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Therapy</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Ailment</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {agent.appointments.map((appt) => (
                <tr key={appt.id}>
                  <td className="px-4 py-3 font-medium text-gray-900">{appt.therapy.name}</td>
                  <td className="px-4 py-3 text-gray-600">{appt.therapy.ailment.name}</td>
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
      )}

      <div className="mt-6">
        <Link
          href="/appointments/new"
          className="inline-block rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
        >
          Book new appointment
        </Link>
      </div>
    </div>
  )
}
