'use client'

import { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Clock,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  User,
  Building2,
} from 'lucide-react'
import Link from 'next/link'

export default function Iletisim() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simüle: API'ye gönderim burada yapılabilir
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-lime-100 text-lime-600 rounded-full">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Mesajınız Alındı
          </h1>
          <p className="text-slate-600 mb-10 text-lg leading-relaxed">
            En kısa sürede sizinle iletişime geçeceğiz. Acil bir konunuz varsa 7/24 destek hattımızı arayabilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all"
            >
              Anasayfaya Dön
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+905326555722"
              className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all"
            >
              <Phone className="w-5 h-5" />
              532 655 57 22
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero - site çerçevesiyle uyumlu */}
      <section className="bg-slate-900 py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            İletişim
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Sorularınız, teklif talepleriniz veya iş birliği için bizimle iletişime geçin. Ekibimiz size en kısa sürede dönüş yapacaktır.
          </p>
        </div>
      </section>

      {/* Ana içerik: form + iletişim bilgileri */}
      <section className="py-16 md:py-24 -mt-6 relative z-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_1.2fr]">
              {/* Sol panel: İletişim bilgileri */}
              <div className="bg-lime-400 p-10 md:p-12 text-slate-900">
                <h2 className="text-2xl font-bold mb-8">Bize Ulaşın</h2>

                <div className="space-y-6">
                  <a
                    href="tel:+905326555722"
                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/10 hover:bg-slate-900/20 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">Telefon</p>
                      <p className="text-xl font-bold">532 655 57 22</p>
                      <p className="text-sm opacity-80 mt-0.5">7/24 Destek Hattı</p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@carflex.com.tr"
                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/10 hover:bg-slate-900/20 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">E-posta</p>
                      <p className="font-bold break-all">info@carflex.com.tr</p>
                      <p className="text-sm opacity-80 mt-0.5">Genel bilgi</p>
                    </div>
                  </a>

                  <a
                    href="mailto:teklif@carflex.com.tr"
                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/10 hover:bg-slate-900/20 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">Teklif</p>
                      <p className="font-bold break-all">teklif@carflex.com.tr</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/10">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">Adres</p>
                      <p className="font-bold">Rıhtım Sk. No:8/3</p>
                      <p className="font-bold">Üsküdar, İstanbul</p>
                      <p className="text-sm opacity-80 mt-0.5">Merkez Ofis</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/10">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">Çalışma Saatleri</p>
                      <p className="font-bold">Pzt - Cuma: 09:00 - 18:00</p>
                      <p className="font-bold">Cumartesi: 09:00 - 14:00</p>
                      <p className="text-sm opacity-80 mt-0.5">7/24 Acil Destek</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-900/20">
                  <p className="text-sm font-bold uppercase tracking-wider opacity-70 mb-2">Acil Durum?</p>
                  <a
                    href="tel:+905326555722"
                    className="text-xl font-black hover:underline"
                  >
                    532 655 57 22
                  </a>
                  <p className="text-sm opacity-80 mt-1">Yol yardım ve acil destek 7/24</p>
                </div>
              </div>

              {/* Sağ panel: Form */}
              <div className="p-10 md:p-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Mesaj Gönderin</h2>
                <p className="text-slate-600 mb-8">
                  Formu doldurun, en kısa sürede size dönelim.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                        Ad Soyad *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none transition-all"
                          placeholder="Adınız Soyadınız"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="company" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                        Şirket
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none transition-all"
                          placeholder="Şirket adı (opsiyonel)"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                        E-posta *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none transition-all"
                          placeholder="ornek@sirket.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                        Telefon
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none transition-all"
                          placeholder="05xx xxx xx xx"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                      Mesajınız *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none transition-all resize-none"
                        placeholder="Mesajınızı buraya yazın..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 text-white py-5 rounded-xl font-bold text-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl flex items-center justify-center gap-3 mt-2"
                  >
                    {loading ? (
                      <>
                        <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        Mesaj Gönder
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
