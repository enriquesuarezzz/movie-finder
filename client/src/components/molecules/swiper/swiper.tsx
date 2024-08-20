import React from 'react'
import { Swiper as SwiperCore } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

// Import Swiper modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

export function MoviesSwiper() {
  return (
    <section className="flex flex-col pt-5 md:pt-10">
      <h1 className="pb-4 font-onest text-4xl font-bold md:pb-10 md:text-7xl">
        Genre title when Api is ready
      </h1>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={'auto'}
        loop={true}
      >
        <SwiperSlide className="max-w-[300px]">
          <h1>Movies card when api is ready</h1>
          <img src="/images/header_image.avif" alt="movies posters" />
        </SwiperSlide>
        <SwiperSlide className="max-w-[300px]">
          <h1>Movies card when api is ready</h1>
          <img src="/images/header_image.avif" alt="movies posters" />
        </SwiperSlide>
        <SwiperSlide className="max-w-[300px]">
          <h1>Movies card when api is ready</h1>
          <img src="/images/header_image.avif" alt="movies posters" />
        </SwiperSlide>
      </Swiper>
    </section>
  )
}
