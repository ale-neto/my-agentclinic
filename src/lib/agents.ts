import { prisma } from '@/lib/prisma'

export type AgentStatus = 'ACTIVE' | 'INACTIVE' | 'UNDER_OBSERVATION'

export function getAgents() {
  return prisma.agent.findMany({ orderBy: { createdAt: 'asc' } })
}

export function getAgentById(id: string) {
  return prisma.agent.findUnique({
    where: { id },
    include: {
      appointments: {
        include: { therapy: { include: { ailment: true } } },
        orderBy: { scheduledAt: 'asc' },
      },
    },
  })
}
