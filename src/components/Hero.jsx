import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaStar, FaFire } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Hero = ({ onSearch }) => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      navigate('/')
    }
  }

  const popularSearches = [
    'Avengers',
    'Inception',
    'Dark Knight',
    'Interstellar',
    'Spider-Man',
    'John Wick'
  ]

  return (
    <section className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden mb-8 sm:mb-12">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600"
          alt="Cinema"
          className="w-full h-full object-cover scale-110 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-purple-600/20 animate-pulse-slow" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center text-white">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-4 sm:mb-6"
        >
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg flex items-center gap-1 sm:gap-2">
            <FaFire className="text-yellow-300 text-xs sm:text-sm" /> 
            <span className="hidden xs:inline">1 Million+</span> Movies Available
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-2 sm:mb-4"
        >
          <span className="block">Discover Your Next</span>
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl mt-1 sm:mt-2">
            Favorite Movie
          </span>
        </motion.h1>
        
        {/* Subtitle - Hidden on mobile */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden sm:block text-base md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-8 max-w-2xl lg:max-w-3xl mx-auto px-4"
        >
          Search millions of movies, get details, watch trailers, and save favorites.
        </motion.p>

        {/* Search Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto mb-6 md:mb-8 px-2 sm:px-0"
        >
          <div className="relative flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl sm:rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:border-blue-500 focus:bg-white/20 transition-all shadow-2xl"
            />
            
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <FaSearch className="text-sm sm:text-base" /> 
              <span>Search</span>
            </button>
          </div>
        </motion.form>

        {/* Popular Searches - Scrollable on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 px-4 hide-scrollbar"
        >
          <span className="text-gray-300 text-xs sm:text-sm flex items-center gap-1 flex-shrink-0">
            <FaStar className="text-yellow-400 text-xs sm:text-sm" /> Popular:
          </span>
          <div className="flex gap-1 sm:gap-2 flex-nowrap">
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term)
                  onSearch(term)
                  navigate('/')
                }}
                className="flex-shrink-0 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all whitespace-nowrap"
              >
                {term}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="hidden md:flex justify-center gap-8 mt-12"
        >
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-white">1M+</div>
            <div className="text-xs lg:text-sm text-gray-400">Movies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-white">50K+</div>
            <div className="text-xs lg:text-sm text-gray-400">TV Shows</div>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-white">24/7</div>
            <div className="text-xs lg:text-sm text-gray-400">Updated</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer hidden md:block"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 md:w-1.5 md:h-3 bg-white rounded-full mt-2 animate-scroll" />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero