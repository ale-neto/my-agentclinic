'use client'

import { useState } from 'react'
import { bookAppointment } from './actions'

type Agent = { id: string; name: string; model: string }
type Ailment = { id: string; name: string; severity: string }
type Therapy = { id: string; name: string; ailmentId: string }

interface Props {
  agents: Agent[]
  ailments: Ailment[]
  therapies: Therapy[]
}

export function AppointmentForm({ agents, ailments, therapies }: Props) {
  const [selectedAilmentId, setSelectedAilmentId] = useState('')
  const filteredTherapies = therapies.filter((t) => t.ailmentId === selectedAilmentId)

  const minDateTime = new Date()
  minDateTime.setMinutes(minDateTime.getMinutes() - minDateTime.getTimezoneOffset())
  const minValue = minDateTime.toISOString().slice(0, 16)

  return (
    <form action={bookAppointment} className="space-y-5">
      <div>
        <label htmlFor="agentId" className="block text-sm font-medium text-gray-700">
          Agent
        </label>
        <select
          id="agentId"
          name="agentId"
          required
          className="mt-1 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            Select an agent…
          </option>
          {agents.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} — {a.model}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="ailment-select" className="block text-sm font-medium text-gray-700">
          Ailment
        </label>
        <select
          id="ailment-select"
          required
          className="mt-1 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          value={selectedAilmentId}
          onChange={(e) => setSelectedAilmentId(e.target.value)}
        >
          <option value="" disabled>
            Select an ailment…
          </option>
          {ailments.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="therapyId" className="block text-sm font-medium text-gray-700">
          Therapy
        </label>
        <select
          id="therapyId"
          name="therapyId"
          required
          disabled={!selectedAilmentId}
          className="mt-1 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
          defaultValue=""
        >
          <option value="" disabled>
            {selectedAilmentId ? 'Select a therapy…' : 'Select an ailment first…'}
          </option>
          {filteredTherapies.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="scheduledAt" className="block text-sm font-medium text-gray-700">
          Date &amp; Time
        </label>
        <input
          id="scheduledAt"
          name="scheduledAt"
          type="datetime-local"
          required
          min={minValue}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 sm:w-auto"
      >
        Book appointment
      </button>
    </form>
  )
}
