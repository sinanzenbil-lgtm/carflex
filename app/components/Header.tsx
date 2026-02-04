'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Login sayfasında header'ı gösterme
  if (pathname === '/login') return null

  const navItems = [
    { href: '/', label: 'Anasayfa' },
    { href: '/hizmetlerimiz', label: 'Hizmetlerimiz' },
    { href: '/elektrikli-araclar', label: '⚡ Elektrikli Araçlar' },
    { href: '/iletisim', label: 'İletişim' },
  ]

  return (
    <header className="bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/carflex-logo-v2.png"
              alt="CarFlex"
              width={600}
              height={170}
              className="h-10 md:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-700 hover:text-lime-600 font-medium transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <Link
              href="/login"
              target="_blank"
              className="bg-lime-400 text-slate-900 px-6 py-2 rounded-lg font-semibold hover:bg-lime-300 transition-colors"
            >
              Online İşlemler
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-lime-600 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 mt-4 pt-4">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-700 hover:text-lime-600 font-medium transition-colors py-2"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/login"
                target="_blank"
                onClick={() => setIsMenuOpen(false)}
                className="bg-lime-400 text-slate-900 px-6 py-2 rounded-lg font-semibold hover:bg-lime-300 transition-colors text-center"
              >
                Online İşlemler
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
