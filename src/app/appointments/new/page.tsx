import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { getAgents } from '@/lib/agents'
import { getAilments } from '@/lib/ailments'
import { getTherapies } from '@/lib/therapies'
import { AppointmentForm } from './AppointmentForm'

export default async function NewAppointmentPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const [agents, ailments, therapies] = await Promise.all([
    getAgents(),
    getAilments(),
    getTherapies(),
  ])

  return (
    <div className="p-4 sm:p-8">
      <Link href="/appointments" className="text-sm text-indigo-600 hover:text-indigo-800">
        ← Appointments
      </Link>

      <div className="mt-4 mx-auto max-w-lg">
        <h1 className="text-2xl font-bold text-gray-900">Book an Appointment</h1>
        <p className="mt-1 text-sm text-gray-500">
          Select an agent, their ailment, and a matching therapy.
        </p>

        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
          <AppointmentForm
            agents={agents.map((a) => ({ id: a.id, name: a.name, model: a.model }))}
            ailments={ailments.map((a) => ({ id: a.id, name: a.name, severity: a.severity }))}
            therapies={therapies.map((t) => ({ id: t.id, name: t.name, ailmentId: t.ailmentId }))}
          />
        </div>
      </div>
    </div>
  )
}
