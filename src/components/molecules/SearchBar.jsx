import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search the web or ask a question...",
  value = '',
  onChange,
  mode = 'search',
  onModeToggle,
  loading = false,
  className = ''
}) => {
  const [focused, setFocused] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim() && onSearch) {
      onSearch(value.trim())
    }
  }
  
  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className={`
          relative flex items-center bg-white rounded-2xl border-2 transition-all duration-200
          ${focused ? 'border-primary-500 shadow-lg shadow-primary-500/20' : 'border-gray-200 shadow-md'}
        `}>
          {/* Mode Toggle */}
          <div className="flex items-center pl-4">
            <motion.button
              type="button"
              onClick={onModeToggle}
              className={`
                flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200
                ${mode === 'search' 
                  ? 'bg-primary-500 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon 
                name={mode === 'search' ? 'Search' : 'MessageCircle'} 
                className="w-5 h-5" 
              />
            </motion.button>
          </div>
          
          {/* Search Input */}
          <input
            type="text"
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className="flex-1 px-4 py-4 text-lg bg-transparent border-none outline-none placeholder-gray-500"
            disabled={loading}
          />
          
          {/* Search Button */}
          <div className="pr-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={loading ? 'Loader2' : 'ArrowRight'}
              disabled={!value.trim() || loading}
              className={`rounded-xl ${loading ? 'animate-spin-icon' : ''}`}
            >
              {mode === 'search' ? 'Search' : 'Ask'}
            </Button>
          </div>
        </div>
        
        {/* Mode Indicator */}
        <div className="flex items-center justify-center mt-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <ApperIcon 
              name={mode === 'search' ? 'Globe' : 'Bot'} 
              className="w-4 h-4" 
            />
            <span>
              {mode === 'search' 
                ? 'Search the web for information' 
                : 'Chat with AI for answers'
              }
            </span>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchBar