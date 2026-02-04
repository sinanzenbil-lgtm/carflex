export type BlogPost = {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  image: string
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'elektrikli-filo-ile-maliyetleri-azaltin',
    title: 'Elektrikli Filo ile Maliyetleri Azaltın',
    date: '2026-01-29',
    category: 'Elektrikli Araçlar',
    excerpt: 'Şarj planı, bakım avantajı ve toplam sahip olma maliyeti analizleriyle elektrikli filoya geçiş rehberi.',
    image: '/blog-1.png',
    content:
      'Elektrikli araçlar, bakım maliyetlerini azaltır ve enerji giderlerinde öngörülebilirlik sağlar.\n\n' +
      'Filo kullanım senaryolarını analiz ederek menzil, şarj altyapısı ve sürüş profilini doğru eşleştirmek gerekir.\n\n' +
      'CarFlex ile elektrikli filo dönüşümü; araç seçimi, şarj planlama ve maliyet raporlama adımlarını tek merkezde yönetir.'
  },
  {
    slug: 'kurumsal-filo-kiralamanin-avantajlari',
    title: 'Kurumsal Filo Kiralamanın Avantajları',
    date: '2026-01-24',
    category: 'Kurumsal',
    excerpt: 'Sabit bütçe, operasyonel kolaylık ve maliyet optimizasyonu sağlayan filo kiralama yaklaşımı.',
    image: '/blog-2.png',
    content:
      'Kurumsal filo kiralama, satın alma maliyetlerini ortadan kaldırırken operasyon süreçlerini sadeleştirir.\n\n' +
      'Bakım, sigorta, muayene ve hasar yönetimi tek sözleşme altında toplanır.\n\n' +
      'Böylece işletmeler, araç yönetimi yerine ana işlerine odaklanabilir.'
  },
  {
    slug: 'periyodik-bakim-planlamasi-nasil-yapilir',
    title: 'Periyodik Bakım Planlaması Nasıl Yapılır?',
    date: '2026-01-18',
    category: 'Bakım',
    excerpt: 'Araç performansını korumak ve maliyetleri düşürmek için doğru bakım takvimi oluşturma.',
    image: '/blog-3.png',
    content:
      'Periyodik bakım, güvenlik ve araç ömrü açısından kritik bir adımdır.\n\n' +
      'Kullanım yoğunluğu, kilometre ve sürüş koşulları bakım periyotlarını belirler.\n\n' +
      'CarFlex, bakım takvimini otomatik planlar ve süreçleri sizin yerinize takip eder.'
  },
  {
    slug: 'arac-kiralama-sureci-artik-cok-kolay',
    title: 'Araç Kiralama Süreci Artık Çok Kolay',
    date: '2026-01-12',
    category: 'Operasyon',
    excerpt: 'Dijital teklif, hızlı onay ve tek noktadan yönetim ile filo kiralama adımları.',
    image: '/blog-4.png',
    content:
      'Araç kiralama süreci dijitalleşti; teklif, onay ve teslim adımları hızlandı.\n\n' +
      'Kurumsal müşteriler için raporlama, takip ve sözleşme yönetimi tek panelden yürütülür.\n\n' +
      'CarFlex, bu süreci şeffaf hale getirerek operasyonel yükü azaltır.'
  },
  {
    slug: 'hasar-yonetiminde-dogru-surec',
    title: 'Hasar Yönetiminde Doğru Süreç',
    date: '2026-01-06',
    category: 'Hasar Yönetimi',
    excerpt: 'Kaza sonrası hızlı müdahale, onarım ve evrak süreçlerini yönetmenin püf noktaları.',
    image: '/blog-2.png',
    content:
      'Hasar yönetiminde hız, operasyonun aksamaması için kritik öneme sahiptir.\n\n' +
      'Doğru yönlendirme, hasar tespit ve onarım süreçlerini kısaltır.\n\n' +
      'CarFlex, kaza sonrası tüm süreçleri merkezi olarak yönetir.'
  },
  {
    slug: 'kasko-ve-sigorta-yonetimi',
    title: 'Kasko ve Sigorta Yönetimi',
    date: '2025-12-29',
    category: 'Sigorta',
    excerpt: 'Zorunlu trafik sigortası ve kasko süreçlerinin kurumsal yönetimi.',
    image: '/blog-3.png',
    content:
      'Kasko ve sigorta süreçleri filo yönetiminin önemli bir parçasıdır.\n\n' +
      'Doğru poliçe seçimi, riskleri azaltır ve maliyeti optimize eder.\n\n' +
      'CarFlex, poliçe takibini ve yenilemeleri sizin yerinize yürütür.'
  }
]
