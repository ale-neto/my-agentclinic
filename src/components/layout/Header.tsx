import Link from 'next/link'

export function Header() {
  return (
    <header className="header">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-gray-900">
          AgentClinic
        </Link>
        <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
          Dashboard
        </Link>
      </nav>
    </header>
  )
}
