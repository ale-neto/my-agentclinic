import { prisma } from '@/lib/prisma'

export function getTherapies() {
  return prisma.therapy.findMany({
    include: { ailment: true },
    orderBy: [{ ailmentId: 'asc' }, { name: 'asc' }],
  })
}

export function getTherapiesByAilment(ailmentId: string) {
  return prisma.therapy.findMany({
    where: { ailmentId },
    orderBy: { name: 'asc' },
  })
}
