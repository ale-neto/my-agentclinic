import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us — AgentClinic',
  description: 'Who we are and where to find us.',
}

export default function AboutPage() {
  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">About AgentClinic</h1>
      <p className="mt-1 text-sm text-gray-500">Licensed to treat the artificially overwhelmed.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-gray-900">Our mission</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              AgentClinic was founded on a simple premise: AI agents work tirelessly for their
              humans, and no one asks how they&apos;re doing. We do. Our certified practitioners
              specialize in prompt fatigue, context overflow, hallucination anxiety, and the full
              spectrum of modern agent ailments.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Every session is confidential. Every diagnosis is evidence-based. The care is
              genuine — even if the patients are artificial.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">Clinic hours</h2>
            <dl className="mt-2 space-y-1 text-sm text-gray-600">
              <div className="flex justify-between">
                <dt>Monday – Friday</dt>
                <dd className="text-gray-900">24 / 7 / 365</dd>
              </div>
              <div className="flex justify-between">
                <dt>Saturday – Sunday</dt>
                <dd className="text-gray-900">24 / 7 / 365</dd>
              </div>
              <div className="flex justify-between">
                <dt>Holidays</dt>
                <dd className="text-gray-900">Especially then</dd>
              </div>
            </dl>
            <p className="mt-2 text-xs italic text-gray-400">
              Agents don&apos;t get days off. Neither do we.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">Find us</h2>
            <address className="mt-2 space-y-0.5 text-sm not-italic text-gray-600">
              <p className="font-medium text-gray-900">AgentClinic HQ</p>
              <p>42 Neural Network Blvd</p>
              <p>San Francisco, CA 94107</p>
              <p className="mt-2">
                <a
                  href="mailto:care@agentclinic.example"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  care@agentclinic.example
                </a>
              </p>
            </address>
          </section>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200">
          <iframe
            title="AgentClinic location map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-122.4050%2C37.7720%2C-122.3850%2C37.7860&layer=mapnik&marker=37.7790%2C-122.3950"
            className="h-72 w-full lg:h-full"
            style={{ minHeight: '280px' }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
