import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Error = ({ 
  title = 'Something went wrong',
  message = 'An error occurred while processing your request.',
  onRetry,
  compact = false,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-center ${compact ? 'py-8' : 'py-12'} ${className}`}
    >
      <div className={`max-w-md mx-auto ${compact ? 'space-y-3' : 'space-y-4'}`}>
        <div className={`
          w-16 h-16 mx-auto rounded-full flex items-center justify-center
          bg-gradient-to-br from-red-100 to-red-200
          ${compact ? 'w-12 h-12' : 'w-16 h-16'}
        `}>
          <ApperIcon 
            name="AlertCircle" 
            className={`text-red-600 ${compact ? 'w-6 h-6' : 'w-8 h-8'}`}
          />
        </div>
        
        <div className="space-y-2">
          <h3 className={`font-semibold text-gray-900 ${compact ? 'text-base' : 'text-lg'}`}>
            {title}
          </h3>
          <p className={`text-gray-600 ${compact ? 'text-sm' : 'text-base'}`}>
            {message}
          </p>
        </div>
        
        {onRetry && (
          <div className="pt-2">
            <Button
              onClick={onRetry}
              variant="primary"
              size={compact ? 'sm' : 'md'}
              icon="RotateCcw"
            >
              Try Again
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Error