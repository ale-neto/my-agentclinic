import type { Metadata } from 'next'
import { Providers } from './providers'
import { Layout } from '@/components/layout/Layout'
import './globals.css'

export const metadata: Metadata = {
  title: 'AgentClinic',
  description: 'A clinic for AI agents',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
