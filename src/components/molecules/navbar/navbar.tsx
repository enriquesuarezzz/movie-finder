import React, { useState, useCallback } from 'react'
import debounce from 'lodash/debounce'
import Burguer from '../../atoms/svg/burguer'
import { Logo } from '../../atoms/svg/logo'
import Search from '../../atoms/svg/search'
import CloseIcon from '../../atoms/svg/close'
import { Link } from 'react-router-dom'

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([]) // Add state for search results
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const searchMovies = async (query: string) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL +
          `/search?query=${encodeURIComponent(query)}`,
      )
      const data = await response.json()
      console.log('Search results:', data)
      setSearchResults(data)
    } catch (error) {
      console.error('Failed to search movies:', error)
    }
  }

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      console.log('Performing search for:', query)
      searchMovies(query)
    }, 300), // 300ms delay
    [searchMovies], // Include searchMovies as a dependency
  )

  // Handle input change and call debounced search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setSearchQuery(value)

    if (value) {
      debouncedSearch(value)
    } else {
      setSearchResults([]) // Clear results when input is empty
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleSearch = () => {
    if (isSearchOpen) {
      setSearchQuery('') // Clear search query
      setSearchResults([]) // Clear search results
    }
    setIsSearchOpen(!isSearchOpen)
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light relative flex w-full justify-between pb-4 pl-2 pt-3 font-onest md:pl-10">
      <div className="flex items-center gap-2 font-onest text-xl font-bold md:gap-8">
        <Logo />

        <Link className="hover:text-blue-500" to="/">
          MovieFinder
        </Link>
        <Link className="hidden hover:text-blue-500 md:flex" to="/my-movies">
          My Movies
        </Link>
      </div>
      <div className="flex items-center gap-2 pr-2 font-bold md:gap-8 md:pr-10">
        {!isSearchOpen && (
          <button onClick={toggleSearch}>
            <Search />
          </button>
        )}
        <div className="hidden items-center gap-8 md:flex">
          <button className="hover:text-blue-500">Sign In</button>
          <button className="text-bold rounded-3xl bg-blue-700 px-4 py-2 text-white hover:bg-blue-600">
            Sign Up Now
          </button>
        </div>
        <div className="flex md:hidden">
          <button onClick={toggleMenu}>
            <Burguer />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="absolute left-0 right-0 top-full z-50 flex items-center justify-center bg-gray-800 shadow-lg">
          <button onClick={toggleSearch} className="ml-4 text-white">
            <Search />
          </button>
          <input
            type="text"
            className="w-full bg-gray-800 p-2 py-4 text-white focus:outline-none"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button onClick={toggleSearch} className="mr-4 text-white">
            <CloseIcon />
          </button>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-12 bg-white shadow-lg">
          <ul>
            {searchResults.map((movie) => (
              <li key={movie.id} className="border-b border-gray-200 p-4">
                <Link to={`/movies/${movie.id}`}>
                  <div className="flex items-center">
                    <img
                      src={movie.poster_url}
                      alt={movie.title}
                      className="h-16 w-12 object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-bold">{movie.title}</h3>
                      <p className="text-gray-600">{movie.release_date}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No Results Found */}
      {searchQuery && searchResults.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-12 bg-white p-4 text-center shadow-lg">
          <p>No movies found.</p>
        </div>
      )}

      {/* Blurred Background Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={toggleMenu} // Allows closing the menu by clicking outside of it
        ></div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed right-0 top-0 z-50 flex h-full w-80 flex-col bg-blue-500/60 p-6 px-10 shadow-lg md:hidden">
          <div className="mb-4 flex w-full justify-between">
            <Link
              className="flex gap-2 text-left text-2xl font-bold text-white "
              to="/"
            >
              <Logo color="white" />
              MovieFinder
            </Link>
            <button onClick={toggleMenu}>
              <CloseIcon />
            </button>
          </div>
          <Link
            className="mb-2 w-full text-left text-lg text-white"
            to="/my-movies"
          >
            My Movies
          </Link>

          <button className="mb-2 w-full text-left text-lg text-white">
            Sign In
          </button>
          <button className="mb-2 w-full text-left text-lg text-white">
            Sign Up now
          </button>
        </div>
      )}
    </nav>
  )
}
