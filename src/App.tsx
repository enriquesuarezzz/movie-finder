import React from 'react'
import './App.css'
import { Header } from './components/molecules/header/header'
import { Layout } from './components/molecules/layout/layout'
import { MoviesSwiper } from './components/molecules/swiper/swiper'

function App() {
  return (
    <Layout>
      <Header />
      <div className="px-3 md:px-10">
        <MoviesSwiper />
      </div>
    </Layout>
  )
}

export default App
