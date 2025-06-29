import mockSearchResults from '@/services/mockData/searchResults.json'

class SearchService {
  async search(query) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700))
    
    // Filter results based on query
    const filteredResults = mockSearchResults.filter(result =>
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.snippet.toLowerCase().includes(query.toLowerCase())
    )
    
    // Add some randomization and scoring
    const scoredResults = filteredResults.map(result => ({
      ...result,
      score: Math.random() * 0.4 + 0.6, // Score between 0.6-1.0
      cached: Math.random() > 0.7, // 30% chance of being cached
      timestamp: new Date().toISOString()
    }))
    
    // Sort by score
    return scoredResults.sort((a, b) => b.score - a.score).slice(0, 10)
  }
  
  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockSearchResults.find(result => result.Id === parseInt(id))
  }
}

export const searchService = new SearchService()