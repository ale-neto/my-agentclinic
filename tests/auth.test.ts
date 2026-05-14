import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}))

vi.mock('bcryptjs', () => ({
  default: {
    compare: vi.fn(),
  },
}))

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Access the authorize callback from the CredentialsProvider
const provider = authOptions.providers[0] as any
const authorize: (
  credentials: Record<string, string> | undefined,
  req: object
) => Promise<unknown> = provider.authorize.bind(provider)

const seededUser = {
  id: 'user-1',
  email: 'staff@agentclinic.dev',
  name: 'Staff Member',
  passwordHash: '$2b$10$hashedpassword',
  createdAt: new Date(),
}

describe('authorize', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns null when credentials are missing', async () => {
    expect(await authorize(undefined, {})).toBeNull()
    expect(await authorize({ email: '', password: '' }, {})).toBeNull()
    expect(await authorize({ email: 'a@b.com', password: '' }, {})).toBeNull()
  })

  it('returns null when user is not found', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null)
    const result = await authorize({ email: 'nobody@example.com', password: 'pass' }, {})
    expect(result).toBeNull()
  })

  it('returns null when password is wrong', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(seededUser)
    vi.mocked(bcrypt.compare).mockResolvedValue(false as never)
    const result = await authorize({ email: seededUser.email, password: 'wrongpass' }, {})
    expect(result).toBeNull()
  })

  it('returns user object on valid credentials', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(seededUser)
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never)
    const result = await authorize({ email: seededUser.email, password: 'password123' }, {})
    expect(result).toEqual({ id: 'user-1', email: 'staff@agentclinic.dev', name: 'Staff Member' })
  })
})
