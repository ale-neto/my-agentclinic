import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { PrismaClient } from '@prisma/client'
import path from 'path'

// Requires: pnpm prisma migrate dev && pnpm prisma db seed
const dbUrl = `file:${path.resolve(__dirname, '..', 'prisma', 'dev.db').replace(/\\/g, '/')}`
const prisma = new PrismaClient({ datasourceUrl: dbUrl })

describe('database — seeded state', () => {
  afterAll(() => prisma.$disconnect())

  it('connects to the database', async () => {
    await expect(prisma.$connect()).resolves.toBeUndefined()
  })

  it('finds the seeded staff user', async () => {
    const user = await prisma.user.findUnique({
      where: { email: 'staff@agentclinic.dev' },
    })
    expect(user).not.toBeNull()
    expect(user?.name).toBe('Staff Member')
    expect(user?.passwordHash).toBeTruthy()
  })
})
