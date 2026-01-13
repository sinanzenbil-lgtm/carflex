'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

interface HGSPassage {
  id: string
  passageDate: string
  amount: number
  location: string | null
  vehicle: {
    licensePlate: string
  }
  company: {
    name: string
  }
}

export default function HGSPage() {
  const { getAuthHeaders } = useAdmin()
  const [passages, setPassages] = useState<HGSPassage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPassages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchPassages = async () => {
    try {
      const res = await fetch('/api/hgs', {
        credentials: 'include',
        headers: getAuthHeaders(),
      })
      
      if (!res.ok) {
        console.error('API error:', res.status, res.statusText)
        setPassages([])
        return
      }
      
      const data = await res.json()
      if (Array.isArray(data)) {
        setPassages(data)
      } else {
        console.error('API returned non-array data:', data)
        setPassages([])
      }
    } catch (error) {
      console.error('Error:', error)
      setPassages([])
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
        <h1 className="text-3xl font-bold text-gray-800">HGS Geçişleri</h1>
        <Link
          href="/admin/hgs/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Geçiş Ekle
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tarih
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Plaka
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Cari
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Yer
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Tutar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!Array.isArray(passages) || passages.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Henüz geçiş eklenmemiş.
                </td>
              </tr>
            ) : (
              passages.map((passage) => (
                <tr key={passage.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {new Date(passage.passageDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {passage.vehicle.licensePlate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {passage.company.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {passage.location || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                    {passage.amount.toLocaleString('tr-TR')} ₺
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
