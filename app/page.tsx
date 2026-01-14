import Link from 'next/link'
import Image from 'next/image'
import { Car, Calendar, Shield, Clock, CheckCircle, ArrowRight, Star, Users, Award, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Image
                src="/logo.png"
                alt="CarFlex"
                width={600}
                height={160}
                className="mx-auto h-20 md:h-28 w-auto"
                priority
              />
            </div>
            
            <p className="text-2xl md:text-3xl text-gray-200 mb-6 font-light">
              Profesyonel Araç Kiralama Çözümleri
            </p>
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              İşletmenizin ihtiyaçlarına özel, uzun ve kısa dönem araç kiralama hizmetleri. 
              Geniş araç filosu, rekabetçi fiyatlar ve 7/24 müşteri desteği ile yanınızdayız.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/vehicles"
                className="group bg-lime-400 text-slate-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-lime-300 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-lime-400/50 flex items-center gap-2"
              >
                Araçları Keşfet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/iletisim"
                className="bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Hemen İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Car, number: '500+', label: 'Araç Filosu' },
              { icon: Users, number: '1000+', label: 'Mutlu Müşteri' },
              { icon: Award, number: '15+', label: 'Yıllık Deneyim' },
              { icon: TrendingUp, number: '%98', label: 'Memnuniyet Oranı' },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="bg-lime-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-lime-600" />
                  </div>
                  <div className="text-4xl font-bold text-slate-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Neden CarFlex?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              İşletmenizin ihtiyaçlarına özel çözümler sunuyoruz
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100">
              <div className="bg-lime-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-lime-400 transition-colors">
                <Calendar className="w-8 h-8 text-lime-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Uzun Dönem Kiralama</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Aylık ve yıllık araç kiralama çözümleri. İşletmeniz için en uygun fiyatlarla, 
                esnek ödeme seçenekleri ve özel filo yönetimi hizmetleri.
              </p>
              <Link
                href="/hizmetlerimiz#uzun-donem"
                className="inline-flex items-center gap-2 text-lime-600 font-semibold hover:gap-3 transition-all"
              >
                Detaylar
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100">
              <div className="bg-lime-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-lime-400 transition-colors">
                <Clock className="w-8 h-8 text-lime-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Kısa Dönem Kiralama</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Günlük, haftalık veya aylık kısa süreli araç kiralama hizmetleri. 
                Hızlı onay süreci, esnek kiralama koşulları ve uygun fiyatlar.
              </p>
              <Link
                href="/hizmetlerimiz#kisa-donem"
                className="inline-flex items-center gap-2 text-lime-600 font-semibold hover:gap-3 transition-all"
              >
                Detaylar
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100">
              <div className="bg-lime-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-lime-400 transition-colors">
                <Shield className="w-8 h-8 text-lime-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Güvenilir Hizmet</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Tüm araçlarımız düzenli bakımlı, sigortalı ve güvenlik kontrollerinden geçmiş durumda. 
                7/24 yol yardım hizmeti ve profesyonel müşteri desteği.
              </p>
              <Link
                href="/hakkimizda"
                className="inline-flex items-center gap-2 text-lime-600 font-semibold hover:gap-3 transition-all"
              >
                Detaylar
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-gradient-to-r from-lime-50 to-blue-50 p-12 rounded-2xl border border-lime-200">
            <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">Avantajlarımız</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'Geniş araç filosu (500+ araç)',
                'Rekabetçi fiyatlar',
                '7/24 müşteri desteği',
                'Esnek ödeme seçenekleri',
                'Hızlı onay süreci',
                'Profesyonel filo yönetimi',
                'Yol yardım hizmeti',
                'Özel kurumsal çözümler',
                'Online rezervasyon sistemi'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-lime-400 rounded-full p-1.5 flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Müşteri Yorumları
            </h2>
            <p className="text-xl text-gray-600">
              Müşterilerimiz CarFlex'i neden tercih ediyor?
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Ahmet Yılmaz',
                company: 'ABC Teknoloji A.Ş.',
                comment: 'CarFlex ile 2 yıldır çalışıyoruz. Profesyonel hizmet, zamanında teslimat ve uygun fiyatlar. Kesinlikle tavsiye ederim.',
                rating: 5
              },
              {
                name: 'Ayşe Demir',
                company: 'XYZ İnşaat Ltd.',
                comment: 'Filo yönetimi konusunda çok yardımcı oldular. Araçlarımız her zaman bakımlı ve hazır. Müşteri hizmetleri mükemmel.',
                rating: 5
              },
              {
                name: 'Mehmet Kaya',
                company: 'DEF Lojistik',
                comment: 'Hızlı onay süreci ve esnek ödeme seçenekleri sayesinde işimizi kolaylaştırdılar. Çok memnunuz.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Hemen Başlayın
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Size en uygun aracı bulun ve hemen kiralamaya başlayın. 
              Uzman ekibimiz size yardımcı olmak için hazır.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/vehicles"
                className="bg-lime-400 text-slate-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-lime-300 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-lime-400/50"
              >
                Araçları Görüntüle
              </Link>
              <Link
                href="/iletisim"
                className="bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
