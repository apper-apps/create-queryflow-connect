import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import FileUploadCard from '@/components/molecules/FileUploadCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { fileService } from '@/services/api/fileService'
import { toast } from 'react-toastify'

const FileUploader = () => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  
  const loadFiles = useCallback(async () => {
    setLoading(true)
    setError('')
    
    try {
      const uploadedFiles = await fileService.getAll()
      setFiles(uploadedFiles)
    } catch (err) {
      setError('Failed to load files. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])
  
  React.useEffect(() => {
    loadFiles()
  }, [loadFiles])
  
  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }
  
  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }
  
  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFileUpload(droppedFiles)
  }
  
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    handleFileUpload(selectedFiles)
    e.target.value = '' // Reset input
  }
  
  const handleFileUpload = async (fileList) => {
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx']
    
    for (const file of fileList) {
      // Validate file size
      if (file.size > maxSize) {
        toast.error(`File ${file.name} is too large. Maximum size is 10MB.`)
        continue
      }
      
      // Validate file type
      const extension = file.name.split('.').pop().toLowerCase()
      if (!allowedTypes.includes(extension)) {
        toast.error(`File type ${extension} is not supported.`)
        continue
      }
      
      // Upload file
      try {
        setLoading(true)
        const uploadedFile = await fileService.uploadFile(file)
        setFiles(prev => [uploadedFile, ...prev])
        toast.success(`File ${file.name} uploaded successfully`)
      } catch (err) {
        toast.error(`Failed to upload ${file.name}`)
      }
    }
    
    setLoading(false)
  }
  
  const handleDeleteFile = async (fileId) => {
    try {
      await fileService.delete(fileId)
      setFiles(prev => prev.filter(f => f.id !== fileId))
      toast.success('File deleted successfully')
    } catch (err) {
      toast.error('Failed to delete file')
    }
  }
  
  const handleViewFile = (file) => {
    // In a real app, this would open a file viewer
    toast.info(`Viewing file: ${file.filename}`)
  }
  
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200
          ${dragOver 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }
        `}
      >
        <motion.div
          animate={{ scale: dragOver ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <ApperIcon 
            name="Upload" 
            className="w-16 h-16 mx-auto text-gray-400 mb-4" 
          />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Upload Documents
          </h3>
          <p className="text-gray-600 mb-6">
            Drag and drop files here, or click to select files
          </p>
          
          <div className="space-y-4">
            <input
              type="file"
              id="file-upload"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <Button
              as="label"
              htmlFor="file-upload"
              variant="primary"
              size="lg"
              icon="FolderOpen"
              className="cursor-pointer"
            >
              Choose Files
            </Button>
            
            <p className="text-sm text-gray-500">
              Supported formats: PDF, Word, Excel, PowerPoint (Max 10MB each)
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Files List */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Uploaded Documents ({files.length})
        </h2>
        
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loading type="files" />
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
                onRetry={loadFiles}
                title="Failed to Load Files"
              />
            </motion.div>
          )}
          
          {!loading && !error && files.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Empty
                title="No documents uploaded"
                message="Upload your first document to start building your knowledge base."
                icon="FileText"
              />
            </motion.div>
          )}
          
          {!loading && !error && files.length > 0 && (
            <motion.div
              key="files"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {files.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FileUploadCard
                    file={file}
                    onDelete={handleDeleteFile}
                    onView={handleViewFile}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default FileUploader