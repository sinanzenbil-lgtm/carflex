'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AdminContextType {
  selectedCompanyId: string | null
  setSelectedCompanyId: (id: string | null) => void
  getAuthHeaders: () => HeadersInit
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [selectedCompanyId, setSelectedCompanyIdState] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // localStorage'dan seçili firma ID'sini yükle
    try {
      const stored = localStorage.getItem('selectedCompanyId')
      if (stored) {
        setSelectedCompanyIdState(stored)
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error)
    }
  }, [])

  const setSelectedCompanyId = (id: string | null) => {
    setSelectedCompanyIdState(id)
    if (mounted) {
      try {
        if (id) {
          localStorage.setItem('selectedCompanyId', id)
        } else {
          localStorage.removeItem('selectedCompanyId')
        }
      } catch (error) {
        console.error('Error writing to localStorage:', error)
      }
    }
  }

  const getAuthHeaders = (): HeadersInit => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }
    
    if (mounted) {
      try {
        const userId = localStorage.getItem('userId')
        if (userId) {
          headers['x-user-id'] = userId
        }
        
        if (selectedCompanyId) {
          headers['x-selected-company-id'] = selectedCompanyId
        }
      } catch (error) {
        console.error('Error reading from localStorage:', error)
      }
    }
    
    return headers
  }

  return (
    <AdminContext.Provider value={{ selectedCompanyId, setSelectedCompanyId, getAuthHeaders }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}
