import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  title = 'No data found',
  message = 'There is nothing to display at the moment.',
  actionText,
  onAction,
  icon = 'Search',
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-center py-12 ${className}`}
    >
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <ApperIcon 
            name={icon} 
            className="w-10 h-10 text-gray-400"
          />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-900">
            {title}
          </h3>
          <p className="text-gray-600 max-w-sm mx-auto">
            {message}
          </p>
        </div>
        
        {actionText && onAction && (
          <div className="pt-2">
            <Button
              onClick={onAction}
              variant="primary"
              size="lg"
              icon="ArrowRight"
            >
              {actionText}
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Empty