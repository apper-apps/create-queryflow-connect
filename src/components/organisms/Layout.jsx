import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  
  const navigation = [
    { name: 'Search', href: '/search', icon: 'Search' },
    { name: 'Chat', href: '/chat', icon: 'MessageCircle' },
    { name: 'Upload', href: '/upload', icon: 'Upload' },
    { name: 'History', href: '/history', icon: 'History' },
    { name: 'Settings', href: '/settings', icon: 'Settings' }
  ]
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  
  return (
    <div className="flex h-screen bg-gradient-to-br from-surface via-white to-gray-50">
      {/* Mobile backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : '-100%'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-xl lg:relative lg:translate-x-0 lg:shadow-none"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <ApperIcon name="Zap" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">QueryFlow</h1>
                <p className="text-xs text-gray-500">AI-Powered Search</p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href === '/search' && location.pathname === '/')
              
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive: linkActive }) => {
                    const active = linkActive || isActive
                    return `
                      flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                      ${active
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                      }
                    `
                  }}
                >
                  <ApperIcon 
                    name={item.icon} 
                    className="w-5 h-5 mr-3" 
                  />
                  {item.name}
                </NavLink>
              )
            })}
          </nav>
          
          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 space-y-1">
              <p>© 2024 QueryFlow</p>
              <p>Powered by AI</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200 lg:hidden"
              >
                <ApperIcon name="Menu" className="w-5 h-5" />
              </button>
              
              <div className="hidden lg:block">
                <h2 className="text-lg font-semibold text-gray-900">
                  {navigation.find(item => 
                    location.pathname === item.href || 
                    (item.href === '/search' && location.pathname === '/')
                  )?.name || 'QueryFlow'}
                </h2>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200">
                <ApperIcon name="Bell" className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200">
                <ApperIcon name="HelpCircle" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout