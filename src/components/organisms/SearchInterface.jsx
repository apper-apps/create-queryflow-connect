import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchBar from '@/components/molecules/SearchBar'
import ResultCard from '@/components/molecules/ResultCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { searchService } from '@/services/api/searchService'
import { toast } from 'react-toastify'

const SearchInterface = ({ mode, onModeToggle, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  
  const handleSearch = async (searchQuery) => {
    setLoading(true)
    setError('')
    setHasSearched(true)
    
    try {
      const searchResults = await searchService.search(searchQuery)
      setResults(searchResults)
      
      if (searchResults.length > 0) {
        const cachedCount = searchResults.filter(r => r.cached).length
        if (cachedCount > 0) {
          toast.success(`Found ${searchResults.length} results (${cachedCount} from cache)`)
        } else {
          toast.success(`Found ${searchResults.length} results`)
        }
      }
    } catch (err) {
      setError('Failed to search. Please try again.')
      toast.error('Search failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const handleResultClick = (result) => {
    if (result.url) {
      window.open(result.url, '_blank')
    }
    toast.info(`Viewing: ${result.title}`)
  }
  
  const handleRetry = () => {
    if (query.trim()) {
      handleSearch(query)
    }
  }
  
  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery)
    }
  }, [initialQuery])
  
  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={handleSearch}
          mode={mode}
          onModeToggle={onModeToggle}
          loading={loading}
          placeholder="Search the web or ask a question..."
        />
      </div>
      
      {/* Results Section */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loading type="search" />
          </motion.div>
        )}
        
        {error && !loading && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Error 
              message={error} 
              onRetry={handleRetry}
              title="Search Error"
            />
          </motion.div>
        )}
        
        {!loading && !error && hasSearched && results.length === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Empty
              title="No results found"
              message="Try adjusting your search terms or switching to chat mode for AI assistance."
              actionText="Switch to Chat"
              onAction={onModeToggle}
            />
          </motion.div>
        )}
        
        {!loading && !error && results.length > 0 && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Search Results ({results.length})
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Sort by:</span>
                <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>Relevance</option>
                  <option>Date</option>
                  <option>Source</option>
                </select>
              </div>
            </div>
            
            {/* Results Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {results.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ResultCard 
                    result={result} 
                    onClick={handleResultClick}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchInterface