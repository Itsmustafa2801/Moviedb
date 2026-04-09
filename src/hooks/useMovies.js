import { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios'

const API_KEY = '' // Add you api key 
const BASE_URL = 'https://api.themoviedb.org/3'
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export const useMovies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [totalResults, setTotalResults] = useState(0)
  
  // Use refs to prevent dependency cycles
  const initialFetchDone = useRef(false)
  const isSearching = useRef(false)

  const fetchMovies = useCallback(async (reset = false) => {
    // Prevent multiple simultaneous requests
    if (loading) return
    
    // Check if we should fetch more
    if (!reset && !hasMore) return
    
    setLoading(true)
    setError(null)
    
    try {
      const currentPage = reset ? 1 : page
      const url = searchQuery
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&page=${currentPage}`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${currentPage}`
      
      console.log('Fetching:', url) // Debug log
      const response = await axios.get(url)
      
      setTotalResults(response.data.total_results)
      
      if (reset) {
        setMovies(response.data.results)
        setPage(2)
      } else {
        setMovies(prev => [...prev, ...response.data.results])
        setPage(prev => prev + 1)
      }
      
      setHasMore(currentPage < response.data.total_pages)
    } catch (err) {
      setError('Failed to fetch movies. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
      isSearching.current = false
    }
  }, [page, searchQuery, hasMore, loading])

  // Initial fetch - only runs once
  useEffect(() => {
    if (!initialFetchDone.current && !searchQuery) {
      initialFetchDone.current = true
      fetchMovies(true)
    }
  }, [fetchMovies, searchQuery])

  // Effect for search query changes
  useEffect(() => {
    if (searchQuery !== '') {
      // Small delay to prevent too many requests while typing
      const timer = setTimeout(() => {
        isSearching.current = true
        fetchMovies(true)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [searchQuery, fetchMovies])

  const searchMovies = useCallback((query) => {
    setSearchQuery(query)
    setMovies([])
    setPage(1)
    setHasMore(true)
    // Don't call fetch here - useEffect will handle it
  }, [])

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchMovies()
    }
  }, [loading, hasMore, fetchMovies])

  const getMovieDetails = useCallback(async (movieId) => {
    try {
      const [details, credits, videos] = await Promise.all([
        axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`),
        axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`),
        axios.get(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`)
      ])
      
      return {
        ...details.data,
        credits: credits.data,
        videos: videos.data.results
      }
    } catch (err) {
      console.error('Error fetching movie details:', err)
      throw err
    }
  }, [])

  return {
    movies,
    loading,
    error,
    hasMore,
    totalResults,
    searchQuery,
    searchMovies,
    loadMore,
    getMovieDetails,
    imageBaseUrl: IMAGE_BASE_URL
  }
}
