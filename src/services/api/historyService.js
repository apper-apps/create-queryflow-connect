import { mockHistory } from '@/services/mockData/history.json'

class HistoryService {
  constructor() {
    this.history = [...mockHistory]
  }
  
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200))
    return [...this.history].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }
  
  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.history.find(item => item.Id === parseInt(id))
  }
  
  async create(searchQuery) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const newItem = {
      Id: Math.max(...this.history.map(h => h.Id), 0) + 1,
      query: searchQuery.query,
      mode: searchQuery.mode,
      results: searchQuery.results || [],
      timestamp: new Date().toISOString(),
      userId: searchQuery.userId || null
    }
    
    this.history.unshift(newItem)
    return newItem
  }
  
  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const index = this.history.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error('History item not found')
    }
    this.history.splice(index, 1)
    return true
  }
  
  async clearAll() {
    await new Promise(resolve => setTimeout(resolve, 400))
    this.history = []
    return true
  }
}

export const historyService = new HistoryService()