import { Footer } from '../footer/footer'
import { Navbar } from '../navbar/navbar'

export function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
