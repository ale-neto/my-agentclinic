import '@/styles/layout.css'
import { Header } from './Header'
import { Main } from './Main'
import { Footer } from './Footer'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  )
}
