import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Gizlilik Politikası',
  description:
    'CarFlex gizlilik politikası; kişisel verilerin işlenmesi, korunması ve iletişim süreçleri hakkında bilgi verir.',
  path: '/gizlilik-politikasi',
  keywords: ['gizlilik politikası', 'kvkk', 'kişisel veri koruma'],
})

export default function GizlilikPolitikasiPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Gizlilik Politikası</h1>
          <p className="mt-4 text-slate-300 text-lg">
            CarFlex ziyaretçi ve müşteri verilerini güvenli, şeffaf ve mevzuata uygun şekilde işler.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-slate-700 leading-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Toplanan Bilgiler</h2>
          <p>
            Teklif formları, iletişim talepleri ve site kullanım süreçlerinde ad, e-posta, telefon,
            firma bilgisi ve talep içeriği gibi veriler toplanabilir.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Verilerin Kullanım Amaçları</h2>
          <p>
            Toplanan bilgiler; teklif hazırlama, müşteri iletişimi, operasyonel destek sağlama,
            hizmet kalitesini artırma ve yasal yükümlülükleri yerine getirme amaçlarıyla kullanılır.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Veri Güvenliği</h2>
          <p>
            CarFlex, kişisel verilerin yetkisiz erişime, kayba veya kötüye kullanıma karşı korunması
            için makul teknik ve idari önlemleri uygular.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Çerezler ve Analitik</h2>
          <p>
            Site performansını ölçmek, kullanıcı deneyimini iyileştirmek ve pazarlama etkinliğini
            analiz etmek için çerezler ve analitik araçlar kullanılabilir.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">İletişim</h2>
          <p>
            Gizlilik süreçleriyle ilgili talepleriniz için
            {' '}
            <a href="mailto:info@carflex.com.tr" className="text-lime-600 font-semibold hover:text-lime-700">
              info@carflex.com.tr
            </a>
            {' '}
            adresinden bize ulaşabilirsiniz.
          </p>
        </div>
      </section>
    </div>
  )
}
