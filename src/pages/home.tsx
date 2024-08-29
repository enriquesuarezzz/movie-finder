import { Header } from '../components/molecules/header/header'
import { Layout } from '../components/molecules/layout/layout'
import { MoviesSwiper } from '../components/molecules/swiper/swiper'

function Home() {
  return (
    <div className="px-3 md:px-10">
      <MoviesSwiper />
    </div>
  )
}

export default Home
