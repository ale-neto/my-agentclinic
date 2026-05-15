import { prisma } from '@/lib/prisma'

export function getActiveAgentCount() {
  return prisma.agent.count({ where: { status: 'ACTIVE' } })
}

export function getOpenAppointmentCount() {
  return prisma.appointment.count({ where: { status: 'SCHEDULED' } })
}

export async function getMostCommonAilment(): Promise<string | null> {
  const appointments = await prisma.appointment.findMany({
    select: { therapy: { select: { ailment: { select: { id: true, name: true } } } } },
  })
  if (appointments.length === 0) return null

  const tally: Record<string, { name: string; count: number }> = {}
  for (const appt of appointments) {
    const { id, name } = appt.therapy.ailment
    tally[id] = { name, count: (tally[id]?.count ?? 0) + 1 }
  }

  let best = { name: '', count: 0 }
  Object.values(tally).forEach((entry) => {
    if (entry.count > best.count) best = entry
  })
  return best.name || null
}

export async function getAgentStatusBreakdown() {
  const rows = await prisma.agent.groupBy({
    by: ['status'],
    _count: { _all: true },
  })
  return rows.map((r) => ({ status: r.status, count: r._count._all }))
}

export function getRecentAppointments(n = 5) {
  return prisma.appointment.findMany({
    take: n,
    orderBy: { scheduledAt: 'desc' },
    include: {
      agent: true,
      therapy: { include: { ailment: true } },
    },
  })
}
