'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, TrendingUp, FileText, Bell, Calendar, Shield, Users } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const slides = [
    {
      icon: TrendingUp,
      title: 'Anlık Filo Takibi',
      description: 'Tüm araçlarınızın konumunu, durumunu ve kullanım bilgilerini anlık olarak takip edin. Detaylı raporlarla filonuzu optimize edin.',
      features: ['Canlı konum takibi', 'Kullanım analizi', 'Maliyet raporları']
    },
    {
      icon: FileText,
      title: 'Dijital Belge Yönetimi',
      description: 'Sigorta, muayene, bakım kayıtları ve tüm belgeleri tek platformda yönetin. Otomatik hatırlatmalarla hiçbir süreyi kaçırmayın.',
      features: ['Merkezi belge arşivi', 'Süre takibi', 'Otomatik bildirimler']
    },
    {
      icon: Calendar,
      title: 'Bakım ve Servis Planlaması',
      description: 'Periyodik bakımları planlayın, servis randevularını yönetin. Araç ömrünü uzatın, maliyetleri düşürün.',
      features: ['Bakım takvimi', 'Servis geçmişi', 'İkame araç yönetimi']
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

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
      {/* Right Side - Fleet Management Features Slideshow */}
      <div className="hidden md:flex md:w-[60%] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden items-center justify-center p-12">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>
        
        <div className="relative z-10 w-full max-w-lg">
          {/* Slides */}
          <div className="relative min-h-[500px]">
            {slides.map((slide, index) => {
              const Icon = slide.icon
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    activeSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-lime-400 rounded-2xl mb-6">
                      <Icon className="w-8 h-8 text-slate-900" />
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-3xl font-bold text-white mb-4">
                      {slide.title}
                    </h2>
                    
                    {/* Description */}
                    <p className="text-slate-300 text-lg leading-relaxed mb-8">
                      {slide.description}
                    </p>
                    
                    {/* Features list */}
                    <div className="space-y-3">
                      {slide.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-lime-400"></div>
                          <span className="text-white font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Slide indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  activeSlide === index ? 'w-8 bg-lime-400' : 'w-2 bg-white/30'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
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
