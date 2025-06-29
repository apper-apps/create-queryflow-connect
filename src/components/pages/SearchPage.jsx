import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import SearchInterface from '@/components/organisms/SearchInterface'

const SearchPage = () => {
  const [mode, setMode] = useState('search')
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const initialQuery = queryParams.get('q') || ''
  
  const handleModeToggle = () => {
    setMode(mode === 'search' ? 'chat' : 'search')
  }
  
  return (
    <div className="min-h-full">
      <SearchInterface 
        mode={mode}
        onModeToggle={handleModeToggle}
        initialQuery={initialQuery}
      />
    </div>
  )
}

export default SearchPage