import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { getAppointments } from '@/lib/appointments'
import { AppointmentStatusBadge } from '@/components/AppointmentStatusBadge'

export default async function AppointmentsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const appointments = await getAppointments()

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Appointments</h1>
          <p className="mt-1 text-sm text-gray-500">Scheduled therapy sessions.</p>
        </div>
        <Link
          href="/appointments/new"
          className="shrink-0 rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
        >
          Book new
        </Link>
      </div>

      {appointments.length === 0 ? (
        <p className="mt-8 text-sm text-gray-500">No appointments yet.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Agent</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Therapy</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Ailment</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {appointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <Link href={`/agents/${appt.agent.id}`} className="hover:text-indigo-600">
                      {appt.agent.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{appt.therapy.name}</td>
                  <td className="px-4 py-3 text-gray-500">{appt.therapy.ailment.name}</td>
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
    </div>
  )
}
