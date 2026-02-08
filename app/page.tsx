'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { blogPosts } from '@/lib/blog'
import { Car, Calendar, Shield, Clock, CheckCircle, ArrowRight, Users, Award, TrendingUp, BatteryCharging } from 'lucide-react'

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
      buttonText: 'Programı İncele',
      secondaryLink: '/filo-analizi',
      secondaryButtonText: 'Analiz İste'
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
      {/* Background X watermark — top right */}
      <Image
        src="/carflex-x-bg.png"
        alt=""
        width={700}
        height={700}
        className="pointer-events-none fixed -top-[120px] right-0 w-[520px] h-[520px] md:w-[700px] md:h-[700px] opacity-30 z-0 select-none object-contain"
        aria-hidden="true"
        priority
      />
      {/* Background X watermark — left side */}
      <Image
        src="/carflex-x-bg.png"
        alt=""
        width={700}
        height={700}
        className="pointer-events-none fixed left-[-200px] top-[40%] w-[600px] h-[600px] md:w-[700px] md:h-[700px] opacity-20 z-0 select-none object-contain hidden lg:block"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto relative z-10">
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
                            href={slide.link}
                            className="group bg-lime-400 text-slate-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-lime-300 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-lime-400/50 flex items-center gap-2"
                          >
                            {slide.buttonText || 'Online İşlemler'}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                          {slide.secondaryLink && slide.secondaryButtonText ? (
                            <Link
                              href={slide.secondaryLink}
                              className="bg-slate-900 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-slate-800 transition-all duration-300 border border-slate-900"
                            >
                              {slide.secondaryButtonText}
                            </Link>
                          ) : null}
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

        {/* Features Section — Bento Grid */}
        <section className="py-16 md:py-20 bg-white">
          <div className="px-6 md:px-8">
            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-5 auto-rows-auto">

              {/* ── Başlık bloğu — sol üst, geniş */}
              <div className="md:col-span-6 lg:col-span-5 bg-slate-900 text-white p-10 md:p-14 flex flex-col justify-between" style={{ borderRadius: '2rem' }}>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-lime-400 mb-5">Kurumsal Filo Çözümleri</p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight">
                    Filonuzu tek merkezden yönetin.
                  </h2>
                </div>
                <p className="mt-8 text-slate-400 text-base leading-relaxed max-w-md">
                  Maliyetlerinizi öngörülebilir hale getiren, operasyon yükünü azaltan profesyonel kiralama modelleri.
                </p>
              </div>

              {/* ── Rakam bloğu — sağ üst */}
              <div className="md:col-span-3 lg:col-span-4 bg-lime-400 text-slate-900 p-10 flex flex-col justify-center" style={{ borderRadius: '2rem' }}>
                <div className="space-y-6">
                  <div>
                    <div className="text-5xl md:text-6xl font-black leading-none">7/24</div>
                    <div className="text-sm font-bold mt-1 text-slate-800">Operasyonel destek</div>
                  </div>
                  <div className="h-px bg-slate-900/15" />
                  <div>
                    <div className="text-5xl md:text-6xl font-black leading-none">%70</div>
                    <div className="text-sm font-bold mt-1 text-slate-800">Daha az operasyon yükü</div>
                  </div>
                </div>
              </div>

              {/* ── CTA bloğu — sağ üst köşe */}
              <div className="md:col-span-3 lg:col-span-3 bg-slate-100 p-10 flex flex-col justify-between" style={{ borderRadius: '2rem' }}>
                <div>
                  <p className="text-slate-500 text-sm font-semibold mb-2">Hemen başlayın</p>
                  <p className="text-slate-900 text-xl font-bold leading-snug">Size özel filo planı oluşturalım.</p>
                </div>
                <Link
                  href="/teklif-al"
                  className="mt-8 inline-flex items-center gap-3 bg-slate-900 text-white px-7 py-4 font-bold hover:bg-slate-800 transition-colors self-start"
                  style={{ borderRadius: '1rem' }}
                >
                  Teklif Al
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* ── Hizmet 1 — Uzun dönem */}
              <div className="md:col-span-3 lg:col-span-4 group bg-white border-2 border-slate-200 hover:border-lime-400 p-8 md:p-10 transition-colors duration-300" style={{ borderRadius: '2rem' }}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-12 h-12 bg-slate-900 text-white" style={{ borderRadius: '0.875rem' }}>
                    <Calendar className="w-6 h-6" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">01</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Uzun Dönem Filo Kiralama</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  6-48 ay arası kiralama, sabit aylık bütçe, planlı bakım ve tek sözleşme yönetimi.
                </p>
                <div className="space-y-2 mb-8">
                  {['Sabit aylık bütçe', 'Planlı bakım yönetimi', 'Tek sözleşme / tek takip'].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
                      <span className="font-medium">{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/hizmetlerimiz#uzun-donem" className="inline-flex items-center gap-2 font-bold text-slate-900 group-hover:text-lime-600 transition-colors text-sm">
                  Hizmeti incele <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* ── Hizmet 2 — Kısa dönem */}
              <div className="md:col-span-3 lg:col-span-4 group bg-white border-2 border-slate-200 hover:border-slate-900 p-8 md:p-10 transition-colors duration-300" style={{ borderRadius: '2rem' }}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-12 h-12 bg-slate-900 text-white" style={{ borderRadius: '0.875rem' }}>
                    <Clock className="w-6 h-6" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">02</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Kısa Dönem Destek</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Proje, sezon veya geçici ihtiyaçlar için günlük-haftalık çözümler. Hızlı teklif ve anında teslimat.
                </p>
                <div className="space-y-2 mb-8">
                  {['Günlük / haftalık esneklik', 'Hızlı onay ve teslim', 'Net fiyatlandırma'].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      <span className="font-medium">{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/hizmetlerimiz#kisa-donem" className="inline-flex items-center gap-2 font-bold text-slate-900 group-hover:text-slate-600 transition-colors text-sm">
                  Hizmeti incele <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* ── Hizmet 3 — Elektrikli */}
              <div className="md:col-span-6 lg:col-span-4 group bg-white border-2 border-slate-200 hover:border-lime-500 p-8 md:p-10 transition-colors duration-300" style={{ borderRadius: '2rem' }}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-12 h-12 bg-lime-500 text-white" style={{ borderRadius: '0.875rem' }}>
                    <BatteryCharging className="w-6 h-6" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">03</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Elektrikli Dönüşüm</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Elektrikli araçlara geçiş için analiz, araç seçimi ve şarj planı desteği. Sürdürülebilir gelecek.
                </p>
                <div className="space-y-2 mb-8">
                  {['Menzil + kullanım analizi', 'Şarj altyapısı planı', 'Tasarruf ve KPI raporu'].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
                      <span className="font-medium">{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/hizmetlerimiz#elektrikli" className="inline-flex items-center gap-2 font-bold text-slate-900 group-hover:text-lime-600 transition-colors text-sm">
                  Hizmeti incele <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

            {/* CarFlex Avantajları */}
            <div className="relative bg-slate-900 p-12 md:p-16 rounded-[3rem] overflow-hidden shadow-2xl mt-10">
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
        <section className="pt-0 pb-20 bg-white">
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
        <section className="pt-0 pb-4 bg-white">
          <div className="px-6 md:px-8">
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[2.5rem] p-12 md:p-16 shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>
              
              <div className="relative z-10 max-w-4xl mx-auto text-center">
                <div className="inline-block mb-6">
                  <span className="bg-lime-400/20 text-lime-400 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                    Hemen Başlayın
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                  Size Özel Filo Çözümü<br />Bir Tık Uzağınızda
                </h2>
                
                <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Profesyonel ekibimiz ihtiyacınıza uygun en ekonomik ve verimli araç kiralama çözümünü hazırlamak için sizi bekliyor.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-8">
                  <Link
                    href="/login"
                    className="group bg-lime-400 text-slate-900 px-12 py-5 rounded-xl font-bold text-lg hover:bg-lime-300 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-lime-400/30 flex items-center gap-3"
                  >
                    Online İşlemler
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/iletisim"
                    className="bg-white/10 backdrop-blur text-white px-12 py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/20"
                  >
                    İletişime Geç
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Blog Section */}
        <section className="py-16 bg-white">
          <div className="px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-10">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Blogdan Son Yazılar</h2>
                <p className="text-gray-600 max-w-2xl">
                  Filo yönetimi, elektrikli araçlar ve operasyonel kiralama hakkında güncel içerikler.
                </p>
              </div>
              <Link href="/blog" className="text-lime-600 font-semibold hover:text-lime-700 whitespace-nowrap self-start md:self-auto">
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
