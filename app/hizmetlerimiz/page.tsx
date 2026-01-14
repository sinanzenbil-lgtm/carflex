import Link from 'next/link'
import { Calendar, Clock, Building2, Car, Shield, Headphones, CreditCard, FileText, ArrowRight } from 'lucide-react'

export default function Hizmetlerimiz() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Hizmetlerimiz</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              İşletmenizin ihtiyaçlarına özel, kapsamlı araç kiralama çözümleri
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white" id="uzun-donem">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="bg-lime-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-lime-600" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Uzun Dönem Kiralama</h2>
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                İşletmenizin sürekli araç ihtiyacını karşılamak için ideal çözüm. Aylık ve 
                yıllık kiralama seçenekleriyle, esnek ödeme planları ve özel filo yönetimi hizmetleri.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Aylık ve yıllık kiralama seçenekleri',
                  'Esnek ödeme planları',
                  'Özel filo yönetimi',
                  'Bakım ve onarım hizmetleri',
                  'Yedek araç garantisi',
                  'Özel fiyatlandırma'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-lime-400 rounded-full p-1 mt-1 flex-shrink-0">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/vehicles?type=long-term"
                className="inline-flex items-center gap-2 bg-lime-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-lime-600 transition-colors"
              >
                Araçları Görüntüle
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-lime-50 to-blue-50 p-12 rounded-2xl border border-lime-200">
              <div className="text-center">
                <div className="text-5xl font-bold text-lime-600 mb-2">%30'a varan</div>
                <div className="text-2xl text-gray-700 mb-4">İndirim Fırsatları</div>
                <p className="text-gray-600">
                  Uzun dönem kiralama için özel fiyatlandırma ve indirim seçenekleri
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center" id="kisa-donem">
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-12 rounded-2xl border border-blue-200 order-2 md:order-1">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">24 Saat</div>
                <div className="text-2xl text-gray-700 mb-4">İçinde Onay</div>
                <p className="text-gray-600">
                  Hızlı onay süreci ile kısa sürede araç kiralama
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Kısa Dönem Kiralama</h2>
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                Günlük, haftalık veya aylık kısa süreli araç kiralama hizmetleri. 
                Hızlı onay süreci, esnek kiralama koşulları ve uygun fiyatlar.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Günlük, haftalık, aylık kiralama',
                  'Hızlı onay süreci',
                  'Esnek kiralama koşulları',
                  'Uygun fiyatlar',
                  'Online rezervasyon',
                  'Anında onay'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-blue-400 rounded-full p-1 mt-1 flex-shrink-0">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/vehicles?type=short-term"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Araçları Görüntüle
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50" id="kurumsal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Ek Hizmetlerimiz</h2>
            <p className="text-xl text-gray-600">
              Size özel çözümler ve destek hizmetleri
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: 'Kurumsal Çözümler',
                description: 'Büyük işletmeler için özel filo yönetimi, toplu kiralama ve özel fiyatlandırma seçenekleri.',
                color: 'lime'
              },
              {
                icon: Car,
                title: 'Filo Yönetimi',
                description: 'Araçlarınızın bakım, onarım, sigorta ve yönetim işlemlerini biz üstleniyoruz.',
                color: 'blue'
              },
              {
                icon: Shield,
                title: 'Tam Sigorta',
                description: 'Tüm araçlarımız kapsamlı sigorta ile korunmaktadır. Ekstra güvence için tam sigorta seçeneği.',
                color: 'lime'
              },
              {
                icon: Headphones,
                title: '7/24 Destek',
                description: 'Yol yardım, acil durum ve müşteri desteği için 7/24 hizmetinizdeyiz.',
                color: 'blue'
              },
              {
                icon: CreditCard,
                title: 'Esnek Ödeme',
                description: 'Nakit, kredi kartı, banka transferi ve kurumsal ödeme seçenekleri.',
                color: 'lime'
              },
              {
                icon: FileText,
                title: 'Online Rezervasyon',
                description: 'Kolay ve hızlı online rezervasyon sistemi ile istediğiniz zaman araç kiralayın.',
                color: 'blue'
              }
            ].map((service, index) => {
              const Icon = service.icon
              const bgColor = service.color === 'lime' ? 'bg-lime-100' : 'bg-blue-100'
              const iconColor = service.color === 'lime' ? 'text-lime-600' : 'text-blue-600'
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                  <div className={`${bgColor} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                    <Icon className={`w-8 h-8 ${iconColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Size Özel Çözüm İster misiniz?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Uzman ekibimiz size en uygun kiralama çözümünü hazırlamak için hazır.
            </p>
            <Link
              href="/iletisim"
              className="inline-block bg-lime-400 text-slate-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-lime-300 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-lime-400/50"
            >
              Hemen İletişime Geç
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
