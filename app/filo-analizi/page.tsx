'use client'

import { useState } from 'react'
import { 
  Send, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Car,
  MapPin,
  Calendar,
  Gauge,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Leaf,
  TrendingDown,
  BatteryCharging
} from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export default function FiloAnalizi() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simüle edilmiş form gönderimi
    setTimeout(() => {
      setLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-lime-100 text-lime-600 rounded-full">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Analiz Talebiniz Alındı!</h1>
          <p className="text-slate-600 mb-10 text-lg">
            Filo analiz uzmanlarımız mevcut verilerinizi inceleyerek elektrikli araç dönüşüm potansiyelinizi değerlendirecek ve en kısa sürede detaylı raporu size iletecektir.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all"
          >
            Anasayfaya Dön
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="bg-slate-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-lime-400/10 text-lime-400 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6 border border-lime-400/20">
            <BatteryCharging className="w-4 h-4" />
            Ücretsiz Filo Analizi
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Elektrikli Araç Dönüşüm Analizi</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Filonuzun elektrikli araçlara geçiş potansiyelini öğrenin. Tasarruf hesaplamalarını ve dönüşüm yol haritanızı ücretsiz alın.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
              <div className="w-12 h-12 bg-lime-100 text-lime-600 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Detaylı Rapor</h3>
              <p className="text-slate-600 text-sm">Mevcut filo maliyetleriniz ve elektrikli geçiş senaryoları</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
              <div className="w-12 h-12 bg-lime-100 text-lime-600 rounded-xl flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Tasarruf Hesabı</h3>
              <p className="text-slate-600 text-sm">Yakıt, bakım ve operasyonel maliyet karşılaştırması</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
              <div className="w-12 h-12 bg-lime-100 text-lime-600 rounded-xl flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Çevre Etkisi</h3>
              <p className="text-slate-600 text-sm">Karbon emisyon azaltımı ve sürdürülebilirlik metrikleri</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
            <div className="grid md:grid-cols-[1fr_1.5fr]">
              {/* Left Info Panel */}
              <div className="bg-gradient-to-br from-lime-400 to-lime-500 p-10 md:p-12 text-slate-900">
                <h3 className="text-2xl font-bold mb-8">Analizde Neler Var?</h3>
                <ul className="space-y-6">
                  {[
                    'Mevcut Filo Maliyet Analizi',
                    'Elektrikli Geçiş ROI Hesabı',
                    'Şarj Altyapısı Planlaması',
                    'Model Önerileri',
                    'Teşvik ve Vergi Avantajları'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 font-semibold leading-relaxed">
                      <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-16 pt-8 border-t border-slate-900/10 space-y-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider opacity-60 mb-2">Elektrikli Araç Danışma</p>
                    <a href="tel:+905326555722" className="text-2xl font-black hover:text-slate-900/80 transition-colors">532 655 57 22</a>
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider opacity-60 mb-2">Analiz E-posta</p>
                    <a href="mailto:analiz@carflex.com.tr" className="text-lg font-black hover:text-slate-900/80 transition-colors break-all">analiz@carflex.com.tr</a>
                  </div>
                </div>
              </div>

              {/* Form Panel */}
              <div className="p-10 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Ad Soyad</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                          required
                          type="text" 
                          placeholder="Adınız Soyadınız"
                          className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-lime-400 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Şirket İsmi</label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                          required
                          type="text" 
                          placeholder="Şirket Ünvanı"
                          className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-lime-400 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">E-posta</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                          required
                          type="email" 
                          placeholder="kurumsal@sirket.com"
                          className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-lime-400 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Telefon</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                          required
                          type="tel" 
                          placeholder="05xx xxx xx xx"
                          className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-lime-400 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Mevcut Araç Sayısı</label>
                      <div className="relative">
                        <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <select 
                          required
                          className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-lime-400 outline-none transition-all appearance-none"
                        >
                          <option value="">Seçiniz</option>
                          <option>1-5 Araç</option>
                          <option>6-15 Araç</option>
                          <option>16-50 Araç</option>
                          <option>50+ Araç</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Ortalama Günlük KM</label>
                      <div className="relative">
                        <Gauge className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <select 
                          required
                          className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-lime-400 outline-none transition-all appearance-none"
                        >
                          <option value="">Seçiniz</option>
                          <option>0-50 km</option>
                          <option>50-100 km</option>
                          <option>100-200 km</option>
                          <option>200+ km</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Kullanım Bölgesi</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <select 
                          required
                          className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-lime-400 outline-none transition-all appearance-none"
                        >
                          <option value="">Seçiniz</option>
                          <option>Şehir İçi</option>
                          <option>Şehirlerarası</option>
                          <option>Karma</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Planlanan Geçiş Süresi</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <select 
                          required
                          className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-lime-400 outline-none transition-all appearance-none"
                        >
                          <option value="">Seçiniz</option>
                          <option>0-3 ay içinde</option>
                          <option>3-6 ay içinde</option>
                          <option>6-12 ay içinde</option>
                          <option>Araştırma aşamasında</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 text-white py-5 rounded-xl font-bold text-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl flex items-center justify-center gap-3 mt-6"
                  >
                    {loading ? 'Gönderiliyor...' : 'Ücretsiz Analiz İste'}
                    <Send className="w-5 h-5" />
                  </button>

                  <p className="text-xs text-slate-500 text-center mt-4">
                    Bilgileriniz gizli tutulacak ve yalnızca analiz amacıyla kullanılacaktır.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
