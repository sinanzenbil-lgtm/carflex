import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  Calendar,
  Clock,
  Car,
  Shield,
  ArrowRight,
  BatteryCharging,
  CheckCircle,
  TrendingUp,
  Award,
  Users,
  Settings,
  FileText,
  Activity,
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Hizmetlerimiz',
  description:
    'Uzun dönem filo kiralama, kısa dönem destek, elektrikli araç programı ve operasyonel filo yönetimi hizmetlerini keşfedin.',
  path: '/hizmetlerimiz',
  keywords: [
    'filo kiralama hizmetleri',
    'uzun dönem kiralama',
    'kısa dönem araç kiralama',
    'operasyonel filo yönetimi',
  ],
})

const mainServices = [
  {
    id: 'uzun-donem',
    title: 'Uzun Dönem Filo Kiralama',
    desc: 'İşletmenizin düzenli araç ihtiyacını sabit bütçeyle karşılayın. 6-48 ay arası kiralama seçenekleri, tek sözleşme yönetimi ve operasyonel kolaylık.',
    features: [
      'Sabit aylık bütçe ve maliyet kontrolü',
      'Bakım, lastik, muayene ve sigorta yönetimi',
      'İkame araç ve 7/24 yol yardım',
      'Vergi ve sözleşme takibi',
      'Dijital raporlama ve filo görünürlüğü',
      'Kurumunuza özel araç seçimi',
    ],
    icon: Calendar,
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1000',
    iconBg: 'bg-lime-500',
    iconColor: 'text-white',
  },
  {
    id: 'elektrikli',
    title: 'Elektrikli Araç Programı',
    desc: 'Elektrikli araçlara geçiş sürecinizi veriye dayalı analizlerle planlıyor, uygun model seçimi ve şarj altyapısı danışmanlığıyla sürdürülebilir filolar kuruyoruz.',
    features: [
      'Kullanım senaryosu ve menzil analizi',
      'Araç ve donanım önerileri',
      'Şarj altyapısı ve lokasyon planı',
      'Enerji maliyeti ve tasarruf raporu',
      'Sürdürülebilirlik KPI takibi',
      'Elektrikli filo geçiş yol haritası',
    ],
    icon: BatteryCharging,
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1000',
    iconBg: 'bg-blue-500',
    iconColor: 'text-white',
  },
  {
    id: 'kisa-donem',
    title: 'Kısa Dönem Destek',
    desc: 'Proje, sezon veya geçici ihtiyaçlar için günlük ve haftalık kiralama. Hızlı teslim, esnek sözleşme, net fiyatlandırma.',
    features: [
      'Günlük ve haftalık kiralama',
      'Hızlı teklif ve teslim',
      'Esnek sözleşme koşulları',
      'Kurumsal fiyatlandırma',
      'Online rezervasyon',
      'Sahada teslim / iade',
    ],
    icon: Clock,
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000',
    iconBg: 'bg-slate-700',
    iconColor: 'text-white',
  },
]

const additionalServices = [
  { title: 'Periyodik Bakım', desc: 'Planlı bakım takvimleriyle araçlarınızın performansını yüksek tutuyoruz.', icon: Calendar },
  { title: 'Hasar Yönetimi', desc: 'Kaza/hasar süreçlerini hızlıca yönetir, evrak işlerini takip ederiz.', icon: Shield },
  { title: '7/24 Acil Yardım', desc: 'Acil durumlarda tek hat üzerinden yol yardım desteği sağlıyoruz.', icon: Clock },
  { title: 'İkame Araç', desc: 'Aracınız servisteyken operasyonun aksamaması için muadil araç temini.', icon: Car },
  { title: 'Lastik Değişimi', desc: 'Mevsimsel lastik değişimleri ve kontroller tek merkezden planlanır.', icon: TrendingUp },
  { title: 'Muayene Takibi', desc: 'Muayene tarihlerini takip eder, tüm hazırlık süreçlerini yönetiriz.', icon: Award },
  { title: 'Kasko ve Sigorta', desc: 'Zorunlu trafik sigortası ve kasko süreçlerini kurumsal standartlarda yönetiyoruz.', icon: Shield },
  { title: 'Profesyonel Danışmanlık', desc: 'Filo seçimi ve maliyet optimizasyonu için uzman desteği sunarız.', icon: Users },
  { title: 'HGS/OGS ve Ceza Takibi', desc: 'Tüm geçiş ve ceza süreçlerini dijital olarak takip eder ve yönetiriz.', icon: FileText },
  { title: 'Dijital Raporlama', desc: 'Filo kullanım detaylarını ve maliyet analizlerini anlık raporlarla sunuyoruz.', icon: Activity },
  { title: 'CarflexNet Yönetimi', desc: 'Özel yazılımımız ile tüm filo süreçlerini tek merkezden yönetin.', icon: Settings },
]

export default function Hizmetlerimiz() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero - Teklif-al / site çerçevesiyle uyumlu */}
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
            Hizmetlerimiz
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Filo yönetiminde tam kapsamlı çözümler: uzun ve kısa dönem kiralama, elektrikli araç programı ve operasyonel destek.
          </p>
        </div>
      </section>

      {/* Ana hizmetler - alternatif 2 sütun, anasayfa kart dili */}
      {mainServices.map((service, idx) => (
        <section
          key={service.id}
          className={`py-20 ${idx % 2 === 1 ? 'bg-slate-50' : 'bg-white'}`}
          id={service.id}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div
                  className={`inline-flex p-4 rounded-2xl ${service.iconBg} ${service.iconColor} mb-6 shadow-lg`}
                >
                  <service.icon className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  {service.title}
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {service.desc}
                </p>
                <ul className="space-y-3 mb-10">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-lime-500 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/teklif-al"
                  className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                >
                  Teklif Al
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="relative">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={800}
                    height={500}
                    className="w-full h-[380px] md:h-[450px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Kiralama kapsamındaki hizmetler - anasayfa Kiralama Hizmetlerimiz grid yapısı */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Kiralama Kapsamındaki Hizmetlerimiz
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Operasyonel süreçlerinizi kolaylaştıran, her adımda yanınızda olan kapsamlı hizmet setimiz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {additionalServices.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 p-6 bg-white hover:shadow-lg transition-all duration-300 hover:border-lime-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-900 text-white rounded-xl p-3 flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA - teklif-al / anasayfa CTA ile aynı çerçeve */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto relative bg-slate-900 rounded-[3rem] p-12 md:p-20 overflow-hidden text-center shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full -ml-32 -mb-32 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              İşletmenize Özel Filo Çözümü İçin Hazırız
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              Uzman danışmanlarımızla iletişime geçin, firmanızın ihtiyaçlarına en uygun kiralama modelini birlikte kurgulayalım.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/teklif-al"
                className="inline-flex items-center justify-center gap-2 bg-lime-400 text-slate-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-lime-300 transition-all shadow-lg shadow-lime-400/30"
              >
                Hemen Teklif Al
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="tel:+905326555722"
                className="inline-flex items-center justify-center bg-white/10 backdrop-blur text-white border border-white/20 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                Bizi Arayın
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
