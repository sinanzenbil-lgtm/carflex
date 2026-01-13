'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { 
  Car, 
  FileText, 
  Building2, 
  CreditCard, 
  Calendar, 
  Wrench, 
  Receipt,
  Home,
  LogOut,
  ChevronDown
} from 'lucide-react'
import { AdminProvider, useAdmin } from './context/AdminContext'

const menuItems = [
  { href: '/admin/vehicles', label: 'Araçlar', icon: Car },
  { href: '/admin/rentals', label: 'Kiralamalar', icon: FileText },
  { href: '/admin/companies', label: 'Cariler', icon: Building2 },
  { href: '/admin/payments', label: 'Tahsilat', icon: Receipt },
  { href: '/admin/hgs', label: 'HGS Geçişleri', icon: CreditCard },
  { href: '/admin/finance', label: 'Finansal Yönetim', icon: Calendar },
  { href: '/admin/services', label: 'SSH', icon: Wrench },
]

interface User {
  id: string
  email: string
  name: string | null
  companyName: string | null
  taxId: string | null
  phone: string | null
  logoUrl: string | null
  role: string
}

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { selectedCompanyId, setSelectedCompanyId } = useAdmin()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [companies, setCompanies] = useState<User[]>([])
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false)

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    // Admin ise firmaları yükle
    if (user && user.role === 'super_admin') {
      fetchCompanies()
    }
  }, [user])

  useEffect(() => {
    // Dropdown dışına tıklandığında kapat
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.company-dropdown-container')) {
        setShowCompanyDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchCompanies = async () => {
    try {
      const res = await fetch('/api/users', {
        credentials: 'include',
      })
      if (res.ok) {
        const data = await res.json()
        setCompanies(data)
      }
    } catch (error) {
      console.error('Error fetching companies:', error)
    }
  }

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompanyId(companyId || null)
    setShowCompanyDropdown(false)
    // Sayfayı yenile
    window.location.reload()
  }

  const fetchUser = async () => {
    try {
      // Client-side'da localStorage'a eriş
      if (typeof window === 'undefined') {
        setLoading(false)
        return
      }

      // Önce localStorage'dan user data'yı kontrol et
      try {
        const storedUserData = localStorage.getItem('userData')
        if (storedUserData) {
          try {
            const userData = JSON.parse(storedUserData)
            console.log('✅ User data found in localStorage:', userData)
            setUser(userData)
            setLoading(false)
            return
          } catch (e) {
            console.error('Error parsing stored user data:', e)
          }
        }
      } catch (error) {
        console.error('Error reading from localStorage:', error)
      }
      
      // localStorage'dan userId'yi al
      let userId: string | null = null
      try {
        userId = localStorage.getItem('userId')
        console.log('Admin layout - localStorage userId:', userId)
      } catch (error) {
        console.error('Error reading userId from localStorage:', error)
      }
      
      if (!userId) {
        console.log('❌ No userId in localStorage, redirecting to login')
        router.push('/login')
        setLoading(false)
        return
      }
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }
      
      // Eğer localStorage'da userId varsa, header'a ekle
      headers['x-user-id'] = userId
      console.log('Sending userId in header:', userId)
      
      console.log('Fetching /api/auth/me...')
      const res = await fetch('/api/auth/me', {
        credentials: 'include',
        cache: 'no-store',
        headers,
      })
      
      console.log('Response status:', res.status)
      
      if (res.ok) {
        const data = await res.json()
        console.log('✅ User data received:', data.user)
        // localStorage'a da kaydet
        try {
          localStorage.setItem('userData', JSON.stringify(data.user))
        } catch (error) {
          console.error('Error writing to localStorage:', error)
        }
        setUser(data.user)
      } else {
        const errorData = await res.json().catch(() => ({}))
        console.error('❌ Auth failed:', errorData)
        // localStorage'ı temizle
        try {
          localStorage.removeItem('userId')
          localStorage.removeItem('userData')
        } catch (error) {
          console.error('Error clearing localStorage:', error)
        }
        console.log('Auth failed, redirecting to login')
        router.push('/login')
      }
    } catch (error) {
      console.error('❌ Error fetching user:', error)
      try {
        localStorage.removeItem('userId')
        localStorage.removeItem('userData')
      } catch (e) {
        console.error('Error clearing localStorage:', e)
      }
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    // localStorage'ı temizle
    try {
      localStorage.removeItem('userId')
      localStorage.removeItem('userData')
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
    await fetch('/api/auth/logout', { 
      method: 'POST',
      credentials: 'include',
    })
    window.location.href = '/login'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <Link href="/admin" className="flex items-center justify-center w-full">
              {user.logoUrl && user.logoUrl.trim() !== '' ? (
                <div className="w-full flex items-center justify-center">
                  <img 
                    src={user.logoUrl} 
                    alt={user.companyName || 'Logo'} 
                    className="max-h-32 w-auto h-auto" 
                    style={{ 
                      objectFit: 'contain', 
                      imageRendering: 'auto',
                      display: 'block',
                      maxWidth: '100%',
                      width: 'auto',
                      height: 'auto'
                    }}
                    onError={(e) => {
                      console.error('Logo yüklenemedi')
                      const target = e.currentTarget
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent) {
                        parent.innerHTML = `
                          <div class="flex flex-col items-center w-full">
                            <div class="flex items-center mb-2">
                              <span class="text-2xl font-bold text-gray-800">Carfle</span>
                              <span class="text-2xl font-bold text-lime-400">X</span>
                            </div>
                            <span class="text-sm font-semibold text-gray-600">${user.companyName || 'CarFlex Admin'}</span>
                          </div>
                        `
                      }
                    }}
                    onLoad={() => {
                      console.log('Logo başarıyla yüklendi')
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center w-full">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-bold text-gray-800">Carfle</span>
                    <span className="text-2xl font-bold text-lime-400 relative">
                      X
                      <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="w-full h-0.5 bg-lime-400 opacity-50 transform rotate-45"></span>
                        <span className="w-full h-0.5 bg-lime-400 opacity-50 transform -rotate-45 absolute"></span>
                      </span>
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-600">
                    {user.companyName || 'CarFlex Admin'}
                  </span>
                </div>
              )}
            </Link>
          </div>
          
          <div className="p-4 border-b border-gray-200">
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-800">{user.name || user.email}</p>
              <p className="text-xs mt-1 text-gray-500">{user.email}</p>
            </div>
            {user.role === 'super_admin' && (
              <div className="mt-4 company-dropdown-container">
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Firma Seç
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCompanyDropdown(!showCompanyDropdown)}
                    className="w-full px-3 py-2 text-left text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50 flex items-center justify-between text-gray-900"
                  >
                    <span className="truncate">
                      {selectedCompanyId 
                        ? companies.find(c => c.id === selectedCompanyId)?.companyName || 'Firma Seçin'
                        : 'Tüm Firmalar'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  {showCompanyDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <div
                        onClick={() => handleCompanySelect('')}
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${
                          !selectedCompanyId ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-900'
                        }`}
                      >
                        Tüm Firmalar (Admin Görünümü)
                      </div>
                      {companies.map((company) => (
                        <div
                          key={company.id}
                          onClick={() => handleCompanySelect(company.id)}
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${
                            selectedCompanyId === company.id ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-900'
                          }`}
                        >
                          <div className="font-medium">{company.companyName}</div>
                          {company.taxId && (
                            <div className="text-xs text-gray-500">Vergi No: {company.taxId}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <nav className="p-4">
            <Link
              href="/admin"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                pathname === '/admin'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname?.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
          
          <div className="p-4 border-t border-gray-200 mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-gray-700 hover:bg-gray-100 transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-white">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProvider>
  )
}
