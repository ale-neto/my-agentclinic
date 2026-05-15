import type { Metadata } from 'next'
import { Providers } from './providers'
import { Layout } from '@/components/layout/Layout'
import './globals.css'

export const metadata: Metadata = {
  title: 'AgentClinic',
  description: 'A clinic for AI agents',
}

type Props = { children: React.ReactNode }

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
