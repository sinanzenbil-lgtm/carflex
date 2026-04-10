import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Kullanım Koşulları',
  description:
    'CarFlex web sitesi kullanım koşulları, içerik kullanım hakları ve ziyaretçi sorumlulukları hakkında bilgi verir.',
  path: '/kullanim-kosullari',
  keywords: ['kullanım koşulları', 'site kullanım şartları', 'carflex şartlar'],
})

export default function KullanimKosullariPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Kullanım Koşulları</h1>
          <p className="mt-4 text-slate-300 text-lg">
            Bu sayfa, CarFlex internet sitesini kullanırken geçerli olan temel koşulları açıklar.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-slate-700 leading-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Genel Kullanım</h2>
          <p>
            Siteyi kullanan tüm ziyaretçiler, içeriklerin yalnızca bilgilendirme amacı taşıdığını ve
            sunulan hizmetlerin ayrıca sözleşme ve teklif şartlarına tabi olabileceğini kabul eder.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">İçerik Hakları</h2>
          <p>
            Sitede yer alan metinler, görseller, marka öğeleri ve diğer içerikler CarFlex’e veya ilgili
            hak sahiplerine aittir. İzinsiz çoğaltılamaz veya ticari amaçla kullanılamaz.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Bağlantılar ve Üçüncü Taraf Hizmetler</h2>
          <p>
            Harici bağlantılar bilgilendirme amacıyla sunulabilir. Üçüncü taraf sitelerin içerik ve
            politikalarından CarFlex doğrudan sorumlu değildir.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Sorumluluğun Sınırı</h2>
          <p>
            CarFlex, sitede yer alan bilgilerin güncel ve doğru olması için çaba gösterir; ancak
            içeriklerdeki eksiklik veya değişikliklerden kaynaklanabilecek dolaylı zararlardan sorumlu değildir.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">İletişim</h2>
          <p>
            Kullanım koşulları ile ilgili sorularınız için
            {' '}
            <a href="mailto:info@carflex.com.tr" className="text-lime-600 font-semibold hover:text-lime-700">
              info@carflex.com.tr
            </a>
            {' '}
            adresine yazabilirsiniz.
          </p>
        </div>
      </section>
    </div>
  )
}
