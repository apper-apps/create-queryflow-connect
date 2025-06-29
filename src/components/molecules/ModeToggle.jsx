import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const ModeToggle = ({ mode, onChange, className = '' }) => {
  return (
    <div className={`flex items-center bg-gray-100 rounded-xl p-1 ${className}`}>
      <motion.button
        onClick={() => onChange('search')}
        className={`
          flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${mode === 'search' 
            ? 'bg-white text-primary-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
          }
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ApperIcon name="Search" className="w-4 h-4" />
        <span>Search</span>
      </motion.button>
      
      <motion.button
        onClick={() => onChange('chat')}
        className={`
          flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${mode === 'chat' 
            ? 'bg-white text-primary-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
          }
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ApperIcon name="MessageCircle" className="w-4 h-4" />
        <span>Chat</span>
      </motion.button>
    </div>
  )
}

export default ModeToggle