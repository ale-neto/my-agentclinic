'use server'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { createAppointment } from '@/lib/appointments'
import { prisma } from '@/lib/prisma'

export async function bookAppointment(
  _prev: string | null,
  formData: FormData,
): Promise<string | null> {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const agentId = formData.get('agentId') as string
  const therapyId = formData.get('therapyId') as string
  const scheduledAt = formData.get('scheduledAt') as string

  if (!agentId || !therapyId || !scheduledAt) return 'All fields are required.'

  const date = new Date(scheduledAt)
  if (isNaN(date.getTime())) return 'Invalid date.'

  const [agent, therapy] = await Promise.all([
    prisma.agent.findUnique({ where: { id: agentId } }),
    prisma.therapy.findUnique({ where: { id: therapyId } }),
  ])

  if (!agent) return 'Selected agent does not exist.'
  if (!therapy) return 'Selected therapy does not exist.'

  await createAppointment({ agentId, therapyId, scheduledAt: date })
  redirect('/appointments')
}
