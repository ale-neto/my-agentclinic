import { prisma } from '@/lib/prisma'

export type AppointmentStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED'

export function getAppointments() {
  return prisma.appointment.findMany({
    include: {
      agent: true,
      therapy: { include: { ailment: true } },
    },
    orderBy: { scheduledAt: 'asc' },
  })
}

export function createAppointment(data: {
  agentId: string
  therapyId: string
  scheduledAt: Date
}) {
  return prisma.appointment.create({ data })
}
