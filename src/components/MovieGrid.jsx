import React from 'react'
import MovieCard from './MovieCard'
import LoadingSpinner from './LoadingSpinner'

const MovieGrid = ({ movies, loading, hasMore, loadMore, imageBaseUrl, searchQuery = '' }) => {
  return (
    <div className="px-2 sm:px-0">
      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
            {movies.map(movie => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                imageBaseUrl={imageBaseUrl}
              />
            ))}
          </div>

          {loading && (
            <div className="py-6 sm:py-8">
              <LoadingSpinner />
            </div>
          )}

          {!loading && hasMore && movies.length > 0 && (
            <div className="text-center mt-6 sm:mt-8 px-4">
              <button
                onClick={loadMore}
                className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Load More Movies
              </button>
            </div>
          )}
        </>
      ) : (
        !loading && (
          <div className="text-center py-12 sm:py-16 px-4">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎬</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {searchQuery ? 'No movies found' : 'No movies available'}
            </h3>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              {searchQuery 
                ? `We couldn't find any movies matching "${searchQuery}"`
                : 'Check back later for new releases'}
            </p>
          </div>
        )
      )}

      {loading && movies.length === 0 && (
        <div className="py-12 sm:py-16">
          <LoadingSpinner />
        </div>
      )}
    </div>
  )
}

export default MovieGrid