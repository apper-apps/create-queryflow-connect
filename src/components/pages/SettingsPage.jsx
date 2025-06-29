import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import { settingsService } from '@/services/api/settingsService'
import { toast } from 'react-toastify'

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    apiKey: '',
    maxResults: 10,
    cacheExpiry: 24,
    darkMode: false,
    notifications: true,
    autoSave: true
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  
  useEffect(() => {
    loadSettings()
  }, [])
  
  const loadSettings = async () => {
    setLoading(true)
    try {
      const userSettings = await settingsService.getSettings()
      setSettings(userSettings)
    } catch (err) {
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }
  
  const handleSaveSettings = async () => {
    setSaving(true)
    try {
      await settingsService.updateSettings(settings)
      toast.success('Settings saved successfully')
    } catch (err) {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }
  
  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }
  
  const handleToggle = (field) => {
    setSettings(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }
  
  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto"
          />
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">
          Configure your QueryFlow experience and API settings
        </p>
      </div>
      
      <div className="space-y-6">
        {/* API Configuration */}
        <Card>
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                <ApperIcon name="Key" className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">API Configuration</h2>
                <p className="text-sm text-gray-600">Configure your AI API settings</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Input
                label="OpenAI API Key"
                type="password"
                value={settings.apiKey}
                onChange={(e) => handleInputChange('apiKey', e.target.value)}
                placeholder="sk-..."
                icon="Lock"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Max Results per Query"
                  type="number"
                  value={settings.maxResults}
                  onChange={(e) => handleInputChange('maxResults', parseInt(e.target.value))}
                  min="1"
                  max="50"
                />
                
                <Input
                  label="Cache Expiry (hours)"
                  type="number"
                  value={settings.cacheExpiry}
                  onChange={(e) => handleInputChange('cacheExpiry', parseInt(e.target.value))}
                  min="1"
                  max="168"
                />
              </div>
            </div>
          </div>
        </Card>
        
        {/* Appearance */}
        <Card>
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-lg flex items-center justify-center">
                <ApperIcon name="Palette" className="w-5 h-5 text-secondary-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
                <p className="text-sm text-gray-600">Customize your interface preferences</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Dark Mode</h3>
                  <p className="text-sm text-gray-600">Use dark theme throughout the app</p>
                </div>
                <button
                  onClick={() => handleToggle('darkMode')}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
                    ${settings.darkMode ? 'bg-primary-600' : 'bg-gray-300'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                      ${settings.darkMode ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Preferences */}
        <Card>
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center">
                <ApperIcon name="Settings" className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
                <p className="text-sm text-gray-600">Control app behavior and notifications</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Notifications</h3>
                  <p className="text-sm text-gray-600">Receive notifications about search results</p>
                </div>
                <button
                  onClick={() => handleToggle('notifications')}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
                    ${settings.notifications ? 'bg-primary-600' : 'bg-gray-300'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                      ${settings.notifications ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Auto-save History</h3>
                  <p className="text-sm text-gray-600">Automatically save search history</p>
                </div>
                <button
                  onClick={() => handleToggle('autoSave')}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
                    ${settings.autoSave ? 'bg-primary-600' : 'bg-gray-300'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                      ${settings.autoSave ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Usage Stats */}
        <Card>
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <ApperIcon name="BarChart3" className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Usage Statistics</h2>
                <p className="text-sm text-gray-600">Your QueryFlow usage overview</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">247</div>
                <div className="text-sm text-gray-600">Total Searches</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-secondary-600">89</div>
                <div className="text-sm text-gray-600">Chat Conversations</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">12</div>
                <div className="text-sm text-gray-600">Files Uploaded</div>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSaveSettings}
            variant="primary"
            size="lg"
            icon="Save"
            loading={saving}
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage