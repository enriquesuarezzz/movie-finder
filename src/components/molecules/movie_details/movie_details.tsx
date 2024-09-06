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

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>() // Extract id from the URL params
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

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
        <div>
          <h1>{movie.title}</h1>
          <img src={movie.poster_url} alt={movie.title} />
          <p>{movie.description}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Genre ID: {movie.genre_id}</p>
          <p>Director ID: {movie.director_id}</p>
        </div>
      ) : (
        <div>No movie found</div>
      )}
    </div>
  )
}

export default MovieDetails
