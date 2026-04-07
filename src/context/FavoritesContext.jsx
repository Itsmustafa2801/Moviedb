import React, { createContext, useState, useContext, useEffect } from 'react'

const FavoritesContext = createContext()

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }
  return context
}

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (movie) => {
    setFavorites(prev => {
      if (prev.some(m => m.id === movie.id)) return prev
      return [...prev, movie]
    })
  }

  const removeFromFavorites = (movieId) => {
    setFavorites(prev => prev.filter(m => m.id !== movieId))
  }

  const isFavorite = (movieId) => {
    return favorites.some(m => m.id === movieId)
  }

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}