'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Car } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Anasayfa' },
    { href: '/hakkimizda', label: 'Hakkımızda' },
    { href: '/hizmetlerimiz', label: 'Hizmetlerimiz' },
    { href: '/iletisim', label: 'İletişim' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-lime-400 p-2 rounded-lg group-hover:bg-lime-500 transition-colors">
              <Car className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                <span className="text-slate-900">Carfle</span>
                <span className="text-lime-500">X</span>
              </h1>
              <p className="text-xs text-gray-500">Araç Kiralama</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-lime-500 font-medium transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <Link
              href="/vehicles"
              className="bg-lime-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-lime-600 transition-colors"
            >
              Araçları Görüntüle
            </Link>
            <Link
              href="/login"
              className="text-gray-700 hover:text-lime-500 font-medium transition-colors"
            >
              İş Ortağı Girişi
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-lime-500 transition-colors"
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
                  className="text-gray-700 hover:text-lime-500 font-medium transition-colors py-2"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/vehicles"
                onClick={() => setIsMenuOpen(false)}
                className="bg-lime-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-lime-600 transition-colors text-center"
              >
                Araçları Görüntüle
              </Link>
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-lime-500 font-medium transition-colors py-2"
              >
                İş Ortağı Girişi
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
