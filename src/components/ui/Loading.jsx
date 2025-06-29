import React from 'react'
import { motion } from 'framer-motion'

const Loading = ({ type = 'default' }) => {
  if (type === 'search') {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shimmer"></div>
                  <div className="w-20 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shimmer"></div>
                </div>
                <div className="w-24 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
              </div>
              
              {/* Title */}
              <div className="w-3/4 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
              
              {/* Content */}
              <div className="space-y-2">
                <div className="w-full h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
                <div className="w-5/6 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
                <div className="w-2/3 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="w-32 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
                <div className="w-16 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  if (type === 'chat') {
    return (
      <div className="flex justify-start mb-6">
        <div className="flex items-end space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            />
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md shadow-sm p-4 max-w-md">
            <div className="space-y-2">
              <div className="w-48 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
              <div className="w-32 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (type === 'files') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl shimmer"></div>
              <div className="flex-1 space-y-2">
                <div className="w-3/4 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
                <div className="w-1/2 h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
                <div className="w-full h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  // Default loading
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto"
        />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

export default Loading