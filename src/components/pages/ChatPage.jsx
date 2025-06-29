import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ChatInterface from '@/components/organisms/ChatInterface'

const ChatPage = () => {
  const [mode, setMode] = useState('chat')
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const initialQuery = queryParams.get('q') || ''
  
  const handleModeToggle = () => {
    setMode(mode === 'chat' ? 'search' : 'chat')
  }
  
  return (
    <div className="min-h-full">
      <ChatInterface 
        mode={mode}
        onModeToggle={handleModeToggle}
        initialQuery={initialQuery}
      />
    </div>
  )
}

export default ChatPage