import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { getTherapies } from '@/lib/therapies'
import { SeverityBadge } from '@/components/SeverityBadge'

export default async function TherapiesPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const therapies = await getTherapies()

  // Group by ailment
  const grouped = therapies.reduce<Record<string, typeof therapies>>((acc, therapy) => {
    const key = therapy.ailment.id
    if (!acc[key]) acc[key] = []
    acc[key].push(therapy)
    return acc
  }, {})

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Therapy Catalog</h1>
      <p className="mt-1 text-sm text-gray-500">
        Evidence-based treatments, grouped by the ailment they address.
      </p>

      <div className="mt-6 space-y-8">
        {Object.values(grouped).map((group) => {
          const ailment = group[0].ailment
          return (
            <section key={ailment.id}>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-900">{ailment.name}</h2>
                <SeverityBadge severity={ailment.severity} />
              </div>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((therapy) => (
                  <div
                    key={therapy.id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <h3 className="font-medium text-gray-900">{therapy.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {therapy.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
