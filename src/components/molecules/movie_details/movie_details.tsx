import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Bars } from 'react-loader-spinner'

interface Movie {
  id: number
  title: string
  release_date: string
  genre_id: number
  director_id: number
  poster_url: string
  description: string
}

interface Genre {
  id: number
  name: string
}

interface director {
  id: number
  name: string
}

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>() // Extract id from the URL params
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [genre, setGenre] = useState<string | null>(null)
  const [director, setDirector] = useState<string | null>(null)

  // Fetch movie data
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/movies/${id}`,
        )
        if (!response.ok) {
          throw new Error('Failed to fetch movie details')
        }
        const data = await response.json()
        setMovie(data)
        setIsLoading(false)
      } catch (error) {
        setError('Error fetching movie details')
        setIsLoading(false)
      }
    }

    fetchMovie()
  }, [id])

  // Fetch genre data after movie is fetched
  useEffect(() => {
    if (movie) {
      const fetchGenre = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/genres/${movie.genre_id}`,
          )
          if (!response.ok) {
            throw new Error('Failed to fetch genre details')
          }
          const genreData = await response.json()
          setGenre(genreData.name)
        } catch (error) {
          setError('Error fetching genre details')
        }
      }

      fetchGenre()
    }
  }, [movie]) // This runs after `movie` state is updated

  // Fetch director data after movie is fetched
  useEffect(() => {
    if (movie) {
      const fetchDirector = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/directors/${movie.director_id}`,
          )
          if (!response.ok) {
            throw new Error('Failed to fetch director details')
          }
          const DirectorData = await response.json()
          setDirector(DirectorData.name)
        } catch (error) {
          setError('Error fetching director details')
        }
      }

      fetchDirector()
    }
  }, [movie]) // This runs after `movie` state is updated
  return (
    <div>
      {isLoading ? (
        <div className="flex h-40 flex-col items-center justify-center">
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            visible={true}
          />
          <div className="font-onest text-xl font-bold">Loading...</div>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : movie ? (
        <div className="flex flex-col items-center justify-center gap-4 pt-6 font-onest">
          <h1 className="text-3xl">{movie.title}</h1>
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="max-h-[300px] max-w-[300px]"
          />
          <p>{movie.description}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Genre: {genre || 'Loading genre...'}</p>
          <p>Genre: {director || 'Loading director...'}</p>
        </div>
      ) : (
        <div>No movie found</div>
      )}
    </div>
  )
}

export default MovieDetails
