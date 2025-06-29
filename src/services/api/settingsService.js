import mockSettingsData from '@/services/mockData/settings.json'

// Use the imported data as mockSettings for consistency
const mockSettings = mockSettingsData

class SettingsService {
  constructor() {
    this.settings = { ...mockSettings }
  }
  
  async getSettings() {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { ...this.settings }
  }
  
  async updateSettings(newSettings) {
    await new Promise(resolve => setTimeout(resolve, 500))
    this.settings = { ...this.settings, ...newSettings }
    return { ...this.settings }
  }
  
  async resetSettings() {
    await new Promise(resolve => setTimeout(resolve, 300))
    this.settings = { ...mockSettings }
    return { ...this.settings }
  }
}

export const settingsService = new SettingsService()