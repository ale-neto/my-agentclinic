'use server'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { createAppointment } from '@/lib/appointments'

export async function bookAppointment(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const agentId = formData.get('agentId') as string
  const therapyId = formData.get('therapyId') as string
  const scheduledAt = formData.get('scheduledAt') as string

  if (!agentId || !therapyId || !scheduledAt) {
    throw new Error('All fields are required.')
  }

  await createAppointment({ agentId, therapyId, scheduledAt: new Date(scheduledAt) })
  redirect('/appointments')
}
