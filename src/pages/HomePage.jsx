import React, { useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useMovies } from '../hooks/useMovies'
import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar'
import MovieGrid from '../components/MovieGrid'

const HomePage = () => {
  const {
    movies,
    loading,
    error,
    hasMore,
    totalResults,
    searchQuery,
    searchMovies,
    loadMore,
    imageBaseUrl
  } = useMovies()

  // Handle infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 &&
        !loading &&
        hasMore
      ) {
        loadMore()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading, hasMore, loadMore])

  const handleSearch = useCallback((query) => {
    searchMovies(query)
  }, [searchMovies])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <Hero onSearch={handleSearch} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Show search bar only when not on hero search */}
        {window.location.pathname === '/' && (
          <SearchBar 
            onSearch={handleSearch} 
            initialValue={searchQuery}
          />
        )}
        
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Search Results for "{searchQuery}"
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Found {totalResults} movies
            </p>
          </div>
        )}

        <MovieGrid
          movies={movies}
          loading={loading}
          hasMore={hasMore}
          loadMore={loadMore}
          imageBaseUrl={imageBaseUrl}
        />
      </div>
    </motion.div>
  )
}

export default HomePage