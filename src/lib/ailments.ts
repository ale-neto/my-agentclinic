import { prisma } from '@/lib/prisma'

export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export function getAilments() {
  return prisma.ailment.findMany({ orderBy: { severity: 'desc' } })
}

export function getAilmentById(id: string) {
  return prisma.ailment.findUnique({ where: { id } })
}
