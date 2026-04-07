import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useDarkMode } from './hooks/useDarkMode'
import { FavoritesProvider } from './context/FavoritesContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'  // ← Add this import
import HomePage from './pages/HomePage'
import MovieDetailPage from './pages/MovieDetailPage'
import FavoritesPage from './pages/FavoritesPage'

function App() {
  const { isDarkMode, toggleTheme } = useDarkMode()

  return (
    <BrowserRouter>
      <FavoritesProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col">
          <Navbar darkMode={isDarkMode} toggleTheme={toggleTheme} />
          
          <main className="flex-grow pt-16">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movie/:id" element={<MovieDetailPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </AnimatePresence>
          </main>

          <Footer />  {/* ← Add Footer here */}
        </div>
      </FavoritesProvider>
    </BrowserRouter>
  )
}

export default App