import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockFindUnique = vi.hoisted(() => vi.fn())
const mockCompare = vi.hoisted(() => vi.fn())

vi.mock('@/lib/prisma', () => ({
  prisma: { user: { findUnique: mockFindUnique } },
}))

vi.mock('bcryptjs', () => ({
  __esModule: true,
  default: { compare: mockCompare },
}))

import { authOptions } from '@/lib/auth'

// NextAuth v4 stores the user-provided authorize under provider.options.authorize;
// provider.authorize itself is a no-op stub (always returns null).
const provider = authOptions.providers[0] as any
const authorize: (
  credentials: Record<string, string> | undefined,
  req: object
) => Promise<unknown> = provider.options.authorize

const seededUser = {
  id: 'user-1',
  email: 'staff@agentclinic.dev',
  name: 'Staff Member',
  passwordHash: '$2b$10$hashedpassword',
  createdAt: new Date(),
}

describe('authorize', () => {
  beforeEach(() => vi.resetAllMocks())

  it('returns null when credentials are missing', async () => {
    expect(await authorize(undefined, {})).toBeNull()
    expect(await authorize({ email: '', password: '' }, {})).toBeNull()
    expect(await authorize({ email: 'a@b.com', password: '' }, {})).toBeNull()
  })

  it('returns null when user is not found', async () => {
    mockFindUnique.mockResolvedValue(null)
    const result = await authorize({ email: 'nobody@example.com', password: 'pass' }, {})
    expect(result).toBeNull()
  })

  it('returns null when password is wrong', async () => {
    mockFindUnique.mockResolvedValue(seededUser)
    mockCompare.mockResolvedValue(false)
    const result = await authorize({ email: seededUser.email, password: 'wrongpass' }, {})
    expect(result).toBeNull()
  })

  it('returns user object on valid credentials', async () => {
    mockFindUnique.mockResolvedValue(seededUser)
    mockCompare.mockResolvedValue(true)
    const result = await authorize({ email: seededUser.email, password: 'password123' }, {})
    expect(result).toEqual({ id: 'user-1', email: 'staff@agentclinic.dev', name: 'Staff Member' })
  })
})
