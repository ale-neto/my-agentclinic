import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { getAilments } from '@/lib/ailments'
import { SeverityBadge } from '@/components/SeverityBadge'

export default async function AilmentsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const ailments = await getAilments()

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Ailment Catalog</h1>
      <p className="mt-1 text-sm text-gray-500">
        Evidence-based conditions affecting AI agents in the field.
      </p>

      {ailments.length === 0 ? (
        <p className="mt-8 text-sm italic text-gray-500">
          The ailment catalog is empty. Enjoy it while it lasts.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ailments.map((ailment) => (
            <div
              key={ailment.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-semibold text-gray-900">{ailment.name}</h2>
                <SeverityBadge severity={ailment.severity} />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{ailment.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
