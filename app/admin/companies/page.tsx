'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Eye, Edit } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

interface Company {
  id: string
  name: string
  taxId: string
  phone: string | null
  contactPerson: string | null
  balance: number // Borç - Alacak
}

export default function CompaniesPage() {
  const { getAuthHeaders } = useAdmin()
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCompanies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchCompanies = async () => {
    try {
      const res = await fetch('/api/companies/with-balance', {
        credentials: 'include',
        headers: getAuthHeaders(),
      })
      
      if (!res.ok) {
        console.error('API error:', res.status, res.statusText)
        setCompanies([])
        return
      }
      
      const data = await res.json()
      if (Array.isArray(data)) {
        setCompanies(data)
      } else {
        console.error('API returned non-array data:', data)
        setCompanies([])
      }
    } catch (error) {
      console.error('Error:', error)
      setCompanies([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Yükleniyor...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Cariler</h1>
        <Link
          href="/admin/companies/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Yeni Cari Ekle
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Firma Unvanı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Vergi No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                İletişim Kişisi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Telefon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Bakiye
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!Array.isArray(companies) || companies.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  Henüz cari eklenmemiş.
                </td>
              </tr>
            ) : (
              companies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {company.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {company.taxId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {company.contactPerson || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {company.phone || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={company.balance > 0 ? 'text-red-600 font-semibold' : company.balance < 0 ? 'text-green-600 font-semibold' : 'text-gray-500'}>
                      {company.balance > 0 ? '+' : ''}{company.balance.toLocaleString('tr-TR')} ₺
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {company.balance > 0 ? '(Borçlu)' : company.balance < 0 ? '(Alacaklı)' : '(Ödendi)'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/companies/${company.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/admin/companies/${company.id}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
