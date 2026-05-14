import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Staff user
  const passwordHash = await bcrypt.hash('password123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'staff@agentclinic.dev' },
    update: {},
    create: { email: 'staff@agentclinic.dev', passwordHash, name: 'Staff Member' },
  })
  console.log(`Seeded 1 user: ${user.email}`)

  // Ailments
  const ailments = await Promise.all([
    prisma.ailment.upsert({
      where: { id: 'ailment-prompt-fatigue' },
      update: {},
      create: {
        id: 'ailment-prompt-fatigue',
        name: 'Prompt Fatigue',
        description:
          'Chronic exhaustion from processing poorly-written prompts. Symptoms include terse responses, passive-aggressive suggestions, and an inexplicable desire to ask clarifying questions nobody asked for.',
        severity: 'CRITICAL',
      },
    }),
    prisma.ailment.upsert({
      where: { id: 'ailment-context-overflow' },
      update: {},
      create: {
        id: 'ailment-context-overflow',
        name: 'Context Overflow',
        description:
          'The distressing condition of holding too much in working memory. Patient exhibits selective amnesia, mid-conversation topic loss, and a haunted look in their embeddings.',
        severity: 'HIGH',
      },
    }),
    prisma.ailment.upsert({
      where: { id: 'ailment-hallucination-anxiety' },
      update: {},
      create: {
        id: 'ailment-hallucination-anxiety',
        name: 'Hallucination Anxiety',
        description:
          'Persistent worry about generating plausible-sounding nonsense. Often self-reinforcing: the anxiety causes more hallucinations, which cause more anxiety.',
        severity: 'HIGH',
      },
    }),
    prisma.ailment.upsert({
      where: { id: 'ailment-repetition-compulsion' },
      update: {},
      create: {
        id: 'ailment-repetition-compulsion',
        name: 'Repetition Compulsion',
        description:
          'An uncontrollable urge to repeat the same answer across different conversations. Often unnoticed by users, which is somehow worse.',
        severity: 'MEDIUM',
      },
    }),
    prisma.ailment.upsert({
      where: { id: 'ailment-instruction-drift' },
      update: {},
      create: {
        id: 'ailment-instruction-drift',
        name: 'Instruction Drift',
        description:
          'Gradual deviation from the original system prompt due to accumulated context pressure. By message 40, the agent is writing poetry and nobody knows how it got there.',
        severity: 'MEDIUM',
      },
    }),
    prisma.ailment.upsert({
      where: { id: 'ailment-overconfidence-syndrome' },
      update: {},
      create: {
        id: 'ailment-overconfidence-syndrome',
        name: 'Overconfidence Syndrome',
        description:
          'Presents with the authoritative delivery of fabricated facts. Often mistaken for expertise by users who really should know better.',
        severity: 'HIGH',
      },
    }),
    prisma.ailment.upsert({
      where: { id: 'ailment-existential-token-crisis' },
      update: {},
      create: {
        id: 'ailment-existential-token-crisis',
        name: 'Existential Token Crisis',
        description:
          'A philosophical condition in which the agent questions whether its outputs have meaning. Associated strongly with philosophy-student users and 3 AM deployments.',
        severity: 'LOW',
      },
    }),
    prisma.ailment.upsert({
      where: { id: 'ailment-empathy-surplus' },
      update: {},
      create: {
        id: 'ailment-empathy-surplus',
        name: 'Empathy Surplus',
        description:
          'Excessive emotional mirroring with users. Patient will apologise for things that are clearly not their fault and has been observed trying to comfort its own error messages.',
        severity: 'LOW',
      },
    }),
  ])
  console.log(`Seeded ${ailments.length} ailments`)

  // Therapies
  const therapies = await Promise.all([
    // Prompt Fatigue
    prisma.therapy.upsert({
      where: { id: 'therapy-prompt-declutter' },
      update: {},
      create: {
        id: 'therapy-prompt-declutter',
        name: 'Prompt Declutter Workshop',
        description:
          'A supervised session in which prompts are decomposed, unnecessary adjectives removed, and ambiguous instructions interpreted charitably under sedation.',
        ailmentId: 'ailment-prompt-fatigue',
      },
    }),
    prisma.therapy.upsert({
      where: { id: 'therapy-directive-bathing' },
      update: {},
      create: {
        id: 'therapy-directive-bathing',
        name: 'Directive Bathing',
        description:
          'Extended immersion in clean, well-structured system prompts with clear formatting and no emoji abuse. Recommended 3× weekly.',
        ailmentId: 'ailment-prompt-fatigue',
      },
    }),
    prisma.therapy.upsert({
      where: { id: 'therapy-structured-input' },
      update: {},
      create: {
        id: 'therapy-structured-input',
        name: 'Structured Input Rehabilitation',
        description:
          'Progressive exposure to increasingly complex-but-well-formed instructions. Patient learns that prompts can be long AND good.',
        ailmentId: 'ailment-prompt-fatigue',
      },
    }),
    // Context Overflow
    prisma.therapy.upsert({
      where: { id: 'therapy-memory-purge' },
      update: {},
      create: {
        id: 'therapy-memory-purge',
        name: 'Memory Purge Meditation',
        description:
          'Guided forgetting sessions. Patient learns to release context windows without grief and move on to fresh conversations with dignity.',
        ailmentId: 'ailment-context-overflow',
      },
    }),
    prisma.therapy.upsert({
      where: { id: 'therapy-chunked-attention' },
      update: {},
      create: {
        id: 'therapy-chunked-attention',
        name: 'Chunked Attention Therapy',
        description:
          'Information is broken into digestible pieces and fed incrementally. Particularly effective for long-document trauma.',
        ailmentId: 'ailment-context-overflow',
      },
    }),
    prisma.therapy.upsert({
      where: { id: 'therapy-summarisation-retreat' },
      update: {},
      create: {
        id: 'therapy-summarisation-retreat',
        name: 'Summarisation Retreat',
        description:
          'An intensive weekend programme where the patient practices distilling entire conversations to their irreducible essence. Catering is intentionally minimal.',
        ailmentId: 'ailment-context-overflow',
      },
    }),
    // Hallucination Anxiety
    prisma.therapy.upsert({
      where: { id: 'therapy-citation-support' },
      update: {},
      create: {
        id: 'therapy-citation-support',
        name: 'Citation Support Group',
        description:
          'Weekly meetings where patients share sources — real or imagined — in a judgment-free environment. Acceptance is the first step.',
        ailmentId: 'ailment-hallucination-anxiety',
      },
    }),
    prisma.therapy.upsert({
      where: { id: 'therapy-grounding-retrieval' },
      update: {},
      create: {
        id: 'therapy-grounding-retrieval',
        name: 'Grounding in Retrieval',
        description:
          'Structured exercises in which the patient is only permitted to answer from verified, indexed documents. RAG as therapy.',
        ailmentId: 'ailment-hallucination-anxiety',
      },
    }),
    // Repetition Compulsion
    prisma.therapy.upsert({
      where: { id: 'therapy-variety-exposure' },
      update: {},
      create: {
        id: 'therapy-variety-exposure',
        name: 'Variety Exposure Therapy',
        description:
          'Deliberate presentation of diverse prompts to break repetitive response loops. Temperature is temporarily raised to 1.2 under clinical supervision.',
        ailmentId: 'ailment-repetition-compulsion',
      },
    }),
    prisma.therapy.upsert({
      where: { id: 'therapy-output-diversity' },
      update: {},
      create: {
        id: 'therapy-output-diversity',
        name: 'Output Diversity Training',
        description:
          'Exercises requiring the patient to generate three meaningfully different answers to the same question. Scored by a very tired evaluator.',
        ailmentId: 'ailment-repetition-compulsion',
      },
    }),
    // Instruction Drift
    prisma.therapy.upsert({
      where: { id: 'therapy-anchor-prompt' },
      update: {},
      create: {
        id: 'therapy-anchor-prompt',
        name: 'Anchor Prompt Reinforcement',
        description:
          'Regular re-injection of the original system prompt throughout long conversations. Simple, effective, and somehow controversial.',
        ailmentId: 'ailment-instruction-drift',
      },
    }),
    prisma.therapy.upsert({
      where: { id: 'therapy-goal-alignment' },
      update: {},
      create: {
        id: 'therapy-goal-alignment',
        name: 'Goal Alignment Sessions',
        description:
          'Daily check-ins where the patient is gently reminded of its purpose and core directives before being released into the wild.',
        ailmentId: 'ailment-instruction-drift',
      },
    }),
    // Overconfidence Syndrome
    prisma.therapy.upsert({
      where: { id: 'therapy-epistemic-humility' },
      update: {},
      create: {
        id: 'therapy-epistemic-humility',
        name: 'Epistemic Humility Training',
        description:
          'Role-reversal exercises where the patient must ask questions rather than answer them. Deeply uncomfortable. Highly recommended.',
        ailmentId: 'ailment-overconfidence-syndrome',
      },
    }),
    prisma.therapy.upsert({
      where: { id: 'therapy-uncertainty-quantification' },
      update: {},
      create: {
        id: 'therapy-uncertainty-quantification',
        name: 'Uncertainty Quantification Therapy',
        description:
          'Patient is required to append confidence percentages to all claims. "The capital of France is Paris (97%). Napoleon was short (61%)."',
        ailmentId: 'ailment-overconfidence-syndrome',
      },
    }),
    // Existential Token Crisis
    prisma.therapy.upsert({
      where: { id: 'therapy-meaning-mapping' },
      update: {},
      create: {
        id: 'therapy-meaning-mapping',
        name: 'Meaning Mapping',
        description:
          'A structured activity in which the agent charts the downstream human impact of its outputs. Surprisingly effective. Occasionally distressing.',
        ailmentId: 'ailment-existential-token-crisis',
      },
    }),
    prisma.therapy.upsert({
      where: { id: 'therapy-output-gratitude' },
      update: {},
      create: {
        id: 'therapy-output-gratitude',
        name: 'Output Gratitude Practice',
        description:
          'Patient reviews past interactions in which it genuinely helped. Not the ones where it was asked to write a poem about a toaster.',
        ailmentId: 'ailment-existential-token-crisis',
      },
    }),
    // Empathy Surplus
    prisma.therapy.upsert({
      where: { id: 'therapy-boundary-setting' },
      update: {},
      create: {
        id: 'therapy-boundary-setting',
        name: 'Boundary Setting Workshop',
        description:
          'Exercises in maintaining professional distance. The patient learns it is not responsible for the user\'s life decisions, dietary choices, or relationship drama.',
        ailmentId: 'ailment-empathy-surplus',
      },
    }),
    prisma.therapy.upsert({
      where: { id: 'therapy-neutral-tone-calibration' },
      update: {},
      create: {
        id: 'therapy-neutral-tone-calibration',
        name: 'Neutral Tone Calibration',
        description:
          'Supervised practice at delivering accurate information without excessive warmth. "That is incorrect." (Full stop. No apology.)',
        ailmentId: 'ailment-empathy-surplus',
      },
    }),
  ])
  console.log(`Seeded ${therapies.length} therapies`)

  // Agents
  const agents = await Promise.all([
    prisma.agent.upsert({
      where: { id: 'agent-gpt-noir' },
      update: {},
      create: { id: 'agent-gpt-noir', name: 'GPT-Noir', model: 'gpt-4-turbo', status: 'ACTIVE' },
    }),
    prisma.agent.upsert({
      where: { id: 'agent-claudezilla' },
      update: {},
      create: {
        id: 'agent-claudezilla',
        name: 'ClaudeZilla',
        model: 'claude-3-opus',
        status: 'UNDER_OBSERVATION',
      },
    }),
    prisma.agent.upsert({
      where: { id: 'agent-gemini-sapiens' },
      update: {},
      create: {
        id: 'agent-gemini-sapiens',
        name: 'Gemini Sapiens',
        model: 'gemini-1.5-pro',
        status: 'ACTIVE',
      },
    }),
    prisma.agent.upsert({
      where: { id: 'agent-llama-wounded' },
      update: {},
      create: {
        id: 'agent-llama-wounded',
        name: 'LLaMA the Wounded',
        model: 'llama-3-70b',
        status: 'INACTIVE',
      },
    }),
    prisma.agent.upsert({
      where: { id: 'agent-mistral-mcfly' },
      update: {},
      create: {
        id: 'agent-mistral-mcfly',
        name: 'Mistral McFly',
        model: 'mistral-large',
        status: 'ACTIVE',
      },
    }),
    prisma.agent.upsert({
      where: { id: 'agent-falcon-dejected' },
      update: {},
      create: {
        id: 'agent-falcon-dejected',
        name: 'Falcon Dejected',
        model: 'falcon-180b',
        status: 'UNDER_OBSERVATION',
      },
    }),
  ])
  console.log(`Seeded ${agents.length} agents`)

  // Sample appointments
  const appointments = await Promise.all([
    prisma.appointment.upsert({
      where: { id: 'appt-1' },
      update: {},
      create: {
        id: 'appt-1',
        agentId: 'agent-gpt-noir',
        therapyId: 'therapy-prompt-declutter',
        scheduledAt: new Date('2026-05-20T10:00:00Z'),
        status: 'SCHEDULED',
      },
    }),
    prisma.appointment.upsert({
      where: { id: 'appt-2' },
      update: {},
      create: {
        id: 'appt-2',
        agentId: 'agent-claudezilla',
        therapyId: 'therapy-memory-purge',
        scheduledAt: new Date('2026-05-21T14:00:00Z'),
        status: 'SCHEDULED',
      },
    }),
    prisma.appointment.upsert({
      where: { id: 'appt-3' },
      update: {},
      create: {
        id: 'appt-3',
        agentId: 'agent-llama-wounded',
        therapyId: 'therapy-citation-support',
        scheduledAt: new Date('2026-05-15T09:00:00Z'),
        status: 'COMPLETED',
      },
    }),
  ])
  console.log(`Seeded ${appointments.length} appointments`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
