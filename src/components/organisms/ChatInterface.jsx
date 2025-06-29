import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchBar from '@/components/molecules/SearchBar'
import ChatMessage from '@/components/molecules/ChatMessage'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { chatService } from '@/services/api/chatService'
import { toast } from 'react-toastify'

const ChatInterface = ({ mode, onModeToggle, initialQuery = '' }) => {
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery)
    }
  }, [initialQuery])
  
  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return
    
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, userMessage])
    setQuery('')
    setLoading(true)
    setError('')
    
    try {
      const response = await chatService.sendMessage(messageText, messages)
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString(),
        sources: response.sources || []
      }
      
      setMessages(prev => [...prev, aiMessage])
      
      if (response.cached) {
        toast.success('Response retrieved from cache')
      }
    } catch (err) {
      setError('Failed to get AI response. Please try again.')
      toast.error('Failed to get AI response')
    } finally {
      setLoading(false)
    }
  }
  
  const handleRetry = () => {
    if (messages.length > 0) {
      const lastUserMessage = messages.findLast(m => m.role === 'user')
      if (lastUserMessage) {
        handleSendMessage(lastUserMessage.content)
      }
    }
  }
  
  const clearChat = () => {
    setMessages([])
    setError('')
    toast.info('Chat cleared')
  }
  
  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Chat Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">AI Chat</h2>
          <p className="text-sm text-gray-600">Ask questions and get AI-powered answers</p>
        </div>
        
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors duration-200"
          >
            Clear Chat
          </button>
        )}
      </div>
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto mb-6 space-y-4">
        <AnimatePresence>
          {messages.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Empty
                title="Start a conversation"
                message="Ask me anything! I can help you find information, answer questions, and provide insights."
                actionText="Switch to Search"
                onAction={onModeToggle}
                icon="MessageCircle"
              />
            </motion.div>
          )}
          
          {messages.map((message) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              showSources={true}
            />
          ))}
          
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Loading type="chat" />
            </motion.div>
          )}
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Error 
                message={error} 
                onRetry={handleRetry}
                title="Chat Error"
                compact={true}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Bar */}
      <div className="border-t border-gray-200 pt-4">
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={handleSendMessage}
          mode={mode}
          onModeToggle={onModeToggle}
          loading={loading}
          placeholder="Type your question here..."
        />
      </div>
    </div>
  )
}

export default ChatInterface