import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import { formatDistanceToNow } from 'date-fns'

const ResultCard = ({ result, onClick }) => {
  const getSourceIcon = (source) => {
    switch (source) {
      case 'web': return 'Globe'
      case 'ai': return 'Bot'
      case 'user': return 'User'
      default: return 'FileText'
    }
  }
  
  const getSourceColor = (source) => {
    switch (source) {
      case 'web': return 'info'
      case 'ai': return 'primary'
      case 'user': return 'secondary'
      default: return 'default'
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="cursor-pointer group hover:border-primary-200 transition-all duration-200"
        onClick={() => onClick && onClick(result)}
      >
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant={getSourceColor(result.source)} size="sm">
                <ApperIcon name={getSourceIcon(result.source)} className="w-3 h-3 mr-1" />
                {result.source.toUpperCase()}
              </Badge>
              
              {result.cached && (
                <Badge variant="success" size="sm">
                  <ApperIcon name="Zap" className="w-3 h-3 mr-1" />
                  CACHED
                </Badge>
              )}
            </div>
            
            <div className="flex items-center text-xs text-gray-500">
              <ApperIcon name="Clock" className="w-3 h-3 mr-1" />
              {formatDistanceToNow(new Date(result.timestamp), { addSuffix: true })}
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
            {result.title}
          </h3>
          
          {/* Snippet */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {result.snippet}
          </p>
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-500">
              <ApperIcon name="ExternalLink" className="w-4 h-4 mr-2" />
              <span className="truncate max-w-xs">
                {result.url ? new URL(result.url).hostname : 'Internal'}
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <ApperIcon 
                    key={i}
                    name="Star" 
                    className={`w-3 h-3 ${
                      i < Math.floor(result.score * 5) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">
                {(result.score * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default ResultCard