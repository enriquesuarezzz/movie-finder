import { useEffect, useState } from 'react'

//data interfaces
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

interface Director {
  id: number
  name: string
}

//states to store data
function ManageMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [director, setDirector] = useState<Director[]>([])
  const [newMovie, setNewMovie] = useState<Omit<Movie, 'id'>>({
    title: '',
    release_date: '',
    genre_id: 0,
    director_id: 0,
    poster_url: '',
    description: '',
  })
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
  const [showForm, setShowForm] = useState(false)

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesResponse, genresResponse, directorsResponse] =
          await Promise.all([
            fetch(`${process.env.REACT_APP_API_URL}/movies`), // fetch movies
            fetch(`${process.env.REACT_APP_API_URL}/genres`), // fetch genres
            fetch(`${process.env.REACT_APP_API_URL}/directors`), // fetch directors
          ])

        if (!moviesResponse.ok || !genresResponse.ok || !directorsResponse.ok) {
          throw new Error('Failed to fetch data')
        }

        // Parse response data

        const moviesData: Movie[] = await moviesResponse.json()
        const genresData: Genre[] = await genresResponse.json()
        const directorsData: Director[] = await directorsResponse.json()

        // Set data in state

        setMovies(moviesData)
        setGenres(genresData)
        setDirector(directorsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  // function to handle create movie
  const handleCreateMovie = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/movies`, {
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
      setShowForm(false)
    } catch (error) {
      console.error('Failed to create movie:', error)
    }
  }

  // function to handle update movie
  const handleUpdateMovie = async () => {
    if (!editingMovie) return

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/movies/${editingMovie.id}`,
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
      setShowForm(false)
    } catch (error) {
      console.error('Failed to update movie:', error)
    }
  }

  // function to handle delete movie
  const handleDeleteMovie = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/movies/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error('Failed to delete movie')
      }

      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id))
    } catch (error) {
      console.error('Failed to delete movie:', error)
    }
  }

  // function to start editing movie and show form
  const startEditing = (movie: Movie) => {
    setEditingMovie(movie)
    setShowForm(true)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {/* title */}
      <h2 className="pb-10 pt-10 font-onest text-3xl font-semibold text-blue-600">
        Manage Movies
      </h2>
      {/* movies list with edit and delte buttons */}
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

      {/* create new movie form */}
      <button
        className="text-bold  mt-12 max-w-[200px] rounded-3xl bg-blue-700 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => setShowForm(true)}
      >
        Create New Movie
      </button>

      {showForm && (
        <div className="flex w-full max-w-[400px] flex-col items-center pt-4">
          <h3 className="pb-4 pt-2 font-onest text-xl font-semibold ">
            {editingMovie ? 'Edit Movie' : 'Create New Movie'}
          </h3>

          {/* title input */}
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

          {/* release date input */}
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

          {/* poster url input */}
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
          {/* Dropdown for Genre */}
          <select
            value={editingMovie ? editingMovie.genre_id : newMovie.genre_id}
            className="peer mb-3 w-full rounded-md border-2  pt-2 font-onest text-base  focus:outline-none"
            onChange={(e) =>
              editingMovie
                ? setEditingMovie({
                    ...editingMovie,
                    genre_id: Number(e.target.value),
                  })
                : setNewMovie({
                    ...newMovie,
                    genre_id: Number(e.target.value),
                  })
            }
          >
            <option value={0}>Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          {/* Dropdown for Director */}
          <select
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
          >
            <option value={0}>Select Director</option>
            {director.map((director) => (
              <option key={director.id} value={director.id}>
                {director.name}
              </option>
            ))}
          </select>

          {/* description input */}
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

          {/* create/update button */}
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
