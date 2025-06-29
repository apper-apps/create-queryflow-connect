import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import { formatDistanceToNow } from 'date-fns'

const FileUploadCard = ({ file, onDelete, onView }) => {
  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf': return 'FileText'
      case 'doc':
      case 'docx': return 'FileText'
      case 'xls':
      case 'xlsx': return 'FileSpreadsheet'
      case 'ppt':
      case 'pptx': return 'Presentation'
      default: return 'File'
    }
  }
  
  const getFileTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf': return 'error'
      case 'doc':
      case 'docx': return 'info'
      case 'xls':
      case 'xlsx': return 'success'
      case 'ppt':
      case 'pptx': return 'warning'
      default: return 'default'
    }
  }
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:border-primary-200 transition-all duration-200">
        <div className="flex items-start space-x-4">
          {/* File Icon */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
              <ApperIcon 
                name={getFileIcon(file.type)} 
                className="w-6 h-6 text-gray-600" 
              />
            </div>
          </div>
          
          {/* File Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {file.filename}
              </h3>
              <Badge variant={getFileTypeColor(file.type)} size="xs">
                {file.type.toUpperCase()}
              </Badge>
            </div>
            
            <div className="space-y-1 text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <span>{formatFileSize(file.size)}</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(file.uploadDate), { addSuffix: true })}</span>
              </div>
              
              {file.extractedText && (
                <p className="text-xs text-gray-600 line-clamp-2 mt-2">
                  {file.extractedText.substring(0, 100)}...
                </p>
              )}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              icon="Eye"
              onClick={() => onView && onView(file)}
              className="text-gray-500 hover:text-primary-600"
            />
            <Button
              variant="ghost"
              size="sm"
              icon="Trash2"
              onClick={() => onDelete && onDelete(file.id)}
              className="text-gray-500 hover:text-red-600"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default FileUploadCard