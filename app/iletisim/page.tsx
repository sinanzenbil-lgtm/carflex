'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react'

export default function Iletisim() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic here
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">İletişim</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Sorularınız, önerileriniz veya rezervasyon talepleriniz için bizimle iletişime geçin
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Bize Ulaşın</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    placeholder="ornek@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    placeholder="+90 (5XX) XXX XX XX"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-gray-700 font-medium mb-2">
                    Şirket
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    placeholder="Şirket adı (opsiyonel)"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Mesajınız *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-lime-500 text-white px-6 py-4 rounded-lg font-semibold hover:bg-lime-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {submitted ? 'Mesaj Gönderildi!' : 'Mesaj Gönder'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">İletişim Bilgileri</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="bg-lime-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-lime-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Telefon</h3>
                    <a href="tel:+902121234567" className="text-gray-700 hover:text-lime-600 transition-colors">
                      +90 (212) 123 45 67
                    </a>
                    <p className="text-sm text-gray-500 mt-1">7/24 Destek Hattı</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="bg-lime-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-lime-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">E-posta</h3>
                    <a href="mailto:info@carflex.com.tr" className="text-gray-700 hover:text-lime-600 transition-colors">
                      info@carflex.com.tr
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Genel bilgi için</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="bg-lime-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-lime-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Adres</h3>
                    <p className="text-gray-700">
                      İstanbul, Türkiye
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Merkez Ofis</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="bg-lime-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-lime-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Çalışma Saatleri</h3>
                    <p className="text-gray-700">
                      Pazartesi - Cuma: 09:00 - 18:00
                    </p>
                    <p className="text-gray-700">
                      Cumartesi: 09:00 - 14:00
                    </p>
                    <p className="text-sm text-gray-500 mt-1">7/24 Acil Destek Mevcut</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-lime-50 to-blue-50 p-6 rounded-xl border border-lime-200">
                <h3 className="font-semibold text-slate-900 mb-2">Acil Durum?</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Yol yardım veya acil durumlar için 7/24 hizmet veren destek hattımızı arayın.
                </p>
                <a 
                  href="tel:+902121234567" 
                  className="text-lime-600 font-semibold hover:text-lime-700 transition-colors"
                >
                  +90 (212) 123 45 67
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
