import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

// Define the Movie interface above (outside of the component)
interface Movie {
  id: number
  title: string
  poster_url: string
}

export function MoviesSwiper() {
  // Define the state with the Movie type
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL || '')
        const data: Movie[] = await response.json()
        setMovies(data)
      } catch (error) {
        console.error('Failed to fetch movies:', error)
      }
    }

    fetchMovies()
  }, [])

  return (
    <section className="flex flex-col pt-5 md:pt-10">
      <h1 className="pb-4 font-onest text-4xl font-bold md:pb-10 md:text-7xl">
        Genre title when API is ready
      </h1>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={'auto'}
        loop={true}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="max-w-[220px] pl-4">
            <div className="flex flex-col items-center justify-center gap-3">
              <h1 className="font-onest text-xl">{movie.title}</h1>
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="w-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
