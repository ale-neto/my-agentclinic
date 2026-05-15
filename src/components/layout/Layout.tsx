import '@/styles/layout.css'
import { Header } from './Header'
import { Main } from './Main'
import { Footer } from './Footer'

type Props = { children: React.ReactNode }

export function Layout({ children }: Props) {
  return (
    <div className="layout">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  )
}
