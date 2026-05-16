'use server'

import { createFeedback, type FeedbackType } from '@/lib/feedback'

export type FeedbackState = { ok: true } | { ok: false; error: string } | null

const VALID_TYPES: FeedbackType[] = ['COMPLAINT', 'SUGGESTION', 'TESTIMONIAL']

export async function submitFeedback(
  _prev: FeedbackState,
  formData: FormData,
): Promise<FeedbackState> {
  const type = formData.get('type') as string
  const message = (formData.get('message') as string)?.trim()
  const name = (formData.get('name') as string)?.trim() || undefined

  if (!VALID_TYPES.includes(type as FeedbackType)) return { ok: false, error: 'Invalid feedback type.' }
  if (!message) return { ok: false, error: 'Message is required.' }
  if (message.length > 2000) return { ok: false, error: 'Message must be 2 000 characters or fewer.' }

  await createFeedback({ type: type as FeedbackType, message, name })
  return { ok: true }
}
