import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa'
import { useFavorites } from '../context/FavoritesContext'

const MovieCard = ({ movie, imageBaseUrl }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()
  const favorite = isFavorite(movie.id)

  const toggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (favorite) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group cursor-pointer"
    >
      <Link to={`/movie/${movie.id}`}>
        <div className="relative aspect-[2/3] overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <div className="w-6 h-6 sm:w-8 sm:h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          
          <img
            src={movie.poster_path 
              ? `${imageBaseUrl}${movie.poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Poster'
            }
            alt={movie.title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className="absolute top-1 sm:top-2 right-1 sm:right-2 p-1.5 sm:p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            {favorite ? (
              <FaHeart className="text-red-500 text-xs sm:text-sm md:text-base" />
            ) : (
              <FaRegHeart className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base" />
            )}
          </button>

          {/* Rating */}
          <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 bg-black/70 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs flex items-center gap-0.5 sm:gap-1">
            <FaStar className="text-yellow-400 text-[8px] sm:text-xs" />
            {movie.vote_average?.toFixed(1)}
          </div>
        </div>

        <div className="p-2 sm:p-3">
          <h3 className="font-semibold text-gray-800 dark:text-white text-xs sm:text-sm md:text-base truncate">
            {movie.title}
          </h3>
          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
            {movie.release_date?.split('-')[0] || 'N/A'}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

export default MovieCard