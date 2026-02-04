'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok && data.userId) {
        localStorage.setItem('userId', data.userId)
        localStorage.setItem('userData', JSON.stringify(data.user))
        setTimeout(() => {
          window.location.href = '/admin'
        }, 100)
      } else {
        setError(data.error || 'Giriş yapılırken hata oluştu')
        setLoading(false)
      }
    } catch (error) {
      setError('Giriş yapılırken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row-reverse bg-white">
      {/* Right Side - Visual/Marketing */}
      <div className="hidden md:flex md:w-[45%] bg-[#0a1b3d] relative overflow-hidden items-center justify-center p-12">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="mb-12 inline-block">
            <div className="bg-white rounded-3xl p-8 shadow-2xl transform -rotate-3">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-48 bg-slate-200 rounded"></div>
                  <div className="h-4 w-32 bg-slate-200 rounded"></div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-12 bg-lime-100 rounded-lg"></div>
                    <div className="h-12 bg-blue-100 rounded-lg"></div>
                    <div className="h-12 bg-slate-100 rounded-lg"></div>
                  </div>
                  <div className="h-20 w-full bg-slate-100 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Portföy Yöneticinize Ek Ürün ve Hizmet ya da Yeni Araç Taleplerinizi İletin!
          </h2>
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-2.5 h-2.5 rounded-full bg-white/40"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/40"></div>
          </div>
        </div>
      </div>

      {/* Left Side - Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 relative">
        <div className="w-full max-w-[440px]">
          {/* Logo */}
          <div className="mb-12">
            <Link href="/">
              <Image
                src="/carflex-logo-v2.png"
                alt="CarFlex"
                width={180}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Giriş Yapın</h1>
            <p className="text-slate-500">
              Giriş yapmak için e-posta adresinizi ve şifrenizi girebilirsiniz.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                E-posta
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-slate-200 focus:border-slate-300 outline-none transition-all text-slate-900 placeholder:text-slate-300"
                placeholder="E-Mail Giriniz"
              />
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                Şifre
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-slate-200 focus:border-slate-300 outline-none transition-all text-slate-900 placeholder:text-slate-300"
                  placeholder="Şifre Giriniz"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer" />
                <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors">Beni Hatırla</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#555555] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#444444] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-200 mt-4"
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>

            <div className="text-center pt-4">
              <Link href="#" className="text-[#e33a3a] hover:underline font-semibold text-sm">
                Şifremi Unuttum
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
