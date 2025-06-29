import React from 'react'
import FileUploader from '@/components/organisms/FileUploader'

const UploadPage = () => {
  return (
    <div className="min-h-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Document Upload</h1>
        <p className="text-gray-600">
          Upload documents to expand your searchable knowledge base. Supported formats include PDF, Word, Excel, and PowerPoint files.
        </p>
      </div>
      
      <FileUploader />
    </div>
  )
}

export default UploadPage