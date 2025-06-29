import mockChatResponses from '@/services/mockData/chatResponses.json'

class ChatService {
  async sendMessage(message, conversationHistory = []) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800))
    
    // Simple keyword matching for mock responses
    const keywords = message.toLowerCase().split(' ')
    
    let bestResponse = mockChatResponses[0] // Default response
    let bestScore = 0
    
    // Find best matching response
    mockChatResponses.forEach(response => {
      const responseKeywords = response.keywords || []
      const matchScore = keywords.reduce((score, keyword) => {
        return responseKeywords.some(rk => rk.includes(keyword) || keyword.includes(rk)) 
          ? score + 1 
          : score
      }, 0)
      
      if (matchScore > bestScore) {
        bestScore = matchScore
        bestResponse = response
      }
    })
    
    // Add some variation to the response
    const variations = [
      bestResponse.content,
      `Based on my analysis, ${bestResponse.content.toLowerCase()}`,
      `Here's what I found: ${bestResponse.content}`,
      `Let me help you with that. ${bestResponse.content}`
    ]
    
    const finalResponse = variations[Math.floor(Math.random() * variations.length)]
    
    return {
      content: finalResponse,
      sources: bestResponse.sources || [],
      cached: Math.random() > 0.6, // 40% chance of being cached
      timestamp: new Date().toISOString()
    }
  }
  
  async getCachedResponse(messageHash) {
    await new Promise(resolve => setTimeout(resolve, 100))
    // In a real app, this would check for cached responses
    return null
  }
}

export const chatService = new ChatService()