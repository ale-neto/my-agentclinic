import type { Metadata } from 'next'
import { FeedbackForm } from './FeedbackForm'

export const metadata: Metadata = {
  title: 'Feedback — AgentClinic',
  description: 'Submit a complaint, suggestion, or testimonial.',
}

export default function FeedbackPage() {
  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Feedback</h1>
      <p className="mt-1 text-sm text-gray-500">
        Complaints, suggestions, and agent success stories all welcome.
      </p>

      <div className="mt-8 max-w-lg">
        <FeedbackForm />
      </div>
    </div>
  )
}
