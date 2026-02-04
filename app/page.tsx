'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { blogPosts } from '@/lib/blog'
import { Car, Calendar, Shield, Clock, CheckCircle, ArrowRight, Star, Users, Award, TrendingUp, BatteryCharging } from 'lucide-react'

export default function Home() {
  const latestPosts = [...blogPosts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 4)
  const slides = [
    {
      title: 'Elektrikli Araçlara Özel Filo Programı',
      description: 'Menzil analizi, şarj planlama, enerji maliyeti raporları ve sürdürülebilirlik hedefleri için uçtan uca destek. Doğru araç seçimiyle performans ve verimliliği artırın.',
      image: '/slide-3.png',
      imageAlt: 'Elektrikli araç programı görseli',
      link: '/elektrikli-araclar',
      buttonText: 'Programı İncele'
    },
    {
      title: 'Kurumsal Kiralamada En Ekonomik Araçlar',
      description: 'İhtiyacınıza uygun segmentlerde, toplam maliyeti optimize eden araçlarla bütçenizi koruyoruz. Sabit aylık ödeme, şeffaf fiyatlandırma, bakım ve sigorta süreçleri tek sözleşme altında yönetilir.',
      image: '/slide-1.png',
      imageAlt: 'Kurumsal ekonomik araç görseli',
      link: '/teklif-al',
      buttonText: 'Teklif Al'
    },
    {
      title: 'Araç Kiralamak Hiç Bu Kadar Kolay Olmamıştı',
      description: 'Teklif isteyin, onaylayın ve aracınızı teslim alın. Dijital sözleşme, hızlı süreç ve tek noktadan yönetim ile zaman kaybetmeden filonuzu büyütün.',
      image: '/slide-4-v4.png',
      imageAlt: 'Kolay kiralama görseli',
      link: '/teklif-al',
      buttonText: 'Teklif Al'
    }
  ]
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="relative bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="relative text-slate-900 overflow-hidden -mt-4">
          <div className="px-6 md:px-8 -mt-6 relative z-10">
            <div className="text-center md:text-left">
              <div className="relative min-h-[520px] md:min-h-[460px]">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`transition-opacity duration-700 ${
                      activeSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    style={{ position: activeSlide === index ? 'relative' : 'absolute', inset: 0 }}
                  >
                    <div className="grid md:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center w-full">
                      <div className="flex justify-start">
                        <Image
                          src={slide.image}
                          alt={slide.imageAlt}
                          width={760}
                          height={420}
                          className="w-full h-96 md:h-[480px] object-contain object-left"
                          priority={index === 0}
                        />
                      </div>
                      <div className="min-h-[280px] text-left relative z-20">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 leading-[1.1] tracking-tight">
                          {slide.title}
                        </h1>
                        <p className="text-base lg:text-lg text-slate-600 mb-10 max-w-xl leading-relaxed font-medium">
                          {slide.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-start items-center">
                          <Link
                            href="/login"
                            target="_blank"
                            className="group bg-lime-400 text-slate-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-lime-300 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-lime-400/50 flex items-center gap-2"
                          >
                            {slide.buttonText || 'Online İşlemler'}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                          <Link
                            href="/teklif-al"
                            className="bg-slate-900 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-slate-800 transition-all duration-300 border border-slate-900"
                          >
                            Teklif Al
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 mb-2 flex items-center justify-center md:justify-start gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      activeSlide === index ? 'w-10 bg-lime-500' : 'w-2.5 bg-gray-300'
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* Rental Services Section */}
        <section className="bg-white pt-10 pb-20 border-y border-gray-200">
          <div className="px-6 md:px-8">
            <div className="grid lg:grid-cols-[360px_1fr] gap-12 items-start">
              <div className="lg:sticky lg:top-24">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4 mb-4">
                  Kiralama Hizmetlerimiz
                </h2>
                <p className="text-lg text-gray-600">
                  Saha operasyonlarını azaltan, maliyeti öngörülebilir kılan hizmet seti.
                </p>
                <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-gray-200">
                  <div className="text-sm text-gray-500">Tek merkezden yönetim</div>
                  <div className="text-2xl font-semibold text-slate-900 mt-1">
                    7/24 Operasyon Desteği
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {[
                  {
                    title: 'Periyodik Bakım',
                    description: 'Planlı bakım takvimleriyle araçlarınızın performansını ve güvenliğini sürekli yüksek tutuyoruz.',
                    icon: Calendar
                  },
                  {
                    title: 'Hasar Yönetimi',
                    description: 'Kaza/hasar süreçlerini hızlıca yönetir, onarım ve evrak işlerini sizin yerinize takip ederiz.',
                    icon: Shield
                  },
                  {
                    title: '7/24 Acil Yardım',
                    description: 'Acil durumlarda tek hat üzerinden yol yardım ve destek hizmeti sağlıyoruz.',
                    icon: Clock
                  },
                  {
                    title: 'İkame Araç',
                    description: 'Aracınız servisteyken operasyonun aksamaması için muadil araç temin ederiz.',
                    icon: Car
                  },
                  {
                    title: 'Lastik Değişimi',
                    description: 'Mevsimsel lastik değişimleri ve gerekli kontroller tek merkezden planlanır.',
                    icon: TrendingUp
                  },
                  {
                    title: 'Muayene',
                    description: 'Muayene tarihlerini takip eder, randevu ve hazırlık süreçlerini yönetiriz.',
                    icon: Award
                  },
                  {
                    title: 'Kasko ve Sigorta',
                    description: 'Zorunlu trafik sigortası ve kasko süreçlerini kurumsal standartlarda yönetiyoruz.',
                    icon: Shield
                  },
                  {
                    title: 'Profesyonel Danışmanlık',
                    description: 'Filo seçimi, maliyet optimizasyonu ve kullanım politikaları için uzman desteği sunarız.',
                    icon: Users
                  },
                  {
                    title: 'HGS/OGS ve Ceza Takibi',
                    description: 'Tüm geçiş ve ceza süreçlerini dijital olarak takip eder, raporlar ve yönetiriz.',
                    icon: Shield
                  },
                  {
                    title: 'Dijital Raporlama',
                    description: 'Filo kullanım detaylarını ve maliyet analizlerini anlık raporlarla sunuyoruz.',
                    icon: TrendingUp
                  },
                  {
                    title: 'CarflexNet Filo Yönetimi',
                    description: 'Özel yazılımımız ile tüm filo süreçlerini tek merkezden, uçtan uca yönetin.',
                    icon: BatteryCharging
                  }
                ].map((service, index) => {
                  const Icon = service.icon
                  return (
                    <div key={index} className="rounded-2xl border border-gray-200 p-5 bg-white hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="bg-slate-900 text-white rounded-xl p-3">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">{service.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -left-16 h-96 w-96 rounded-full bg-lime-100/50 blur-[100px]"></div>
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-blue-100/50 blur-[100px]"></div>
          
          <div className="px-6 md:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
              Kurumsal Filo <span className="text-lime-500">Çözümlerimiz</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Maliyetlerinizi öngörülebilir hale getiren, operasyon yükünü azaltan ve işletmenize değer katan profesyonel kiralama modelleri.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: 'Uzun Dönem Filo Kiralama',
                desc: '6-48 ay arası kiralama seçenekleriyle sabit aylık bütçe, planlı bakım ve tek sözleşme yönetimi.',
                icon: Calendar,
                link: '/hizmetlerimiz#uzun-donem',
                color: 'lime'
              },
              {
                title: 'Kısa Dönem Destek',
                desc: 'Proje, sezon veya geçici ihtiyaçlar için günlük-haftalık çözümler. Hızlı teklif ve anında teslimat.',
                icon: Clock,
                link: '/hizmetlerimiz#kisa-donem',
                color: 'slate'
              },
              {
                title: 'Elektrikli Dönüşüm',
                desc: 'Elektrikli araçlara geçiş için analiz, araç seçimi ve şarj planı desteği. Sürdürülebilir gelecek için.',
                icon: BatteryCharging,
                link: '/hizmetlerimiz#elektrikli',
                color: 'blue'
              }
            ].map((item, idx) => (
              <div key={idx} className="group relative bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-16 -mt-16 transition-all duration-500 group-hover:bg-lime-50 group-hover:scale-150 opacity-50"></div>
                <div className={`relative mb-8 inline-flex p-4 rounded-2xl bg-slate-50 text-slate-600 group-hover:bg-lime-500 group-hover:text-white transition-all duration-500 shadow-sm`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="relative text-2xl font-bold text-slate-900 mb-4 group-hover:text-lime-600 transition-colors">
                  {item.title}
                </h3>
                <p className="relative text-slate-600 leading-relaxed mb-8">
                  {item.desc}
                </p>
                <Link
                  href={item.link}
                  className="relative inline-flex items-center gap-2 font-bold text-slate-900 hover:text-lime-600 transition-colors group/link"
                >
                  Hizmeti İncele
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover/link:bg-lime-500 group-hover/link:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Why Choose Us */}
          <div className="relative bg-slate-900 p-12 md:p-16 rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">CarFlex Avantajları</h3>
                  <p className="text-slate-400 text-lg max-w-xl">
                    Operasyonel süreçlerinizi kolaylaştıran, her adımda yanınızda olan kapsamlı hizmet seti.
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-2xl border border-white/10">
                    <span className="text-lime-400 font-bold text-2xl">9+</span>
                    <span className="text-white/60 ml-2">Temel Avantaj</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                {[
                  'Hızlı teklif ve sözleşme',
                  'Kolay araç kiralama',
                  'Sürpriz faturalar yok',
                  'CarflexNet Filo Yönetimi',
                  'Kesintisiz 7/24 müşteri memnuniyeti',
                  'Sabit aylık bütçe ve maliyet kontrolü',
                  'Kurumsal müşteri temsilcisi',
                  'Dijital raporlama ve takip',
                  'Türkiye geneli servis ağı'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="bg-lime-400/20 rounded-xl p-2 group-hover:bg-lime-400 transition-colors duration-300">
                      <CheckCircle className="w-5 h-5 text-lime-400 group-hover:text-slate-900 transition-colors duration-300" />
                    </div>
                    <span className="text-slate-300 font-medium text-lg leading-tight pt-1">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Electric Section */}
        <section className="py-20 bg-white">
          <div className="px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-lime-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <BatteryCharging className="w-8 h-8 text-lime-600" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Elektrikli Araçlarla Yeni Nesil Filo
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                Elektrikli araç geçişinizi planlıyor, kullanım senaryonuza uygun model
                ve şarj altyapısı önerileriyle süreci yönetiyoruz.
              </p>
              <ul className="space-y-3 text-gray-700 mb-6">
                {[
                  'Araç ve menzil analizi',
                  'Şarj noktası planlama desteği',
                  'Enerji maliyeti raporlama',
                  'Sürdürülebilirlik hedeflerine katkı'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-lime-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/hizmetlerimiz#elektrikli"
                className="inline-flex items-center gap-2 text-lime-600 font-semibold hover:gap-3 transition-all"
              >
                Elektrikli Çözümleri İncele
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-lime-50 to-blue-50 p-12 rounded-2xl border border-lime-200">
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900 mb-3">Sıfır Emisyon</div>
                <p className="text-gray-600 mb-6">
                  Filonuzun karbon ayak izini azaltın, toplam sahip olma maliyetini optimize edin.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">Sessiz sürüş</div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">Düşük bakım</div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">Enerji tasarrufu</div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">Yeşil filo</div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="px-6 md:px-8">
            <div className="max-w-4xl mx-auto text-center border border-gray-200 rounded-2xl p-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
                Hemen Başlayın
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Size en uygun aracı bulun ve hemen kiralamaya başlayın. 
                Uzman ekibimiz size yardımcı olmak için hazır.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/login"
                  className="bg-lime-400 text-slate-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-lime-300 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-lime-400/50"
                >
                  Online İşlemler
                </Link>
                <Link
                  href="/iletisim"
                  className="bg-slate-900 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-slate-800 transition-all duration-300 border border-slate-900"
                >
                  İletişime Geç
                </Link>
              </div>
              <div className="mt-6">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center text-slate-700 hover:text-lime-600 font-medium transition-colors"
                >
                  İş Ortağı Girişi
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Blog Section */}
        <section className="py-16 bg-white">
          <div className="px-6 md:px-8">
            <div className="flex items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Blogdan Son Yazılar</h2>
                <p className="text-gray-600 max-w-2xl">
                  Filo yönetimi, elektrikli araçlar ve operasyonel kiralama hakkında güncel içerikler.
                </p>
              </div>
              <Link href="/blog" className="text-lime-600 font-semibold hover:text-lime-700">
                Tümünü Gör →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestPosts.map((post) => (
                <article key={post.slug} className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow">
                  <div className="relative h-40">
                    <Image src={post.image} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <span className="bg-lime-100 text-lime-700 px-2 py-1 rounded-full font-medium">{post.category}</span>
                      <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className="inline-flex mt-3 text-sm font-semibold text-lime-600 hover:text-lime-700">
                      Devamını oku
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
