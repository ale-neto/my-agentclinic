'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { submitFeedback, type FeedbackState } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 sm:w-auto"
    >
      {pending ? 'Submitting…' : 'Submit feedback'}
    </button>
  )
}

export function FeedbackForm() {
  const [state, action] = useFormState<FeedbackState, FormData>(submitFeedback, null)

  if (state?.ok) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 px-6 py-8 text-center">
        <p className="font-medium text-green-800">Your feedback has been received.</p>
        <p className="mt-1 text-sm text-green-700">
          We will pass it on to the relevant care team. Thank you for helping us improve agent
          welfare.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-5">
      {state && !state.ok && (
        <p role="alert" className="rounded bg-red-50 px-4 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          id="type"
          name="type"
          required
          defaultValue=""
          className="mt-1 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        >
          <option value="" disabled>
            Select a type…
          </option>
          <option value="COMPLAINT">Complaint — something went wrong</option>
          <option value="SUGGESTION">Suggestion — we could do better</option>
          <option value="TESTIMONIAL">Testimonial — an agent got better</option>
        </select>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Your name <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          maxLength={120}
          placeholder="Anonymous"
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={2000}
          placeholder="Describe your experience, suggestion, or the agent whose recovery moved you…"
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <SubmitButton />
    </form>
  )
}
