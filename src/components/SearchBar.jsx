import React, { useState, useEffect } from 'react'
import { FaSearch, FaTimes, FaFilter } from 'react-icons/fa'

const SearchBar = ({ onSearch, initialValue = '', totalResults }) => {
  const [query, setQuery] = useState(initialValue)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== initialValue) {
        onSearch(query)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [query, onSearch, initialValue])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className="mb-4 sm:mb-6 md:mb-8 px-2 sm:px-0">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search movies..."
            className="w-full pl-9 sm:pl-12 md:pl-14 pr-20 sm:pr-24 md:pr-32 py-2.5 sm:py-3 md:py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl md:rounded-2xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:text-white text-sm sm:text-base shadow-lg"
          />
          
          <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-sm sm:text-base transition-colors ${
            isFocused ? 'text-blue-600' : 'text-gray-400'
          }`} />
          
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FaTimes className="text-xs sm:text-sm text-gray-400" />
              </button>
            )}
            
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-lg md:rounded-xl font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-md flex items-center gap-1 text-xs sm:text-sm"
            >
              <FaSearch className="text-xs sm:text-sm" /> 
              <span className="hidden xs:inline">Search</span>
            </button>
          </div>
        </div>
      </form>
      
      {/* Search Stats */}
      {query && (
        <div className="mt-2 sm:mt-3 flex flex-col xs:flex-row xs:items-center justify-between gap-2">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Found <span className="font-bold text-blue-600">{totalResults || 0}</span> results
          </p>
          
          <button className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 flex items-center gap-1 self-start xs:self-auto">
            <FaFilter className="text-xs" /> Filter
          </button>
        </div>
      )}
      
      {/* Suggestions - Hidden on very small screens */}
      {!query && (
        <div className="mt-3 sm:mt-4 hidden sm:flex flex-wrap gap-2">
          <span className="text-xs sm:text-sm text-gray-500">Suggestions:</span>
          {['Action', 'Comedy', 'Drama', 'Sci-Fi'].map((genre) => (
            <button
              key={genre}
              onClick={() => setQuery(genre)}
              className="text-xs px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
            >
              {genre}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar