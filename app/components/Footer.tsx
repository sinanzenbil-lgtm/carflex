import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="CarFlex"
                width={220}
                height={64}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Profesyonel araç kiralama hizmetleri ile işletmenizin ihtiyaçlarını karşılıyoruz.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-lime-400 transition-colors">
                  Anasayfa
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="text-gray-400 hover:text-lime-400 transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/hizmetlerimiz" className="text-gray-400 hover:text-lime-400 transition-colors">
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="text-gray-400 hover:text-lime-400 transition-colors">
                  Araçlarımız
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-gray-400 hover:text-lime-400 transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Hizmetlerimiz</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/hizmetlerimiz#uzun-donem" className="text-gray-400 hover:text-lime-400 transition-colors">
                  Uzun Dönem Kiralama
                </Link>
              </li>
              <li>
                <Link href="/hizmetlerimiz#kisa-donem" className="text-gray-400 hover:text-lime-400 transition-colors">
                  Kısa Dönem Kiralama
                </Link>
              </li>
              <li>
                <Link href="/hizmetlerimiz#kurumsal" className="text-gray-400 hover:text-lime-400 transition-colors">
                  Kurumsal Çözümler
                </Link>
              </li>
              <li>
                <Link href="/hizmetlerimiz#filo" className="text-gray-400 hover:text-lime-400 transition-colors">
                  Filo Yönetimi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">İletişim</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-lime-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">+90 (212) 123 45 67</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-lime-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">info@carflex.com.tr</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-lime-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  İstanbul, Türkiye
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 CarFlex. Tüm hakları saklıdır.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/gizlilik-politikasi" className="text-gray-500 hover:text-lime-400 transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim-kosullari" className="text-gray-500 hover:text-lime-400 transition-colors">
                Kullanım Koşulları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
