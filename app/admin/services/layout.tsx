'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Car, Wrench, AlertTriangle, FileCheck, Shield, ShieldCheck } from 'lucide-react'

const menuItems = [
  { href: '/admin/services/vehicles', label: 'Araçlar', icon: Car },
  { href: '/admin/services/maintenance', label: 'Bakım Onarım', icon: Wrench },
  { href: '/admin/services/damage', label: 'Hasar', icon: AlertTriangle },
  { href: '/admin/services/inspection', label: 'Muayene', icon: FileCheck },
  { href: '/admin/services/traffic-insurance', label: 'Trafik Sigortası', icon: Shield },
  { href: '/admin/services/kasko', label: 'Kasko', icon: ShieldCheck },
]

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="w-full">
      {/* Sticky Menu */}
      <div className="sticky top-0 z-20 bg-white border-b-2 border-gray-200 mb-6 py-4 shadow-md">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-primary-50 border-2 border-primary-600 shadow-md ring-2 ring-primary-200'
                    : 'border border-gray-200 hover:border-primary-300'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'text-primary-600' : 'text-gray-600'}`} />
                <span className={`text-sm font-medium text-center ${isActive ? 'text-primary-700 font-semibold' : 'text-gray-700'}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Page Content */}
      <div>
        {children}
      </div>
    </div>
  )
}
