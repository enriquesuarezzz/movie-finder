import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Bars } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

// Define the Movie interface
interface Movie {
  id: number
  title: string
  poster_url: string
  genre: string
}

export function MoviesSwiper() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + '/movies' || '',
        )
        const data: Movie[] = await response.json()
        setMovies(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to fetch movies:', error)
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [])

  // Function to create a slug from the movie title
  const createSlug = (id: number) => {
    return id
  }

  // Handle poster click
  const handlePosterClick = (movie: Movie) => {
    const slug = createSlug(movie.id)

    // Redirect to a new page (e.g., movie details page) based on the slug
    navigate(`/movies/${slug}`)
  }

  // Function to filter movies by genre
  const getMoviesByGenre = (genre: string) => {
    return movies.filter((movie) => movie.genre === genre)
  }

  const genres = [
    'Action',
    'Comedy',
    'Drama',
    'Science Fiction',
    'Thriller',
    'Horror',
    'Romance',
    'Adventure',
    'Fantasy',
    'Mystery',
  ]

  return (
    // if the data is loading show a loader
    <section className="flex flex-col pt-5 md:pt-10">
      {isLoading ? (
        <div className="flex h-40 flex-col items-center justify-center">
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <div className="font-onest text-xl font-bold">Loading...</div>
        </div>
      ) : (
        //creating the swipers for each genre
        genres.map((genre) => {
          const genreMovies = getMoviesByGenre(genre)
          if (genreMovies.length === 0) return null // Skip empty genres
          return (
            <div key={genre}>
              <h2 className="pb-4 pt-7 font-onest text-3xl  font-semibold text-blue-700/100  md:pb-6 md:text-5xl ">
                {genre} Movies
              </h2>
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10}
                slidesPerView={'auto'}
                loop={true}
              >
                {genreMovies.map((movie) => (
                  <SwiperSlide key={movie.id} className="max-w-[250px] pl-4">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <h1 className="text-nowrap font-onest text-xl">
                        {movie.title}
                      </h1>
                      <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="w-full"
                        onClick={() => handlePosterClick(movie)}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )
        })
      )}
    </section>
  )
}
