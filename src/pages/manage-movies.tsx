import React, { useEffect, useState } from 'react'

interface Movie {
  id: number
  title: string
  release_date: string
  genre_id: number
  director_id: number
  poster_url: string
  description: string
}

function ManageMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [newMovie, setNewMovie] = useState<Omit<Movie, 'id'>>({
    title: '',
    release_date: '',
    genre_id: 0,
    director_id: 0,
    poster_url: '',
    description: '',
  })
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
  const [showForm, setShowForm] = useState(false) // State to control form visibility

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}`)
        if (!response.ok) {
          throw new Error('Failed to fetch movies')
        }
        const data: Movie[] = await response.json()
        setMovies(data)
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    }

    fetchMovies()
  }, [])

  const handleCreateMovie = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newMovie),
      })

      if (!response.ok) {
        throw new Error('Failed to create movie')
      }

      const createdMovie = await response.json()
      setMovies([...movies, createdMovie])
      setNewMovie({
        title: '',
        release_date: '',
        genre_id: 0,
        director_id: 0,
        poster_url: '',
        description: '',
      })
      setShowForm(false) // Hide the form after creating a movie
    } catch (error) {
      console.error('Failed to create movie:', error)
    }
  }

  const handleUpdateMovie = async () => {
    if (!editingMovie) return

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${editingMovie.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(editingMovie),
        },
      )

      if (!response.ok) {
        throw new Error('Failed to update movie')
      }

      const updatedMovie = await response.json()

      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === updatedMovie.id ? updatedMovie : movie,
        ),
      )
      setEditingMovie(null)
      setShowForm(false) // Hide the form after updating a movie
    } catch (error) {
      console.error('Failed to update movie:', error)
    }
  }

  const handleDeleteMovie = async (id: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete movie')
      }

      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id))
    } catch (error) {
      console.error('Failed to delete movie:', error)
    }
  }

  const startEditing = (movie: Movie) => {
    setEditingMovie(movie)
    setShowForm(true) // Show the form when editing a movie
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="pb-10 pt-10 font-onest text-3xl font-semibold text-blue-600">
        Manage Movies
      </h2>
      {/* List of movies with edit and delete options */}
      <ul className="mx-auto flex w-full flex-wrap items-center justify-center gap-4 ">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="flex flex-col items-center gap-1 rounded-lg border border-gray-300 p-4 font-onest text-lg shadow-lg "
          >
            {movie.poster_url && (
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="h-40 w-28"
              />
            )}
            {movie.title}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                className="text-bold max-w-[100px] rounded-3xl bg-blue-700 px-2 py-1 font-onest text-base text-white hover:bg-blue-600"
                onClick={() => startEditing(movie)}
              >
                Edit
              </button>
              <button
                className="text-bold max-w-[100px] rounded-3xl bg-red-700 px-2 py-1 font-onest text-base text-white hover:bg-red-600"
                onClick={() => handleDeleteMovie(movie.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Button to show the form */}
      <button
        className="text-bold  mt-12 max-w-[200px] rounded-3xl bg-blue-700 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => setShowForm(true)}
      >
        Create New Movie
      </button>

      {/* Form to create/edit a movie (hidden by default) */}
      {showForm && (
        <div className="flex w-full max-w-[400px] flex-col items-center pt-4">
          <h3 className="pb-4 pt-2 font-onest text-xl font-semibold ">
            {editingMovie ? 'Edit Movie' : 'Create New Movie'}
          </h3>

          <input
            type="text"
            placeholder="Title"
            value={editingMovie ? editingMovie.title : newMovie.title}
            className="peer mb-3 w-full rounded-md border-2  pt-2 font-onest text-base  focus:outline-none"
            onChange={(e) =>
              editingMovie
                ? setEditingMovie({ ...editingMovie, title: e.target.value })
                : setNewMovie({ ...newMovie, title: e.target.value })
            }
          />
          <input
            type="date"
            placeholder="Release Date"
            value={
              editingMovie ? editingMovie.release_date : newMovie.release_date
            }
            className="peer mb-3 w-full rounded-md border-2  pt-2 font-onest text-base  focus:outline-none"
            onChange={(e) =>
              editingMovie
                ? setEditingMovie({
                    ...editingMovie,
                    release_date: e.target.value,
                  })
                : setNewMovie({ ...newMovie, release_date: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Poster URL"
            value={editingMovie ? editingMovie.poster_url : newMovie.poster_url}
            className="peer mb-3 w-full rounded-md border-2  pt-2 font-onest text-base  focus:outline-none"
            onChange={(e) =>
              editingMovie
                ? setEditingMovie({
                    ...editingMovie,
                    poster_url: e.target.value,
                  })
                : setNewMovie({ ...newMovie, poster_url: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Genre ID"
            value={editingMovie ? editingMovie.genre_id : newMovie.genre_id}
            className="peer mb-3 w-full rounded-md border-2  pt-2 font-onest text-base  focus:outline-none"
            onChange={(e) =>
              editingMovie
                ? setEditingMovie({
                    ...editingMovie,
                    genre_id: Number(e.target.value),
                  })
                : setNewMovie({ ...newMovie, genre_id: Number(e.target.value) })
            }
          />
          <input
            type="number"
            placeholder="Director ID"
            value={
              editingMovie ? editingMovie.director_id : newMovie.director_id
            }
            className="peer mb-3 w-full rounded-md border-2  pt-2 font-onest text-base  focus:outline-none"
            onChange={(e) =>
              editingMovie
                ? setEditingMovie({
                    ...editingMovie,
                    director_id: Number(e.target.value),
                  })
                : setNewMovie({
                    ...newMovie,
                    director_id: Number(e.target.value),
                  })
            }
          />
          <textarea
            placeholder="Description"
            value={
              editingMovie ? editingMovie.description : newMovie.description
            }
            className="peer mb-3 w-full rounded-md border-2  pt-2 font-onest text-base  focus:outline-none"
            onChange={(e) =>
              editingMovie
                ? setEditingMovie({
                    ...editingMovie,
                    description: e.target.value,
                  })
                : setNewMovie({ ...newMovie, description: e.target.value })
            }
          ></textarea>
          <button
            className="text-bold max-w-[150px] rounded-3xl bg-blue-700 px-4 py-2 text-white hover:bg-blue-600"
            onClick={editingMovie ? handleUpdateMovie : handleCreateMovie}
          >
            {editingMovie ? 'Update Movie' : 'Create Movie'}
          </button>
          <button
            className="text-bold mt-3 max-w-[150px] rounded-3xl bg-red-700 px-4 py-2 text-white hover:bg-red-600"
            onClick={() => {
              setShowForm(false)
              setEditingMovie(null)
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

export default ManageMovies
