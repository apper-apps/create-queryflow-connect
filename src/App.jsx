import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import SearchPage from '@/components/pages/SearchPage'
import ChatPage from '@/components/pages/ChatPage'
import UploadPage from '@/components/pages/UploadPage'
import HistoryPage from '@/components/pages/HistoryPage'
import SettingsPage from '@/components/pages/SettingsPage'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-gray-50">
      <Layout>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
      />
    </div>
  )
}

export default App