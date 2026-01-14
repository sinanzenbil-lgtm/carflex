import { Car, Users, Award, Target, Heart, TrendingUp } from 'lucide-react'

export default function Hakkimizda() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Hakkımızda</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              CarFlex olarak, 15 yılı aşkın deneyimimizle Türkiye'nin önde gelen araç kiralama 
              şirketlerinden biriyiz. İşletmenizin ihtiyaçlarına özel çözümler sunuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="bg-gradient-to-br from-lime-50 to-blue-50 p-8 rounded-xl border border-lime-200">
              <div className="bg-lime-400 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Misyonumuz</h2>
              <p className="text-gray-700 leading-relaxed">
                İşletmelerin araç kiralama ihtiyaçlarını en uygun fiyatlarla, güvenilir ve 
                profesyonel hizmet anlayışıyla karşılamak. Müşteri memnuniyetini ön planda 
                tutarak, sektörde öncü bir konumda yer almak.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-8 rounded-xl border border-blue-200">
              <div className="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Vizyonumuz</h2>
              <p className="text-gray-700 leading-relaxed">
                Türkiye'nin en güvenilir ve tercih edilen araç kiralama şirketi olmak. 
                Teknolojik yenilikleri takip ederek, müşterilerimize en iyi hizmeti sunmak 
                ve sektörde sürdürülebilir büyüme sağlamak.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Değerlerimiz</h2>
            <p className="text-xl text-gray-600">Çalışma prensiplerimiz</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Müşteri Odaklılık',
                description: 'Müşteri memnuniyeti bizim önceliğimizdir. Her zaman müşterilerimizin ihtiyaçlarını anlamaya ve en iyi çözümü sunmaya odaklanırız.'
              },
              {
                icon: Award,
                title: 'Kalite',
                description: 'Hizmet kalitemizden asla ödün vermeyiz. Tüm araçlarımız düzenli bakımlı ve güvenlik kontrollerinden geçmiştir.'
              },
              {
                icon: Users,
                title: 'Güvenilirlik',
                description: 'Sözümüzü tutar, zamanında teslimat yapar ve şeffaf bir hizmet anlayışıyla çalışırız. Güven, işimizin temelidir.'
              }
            ].map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="text-center p-6">
                  <div className="bg-lime-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-10 h-10 text-lime-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Hikayemiz</h2>
              <p className="text-xl text-gray-600">Yolculuğumuz</p>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-lime-400">
                <div className="text-lime-600 font-bold mb-2">2009</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Kuruluş</h3>
                <p className="text-gray-700 leading-relaxed">
                  CarFlex, İstanbul'da küçük bir filo ile kuruldu. Müşteri odaklı hizmet 
                  anlayışımızla kısa sürede büyüdük ve sektörde tanınan bir marka haline geldik.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-blue-400">
                <div className="text-blue-600 font-bold mb-2">2015</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Büyüme</h3>
                <p className="text-gray-700 leading-relaxed">
                  Filomuzu 200 araça çıkardık ve kurumsal müşteri portföyümüzü genişlettik. 
                  Türkiye genelinde hizmet vermeye başladık.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-lime-400">
                <div className="text-lime-600 font-bold mb-2">2020</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Dijital Dönüşüm</h3>
                <p className="text-gray-700 leading-relaxed">
                  Online rezervasyon sistemimizi hayata geçirdik ve teknolojik altyapımızı 
                  güçlendirdik. Müşteri deneyimini iyileştirmek için sürekli yenilik yapıyoruz.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-blue-400">
                <div className="text-blue-600 font-bold mb-2">2024</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Bugün</h3>
                <p className="text-gray-700 leading-relaxed">
                  500+ araçlık filomuz, 1000+ mutlu müşterimiz ve 15 yıllık deneyimimizle 
                  Türkiye'nin önde gelen araç kiralama şirketlerinden biriyiz. Gelecekte de 
                  müşterilerimize en iyi hizmeti sunmaya devam edeceğiz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Ekibimiz</h2>
            <p className="text-xl text-gray-600">
              Deneyimli ve profesyonel ekibimizle yanınızdayız
            </p>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-700 leading-relaxed text-lg mb-8">
              CarFlex'te, alanında uzman ve deneyimli bir ekiple çalışıyoruz. Müşteri 
              temsilcilerimiz, teknik ekibimiz ve yönetim kadromuz, size en iyi hizmeti 
              sunmak için 7/24 çalışıyor.
            </p>
            <div className="bg-gradient-to-r from-lime-50 to-blue-50 p-8 rounded-xl border border-lime-200">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-slate-900">50+ çalışanımız</strong> ile müşteri 
                memnuniyetini ön planda tutuyor, sürekli eğitim ve gelişim programlarıyla 
                hizmet kalitemizi artırıyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
