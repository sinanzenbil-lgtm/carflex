import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CarFlex - Profesyonel Araç Kiralama Hizmetleri',
  description: 'Uzun ve kısa dönem araç kiralama hizmetleri. İşletmeniz için en uygun fiyatlarla, esnek ve güvenilir çözümler.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
