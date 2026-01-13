import Link from 'next/link'
import { Car, Calendar, Shield, Clock, CheckCircle, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0a1930' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center mb-16">
            {/* Logo */}
            <div className="mb-8">
              <h1 className="text-7xl md:text-9xl font-bold mb-4">
                <span className="text-white">Carfle</span>
                <span className="text-lime-400 relative inline-block">
                  X
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-full h-0.5 bg-lime-400 opacity-50 transform rotate-45"></span>
                    <span className="w-full h-0.5 bg-lime-400 opacity-50 transform -rotate-45 absolute"></span>
                  </span>
                </span>
              </h1>
            </div>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
              Uzun ve Kısa Dönem Araç Kiralama
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              İşletmeniz için en uygun fiyatlarla, esnek ve güvenilir araç kiralama çözümleri
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/vehicles"
                className="group bg-lime-400 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-lime-300 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-lime-400/50 flex items-center gap-2"
              >
                Araçları Keşfet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                İş Ortağı Girişi
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="bg-lime-400/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-lime-400/30 transition-colors">
              <Calendar className="w-8 h-8 text-lime-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Uzun Dönem Kiralama</h3>
            <p className="text-gray-300 leading-relaxed">
              Aylık ve yıllık araç kiralama çözümleri. İşletmeniz için en uygun fiyatlarla, esnek ödeme seçenekleri.
            </p>
            <Link
              href="/vehicles?type=long-term"
              className="inline-flex items-center gap-2 text-lime-400 font-semibold mt-4 hover:gap-3 transition-all"
            >
              Detaylar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="bg-lime-400/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-lime-400/30 transition-colors">
              <Clock className="w-8 h-8 text-lime-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Günlük Kiralama</h3>
            <p className="text-gray-300 leading-relaxed">
              Kısa süreli ihtiyaçlarınız için günlük araç kiralama hizmetleri. Hızlı, esnek ve uygun fiyatlı.
            </p>
            <Link
              href="/vehicles?type=short-term"
              className="inline-flex items-center gap-2 text-lime-400 font-semibold mt-4 hover:gap-3 transition-all"
            >
              Detaylar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="bg-lime-400/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-lime-400/30 transition-colors">
              <Shield className="w-8 h-8 text-lime-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Güvenilir Hizmet</h3>
            <p className="text-gray-300 leading-relaxed">
              Tüm araçlarımız düzenli bakımlı, sigortalı ve güvenlik kontrollerinden geçmiş durumda.
            </p>
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 text-lime-400 font-semibold mt-4 hover:gap-3 transition-all"
            >
              Detaylar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-lime-400/10 to-blue-500/10 backdrop-blur-sm p-12 rounded-2xl border border-lime-400/20">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">Neden CarFlex?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Geniş araç filosu',
              'Rekabetçi fiyatlar',
              '7/24 müşteri desteği',
              'Esnek ödeme seçenekleri',
              'Hızlı onay süreci',
              'Profesyonel hizmet'
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="bg-lime-400 rounded-full p-2">
                  <CheckCircle className="w-5 h-5 text-slate-900" />
                </div>
                <span className="text-gray-200 text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-lime-400 to-lime-500 rounded-2xl p-12 text-center shadow-2xl shadow-lime-400/50">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Hemen Başlayın
          </h2>
          <p className="text-xl text-slate-800 mb-8 max-w-2xl mx-auto">
            Size en uygun aracı bulun ve hemen kiralamaya başlayın
          </p>
          <Link
            href="/vehicles"
            className="inline-block bg-slate-900 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-800 transition-all duration-300 transform hover:scale-105"
          >
            Araçları Görüntüle
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-2">
              <span className="text-white">Carfle</span>
              <span className="text-lime-400">X</span>
            </h3>
            <p className="text-gray-400 mb-6">Profesyonel Araç Kiralama Hizmetleri</p>
            <div className="flex justify-center gap-6">
              <Link
                href="/vehicles"
                className="text-gray-400 hover:text-lime-400 transition-colors"
              >
                Araçlar
              </Link>
              <Link
                href="/login"
                className="text-gray-400 hover:text-lime-400 transition-colors"
              >
                İş Ortağı Girişi
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-8">
              © 2024 CarFlex. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
