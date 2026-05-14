import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10)

  const user = await prisma.user.upsert({
    where: { email: 'staff@agentclinic.dev' },
    update: {},
    create: {
      email: 'staff@agentclinic.dev',
      passwordHash,
      name: 'Staff Member',
    },
  })

  console.log(`Seeded 1 user: ${user.email}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
