import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { historyService } from '@/services/api/historyService'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'react-toastify'

const HistoryPage = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all') // all, search, chat
  
  const loadHistory = async () => {
    setLoading(true)
    setError('')
    
    try {
      const historyData = await historyService.getAll()
      setHistory(historyData)
    } catch (err) {
      setError('Failed to load search history. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadHistory()
  }, [])
  
  const handleClearHistory = async () => {
    if (window.confirm('Are you sure you want to clear all search history?')) {
      try {
        await historyService.clearAll()
        setHistory([])
        toast.success('Search history cleared')
      } catch (err) {
        toast.error('Failed to clear history')
      }
    }
  }
  
  const handleDeleteItem = async (id) => {
    try {
      await historyService.delete(id)
      setHistory(prev => prev.filter(item => item.id !== id))
      toast.success('Item removed from history')
    } catch (err) {
      toast.error('Failed to remove item')
    }
  }
  
  const filteredHistory = history.filter(item => {
    if (filter === 'all') return true
    return item.mode === filter
  })
  
  const handleRetry = () => {
    loadHistory()
  }
  
  return (
    <div className="min-h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Search History</h1>
          <p className="text-gray-600">
            View and manage your search and chat history
          </p>
        </div>
        
        {history.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            icon="Trash2"
            onClick={handleClearHistory}
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            Clear All
          </Button>
        )}
      </div>
      
      {/* Filters */}
      {history.length > 0 && (
        <div className="flex items-center space-x-2 mb-6">
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
          <div className="flex items-center space-x-2">
            {[
              { key: 'all', label: 'All', icon: 'List' },
              { key: 'search', label: 'Search', icon: 'Search' },
              { key: 'chat', label: 'Chat', icon: 'MessageCircle' }
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`
                  flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${filter === key
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                  }
                `}
              >
                <ApperIcon name={icon} className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Content */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loading />
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
              title="Failed to Load History"
            />
          </motion.div>
        )}
        
        {!loading && !error && filteredHistory.length === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Empty
              title="No search history"
              message="Your search and chat history will appear here as you use QueryFlow."
              icon="History"
            />
          </motion.div>
        )}
        
        {!loading && !error && filteredHistory.length > 0 && (
          <motion.div
            key="history"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {filteredHistory.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:border-primary-200 transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge 
                          variant={item.mode === 'search' ? 'info' : 'primary'} 
                          size="sm"
                        >
                          <ApperIcon 
                            name={item.mode === 'search' ? 'Search' : 'MessageCircle'} 
                            className="w-3 h-3 mr-1" 
                          />
                          {item.mode.toUpperCase()}
                        </Badge>
                        
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      
                      <h3 className="text-base font-medium text-gray-900 mb-2 line-clamp-2">
                        {item.query}
                      </h3>
                      
                      {item.results && item.results.length > 0 && (
                        <p className="text-sm text-gray-600">
                          {item.results.length} result{item.results.length !== 1 ? 's' : ''} found
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon="ExternalLink"
                        onClick={() => {
                          const path = item.mode === 'search' ? '/search' : '/chat'
                          window.open(`${path}?q=${encodeURIComponent(item.query)}`, '_blank')
                        }}
                        className="text-gray-500 hover:text-primary-600"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        icon="Trash2"
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-gray-500 hover:text-red-600"
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HistoryPage