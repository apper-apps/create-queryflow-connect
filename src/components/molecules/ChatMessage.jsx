import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import { formatDistanceToNow } from 'date-fns'

const ChatMessage = ({ message, showSources = true }) => {
  const isUser = message.role === 'user'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}
    >
      <div className={`max-w-3xl ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Avatar */}
        <div className={`flex items-end space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
          <div className={`
            flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0
            ${isUser 
              ? 'bg-gradient-to-br from-primary-500 to-primary-600' 
              : 'bg-gradient-to-br from-secondary-500 to-secondary-600'
            }
          `}>
            <ApperIcon 
              name={isUser ? 'User' : 'Bot'} 
              className="w-4 h-4 text-white" 
            />
          </div>
          
          {/* Message Content */}
          <div className={`flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {/* Message Bubble */}
            <div className={`
              inline-block px-4 py-3 rounded-2xl max-w-full
              ${isUser 
                ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-br-md' 
                : 'bg-white border border-gray-200 text-gray-900 rounded-bl-md shadow-sm'
              }
            `}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
            </div>
            
            {/* Timestamp */}
            <div className={`mt-1 text-xs text-gray-500 ${isUser ? 'text-right' : 'text-left'}`}>
              {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
            </div>
            
            {/* Sources */}
            {!isUser && showSources && message.sources && message.sources.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-xs font-medium text-gray-700">Sources:</p>
                <div className="flex flex-wrap gap-2">
                  {message.sources.map((source, index) => (
                    <Badge 
                      key={index} 
                      variant="info" 
                      size="xs"
                      className="cursor-pointer hover:bg-blue-200 transition-colors duration-200"
                    >
                      <ApperIcon name="ExternalLink" className="w-3 h-3 mr-1" />
                      {source.title || `Source ${index + 1}`}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ChatMessage