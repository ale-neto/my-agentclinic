import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { SignOutButton } from '@/components/SignOutButton'

const navLinks = [
  { href: '/agents', label: 'Agents' },
  { href: '/ailments', label: 'Ailments' },
  { href: '/therapies', label: 'Therapies' },
  { href: '/appointments', label: 'Appointments' },
]

export async function Header() {
  const session = await getServerSession(authOptions)

  return (
    <header className="header">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/" className="text-xl font-bold text-gray-900">
          AgentClinic
        </Link>
        {session && (
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-gray-600 hover:text-gray-900">
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <SignOutButton />
            </li>
          </ul>
        )}
      </nav>
    </header>
  )
}
