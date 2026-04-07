import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaStar, FaHeart, FaRegHeart, FaPlay, FaArrowLeft, FaShare, FaDownload } from 'react-icons/fa'
import { useMovies, IMAGE_BASE_URL } from '../hooks/useMovies'
import { useFavorites } from '../context/FavoritesContext'
import LoadingSpinner from '../components/LoadingSpinner'

const MovieDetailPage = () => {
  const { id } = useParams()
  const { getMovieDetails } = useMovies()
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()
  
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [showShareOptions, setShowShareOptions] = useState(false)

  const favorite = movie ? isFavorite(movie.id) : false

  useEffect(() => {
    let isMounted = true

    const fetchMovieDetails = async () => {
      try {
        setLoading(true)
        const data = await getMovieDetails(id)
        
        if (isMounted) {
          setMovie(data)
          
          const trailerVideo = data.videos?.find(
            video => video.type === 'Trailer' && video.site === 'YouTube'
          )
          if (trailerVideo) {
            setTrailer(trailerVideo)
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load movie details')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchMovieDetails()

    return () => {
      isMounted = false
    }
  }, [id, getMovieDetails])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Link
            to="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Go back home
          </Link>
        </div>
      </div>
    )
  }
  
  if (!movie) return null

  const director = movie.credits?.crew?.find(person => person.job === 'Director')
  const cast = movie.credits?.cast?.slice(0, 6) || []

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Back button - Responsive */}
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm sm:text-base"
        >
          <FaArrowLeft className="text-xs sm:text-sm" /> Back to Movies
        </Link>
      </div>

      {/* Hero Section - Responsive */}
      <div className="relative min-h-[60vh] sm:min-h-[70vh] lg:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={movie.backdrop_path
              ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
              : 'https://via.placeholder.com/1280x720?text=No+Backdrop'
            }
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-3 sm:px-4 pb-6 sm:pb-8 lg:pb-12">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 items-start sm:items-end">
            {/* Poster - Hidden on mobile, show on tablet+ */}
            <div className="hidden sm:block w-32 md:w-48 lg:w-64 rounded-lg overflow-hidden shadow-2xl flex-shrink-0">
              <img
                src={movie.poster_path
                  ? `${IMAGE_BASE_URL}${movie.poster_path}`
                  : 'https://via.placeholder.com/500x750?text=No+Poster'
                }
                alt={movie.title}
                className="w-full h-auto"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-white">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{movie.title}</h1>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-sm sm:text-base">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400 text-xs sm:text-sm" />
                  <span>{movie.vote_average?.toFixed(1)}</span>
                </div>
                <span className="text-gray-300">•</span>
                <span>{movie.release_date?.split('-')[0]}</span>
                <span className="text-gray-300">•</span>
                <span>{movie.runtime} min</span>
              </div>

              <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 max-w-2xl line-clamp-3 sm:line-clamp-none">
                {movie.overview}
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-4">
                {trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <FaPlay className="text-xs sm:text-sm" /> 
                    <span className="hidden xs:inline">Watch</span> Trailer
                  </a>
                )}
                
                <button
                  onClick={() => favorite ? removeFromFavorites(movie.id) : addToFavorites(movie)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-colors flex items-center gap-2 ${
                    favorite
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {favorite ? <FaHeart /> : <FaRegHeart />}
                  <span className="hidden xs:inline">{favorite ? 'Saved' : 'Save'}</span>
                </button>

                {/* Share button - Mobile only */}
                <button
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  className="sm:hidden bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FaShare /> Share
                </button>
              </div>

              {/* Share options - Mobile */}
              {showShareOptions && (
                <div className="mt-3 flex gap-2 sm:hidden">
                  <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm">Copy Link</button>
                  <button className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm">WhatsApp</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Details Section - Responsive */}
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Cast */}
          <div className="lg:col-span-2">
            {cast.length > 0 && (
              <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
                  Cast
                </h2>
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4">
                  {cast.map(person => (
                    <div key={person.id} className="text-center">
                      <img
                        src={person.profile_path
                          ? `${IMAGE_BASE_URL}${person.profile_path}`
                          : 'https://via.placeholder.com/200x200?text=No+Image'
                        }
                        alt={person.name}
                        className="w-full aspect-square object-cover rounded-lg mb-1 sm:mb-2"
                      />
                      <p className="font-semibold text-gray-800 dark:text-white text-xs sm:text-sm truncate">
                        {person.name}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">
                        {person.character}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Movie Info */}
          <div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 sm:p-6">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4 text-base sm:text-lg">
                Movie Info
              </h3>
              
              {director && (
                <div className="mb-2 sm:mb-3">
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Director</p>
                  <p className="text-sm sm:text-base text-gray-800 dark:text-white">{director.name}</p>
                </div>
              )}

              <div className="mb-2 sm:mb-3">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Genres</p>
                <p className="text-sm sm:text-base text-gray-800 dark:text-white">
                  {movie.genres?.map(g => g.name).join(', ')}
                </p>
              </div>

              <div className="mb-2 sm:mb-3">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Release Date</p>
                <p className="text-sm sm:text-base text-gray-800 dark:text-white">
                  {new Date(movie.release_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Status</p>
                <p className="text-sm sm:text-base text-gray-800 dark:text-white">{movie.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MovieDetailPage