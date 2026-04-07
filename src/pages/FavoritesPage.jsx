import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import { useFavorites } from '../context/FavoritesContext'
import { IMAGE_BASE_URL } from '../hooks/useMovies'

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFavorites()

  if (favorites.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          No favorites yet
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Start adding movies to your favorites
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Movies
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Your Favorite Movies
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {favorites.map(movie => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group relative"
          >
            <Link to={`/movie/${movie.id}`}>
              <div className="aspect-[2/3]">
                <img
                  src={movie.poster_path
                    ? `${IMAGE_BASE_URL}${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Poster'
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>

            <button
              onClick={() => removeFromFavorites(movie.id)}
              className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <FaHeart className="text-red-500 text-lg" />
            </button>

            <div className="p-3">
              <h3 className="font-semibold text-gray-800 dark:text-white truncate">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {movie.release_date?.split('-')[0] || 'N/A'}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default FavoritesPage