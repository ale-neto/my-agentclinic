import { prisma } from '@/lib/prisma'

export type FeedbackType = 'COMPLAINT' | 'SUGGESTION' | 'TESTIMONIAL'

export async function createFeedback(data: {
  type: FeedbackType
  message: string
  name?: string
}) {
  return prisma.feedback.create({ data })
}
