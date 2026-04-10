import { Metadata } from 'next'
import Link from 'next/link'
import { 
  BatteryCharging, 
  Leaf, 
  TrendingDown, 
  ShieldCheck, 
  ArrowRight, 
  Activity,
  BarChart3
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Elektrikli Araç Kiralama ve Filo Dönüşümü',
  description:
    'Kurumsal elektrikli araç kiralama çözümleri, maliyet avantajları ve filo dönüşüm programı ile CarFlex sürdürülebilir mobilite sunar.',
  path: '/elektrikli-araclar',
  keywords: [
    'elektrikli araç kiralama',
    'elektrikli filo kiralama',
    'kurumsal elektrikli araç',
    'filo dönüşümü',
    'elektrikli araç avantajları',
  ],
  image: '/slide-3.png',
})

export default function ElektrikliAraclar() {
  const advantages = [
    {
      title: 'Düşük İşletme Maliyeti',
      desc: 'Elektrikli araç kiralama, içten yanmalı motorlara göre %70\'e varan yakıt tasarrufu sağlar. Daha az hareketli parça sayesinde bakım maliyetleri de önemli ölçüde düşüktür.',
      icon: TrendingDown
    },
    {
      title: 'Sürdürülebilirlik ve İmaj',
      desc: 'Sıfır emisyon ile çevreyi koruyun. Elektrikli filo kiralama kullanımı, şirketinizin sürdürülebilirlik vizyonunu ve modern marka imajını güçlendirir.',
      icon: Leaf
    },
    {
      title: 'Vergi Avantajları',
      desc: 'Elektrikli araçlar için sunulan MTV indirimleri ve çeşitli teşviklerle toplam sahip olma maliyetinde avantaj sağlayın.',
      icon: ShieldCheck
    },
    {
      title: 'Sessiz ve Konforlu Sürüş',
      desc: 'Motor gürültüsü ve titreşimin olmaması, sürücü yorgunluğunu azaltır ve daha prestijli bir sürüş deneyimi sunar.',
      icon: Activity
    }
  ]

  const steps = [
    {
      title: 'Filo Analizi',
      desc: 'Mevcut araç kullanım alışkanlıklarınızı, günlük km verilerinizi ve rotalarınızı analiz ederek elektrikli dönüşüm potansiyelinizi belirliyoruz.'
    },
    {
      title: 'Model Seçimi',
      desc: 'İhtiyacınıza en uygun menzil, şarj hızı ve segmentteki elektrikli araç modellerini uzman ekibimizle birlikte seçiyoruz.'
    },
    {
      title: 'Şarj Altyapısı',
      desc: 'Ofisinizde veya çalışanlarınızın evlerinde ihtiyaç duyulan şarj istasyonu kurulum süreçlerini planlıyor ve yönetiyoruz.'
    },
    {
      title: 'Eğitim ve Destek',
      desc: 'Sürücülerinize elektrikli araç kullanımı ve şarj yönetimi konularında detaylı eğitimler veriyoruz.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-slate-900">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute -top-24 -left-16 h-96 w-96 rounded-full bg-lime-500/20 blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-lime-400/10 text-lime-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-lime-400/20">
                <span className="font-black text-sm">E</span>
                Geleceğin Mobilitesi
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                Elektrikli Araç <br />
                <span className="text-lime-400">Kiralama Çözümleri</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl">
                CarFlex ile <strong>elektrikli araç kiralama</strong> avantajlarından faydalanın. Çevreci, ekonomik ve teknolojik çözümlerimizle operasyonel maliyetlerinizi düşürürken şirketinizin karbon ayak izini sıfırlayın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/filo-analizi"
                  className="bg-lime-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-lime-300 transition-all transform hover:scale-105 text-center"
                >
                  Ücretsiz Analiz Al
                </Link>
                <Link
                  href="#neden-elektrikli"
                  className="bg-white/10 backdrop-blur text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all text-center"
                >
                  Avantajları Keşfet
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-lime-400/20 rounded-[3rem] blur-3xl animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1000" 
                alt="Kurumsal Elektrikli Araç Kiralama"
                className="relative rounded-[2.5rem] shadow-2xl w-full h-[500px] object-cover border-4 border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Türkiye'de Elektrikli Araç Kiralama Dönemi</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Günümüzde işletmeler için sürdürülebilirlik ve maliyet yönetimi hiç olmadığı kadar önemli hale geldi. <strong>Elektrikli araç kirala</strong> araması yapan birçok kurumsal firma, hem çevre dostu bir imaj sergilemek hem de artan yakıt maliyetlerinden kurtulmak istiyor. CarFlex olarak, Türkiye'nin her yerinde şirketlere özel <strong>elektrikli filo kiralama</strong> hizmetleri sunuyoruz.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Elektrikli araçlar, geleneksel içten yanmalı araçlara göre çok daha düşük bakım gereksinimi duyar. Yağ değişimi, buji kontrolü veya egzoz sistemi gibi karmaşık parçaların olmaması, operasyonel süreçlerinizi basitleştirir.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-lime-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-slate-900">
            <div className="text-center">
              <div className="text-4xl font-black mb-1">%70</div>
              <div className="text-sm font-bold uppercase tracking-wider">Yakıt Tasarrufu</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-1">%0</div>
              <div className="text-sm font-bold uppercase tracking-wider">Karbon Emisyonu</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-1">%40</div>
              <div className="text-sm font-bold uppercase tracking-wider">Bakım Tasarrufu</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-1">24/7</div>
              <div className="text-sm font-bold uppercase tracking-wider">Dijital Takip</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Electric Section */}
      <section id="neden-elektrikli" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 text-center">Neden Elektrikli Araç Kiralamalısınız?</h2>
            <p className="text-lg text-slate-600">
              Elektrikli araçlar sadece bir tercih değil, işletmenizin geleceği için stratejik bir yatırımdır. İşte <strong>elektrikli araç kiralamanın avantajları</strong>:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((adv, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-lime-600 shadow-sm group-hover:bg-lime-500 group-hover:text-white transition-all mb-6">
                  <adv.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{adv.title}</h3>
                <p className="text-slate-600 leading-relaxed italic">
                  "{adv.desc}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Steps */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000" 
                alt="Elektrikli Filo Yönetimi"
                className="rounded-[2.5rem] shadow-2xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Elektrikli Filo Dönüşüm Süreci</h2>
              <div className="space-y-8">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-lime-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-lime-500/30">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Info Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8">Elektrikli Araçlar Hakkında Merak Edilenler</h2>
                <div className="space-y-6">
                  <div className="border-b border-white/10 pb-6">
                    <h4 className="text-xl font-bold text-lime-400 mb-3">Menzil Kaygısı Gerçek mi?</h4>
                    <p className="text-slate-400 leading-relaxed">
                      Yeni nesil elektrikli araçlar 400-600 km arası menzil sunmaktadır. Şehir içi operasyonlarda bir aracın günlük ortalama 100-150 km yol yaptığı düşünülürse, <strong>elektrikli araç kiralama</strong> artık menzil engeli taşımamaktadır.
                    </p>
                  </div>
                  <div className="border-b border-white/10 pb-6">
                    <h4 className="text-xl font-bold text-lime-400 mb-3">Şarj Süreleri Ne Kadar?</h4>
                    <p className="text-slate-400 leading-relaxed">
                      Hızlı şarj (DC) istasyonlarında 30 dakikada %80 doluluk oranına ulaşılabilir. Gece boyunca normal şarj (AC) ile araçlarınız her sabah tam dolu olarak işe hazır olur.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-lime-400 mb-3">Batarya Ömrü Ne Kadar?</h4>
                    <p className="text-slate-400 leading-relaxed">
                      Modern batarya teknolojileri 8-10 yıl veya 160.000 - 200.000 km garanti sunmaktadır. Kiralama modelinde tüm bu riskler CarFlex tarafından yönetilir.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl border border-white/10 self-start">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <BarChart3 className="text-lime-400" />
                  Maliyet Karşılaştırması
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <span className="text-slate-400">Dizel Araç (100km)</span>
                    <span className="text-xl font-bold">~450 TL</span>
                  </div>
                  <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                    <div className="bg-slate-500 h-full w-full"></div>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-lime-400 font-bold">Elektrikli Araç (100km)</span>
                    <span className="text-xl font-bold text-lime-400">~120 TL</span>
                  </div>
                  <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                    <div className="bg-lime-400 h-full w-[27%]"></div>
                  </div>
                  <p className="text-sm text-slate-500 mt-4 italic">
                    * Ortalama enerji ve yakıt fiyatları baz alınmıştır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 text-center">Filonuzu Dönüştürmeye Hazır mısınız?</h2>
          <p className="text-xl text-slate-600 mb-12">
            Ücretsiz filo analizi ve <strong>elektrikli araç kiralama fiyatları</strong> hakkında bilgi almak için hemen uzmanlarımızla görüşün.
          </p>
          <Link
            href="/filo-analizi"
            className="inline-flex items-center gap-3 bg-slate-900 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-slate-800 transition-all shadow-2xl"
          >
            Ücretsiz Analiz İsteyin
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}
