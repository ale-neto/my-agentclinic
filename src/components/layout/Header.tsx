import Link from 'next/link'

const navLinks = [
  { href: '/agents', label: 'Agents' },
  { href: '/ailments', label: 'Ailments' },
  { href: '/therapies', label: 'Therapies' },
  { href: '/appointments', label: 'Appointments' },
]

export function Header() {
  return (
    <header className="header">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/" className="text-xl font-bold text-gray-900">
          AgentClinic
        </Link>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="text-gray-600 hover:text-gray-900">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
