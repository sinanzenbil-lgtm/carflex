'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

interface Kasko {
  id: string
  companyName: string
  policyNumber: string
  startDate: string
  endDate: string
  vehicle: {
    licensePlate: string
    brand: string
    model: string
  }
}

export default function KaskoPage() {
  const { getAuthHeaders } = useAdmin()
  const [kaskos, setKaskos] = useState<Kasko[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchKaskos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchKaskos = async () => {
    try {
      const res = await fetch('/api/services/kasko', {
        credentials: 'include',
        headers: getAuthHeaders(),
      })
      
      if (!res.ok) {
        console.error('API error:', res.status, res.statusText)
        setKaskos([])
        return
      }
      
      const data = await res.json()
      if (Array.isArray(data)) {
        setKaskos(data)
      } else {
        console.error('API returned non-array data:', data)
        setKaskos([])
      }
    } catch (error) {
      console.error('Error:', error)
      setKaskos([])
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
        <h1 className="text-3xl font-bold text-gray-800">Kasko</h1>
        <Link
          href="/admin/services/kasko/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Kasko Ekle
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Araç
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kasko Firması
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Poliçe No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Başlangıç Tarihi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bitiş Tarihi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {kaskos.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Henüz kasko kaydı bulunmamaktadır.
                </td>
              </tr>
            ) : (
              kaskos.map((kasko) => (
                <tr key={kasko.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {kasko.vehicle.licensePlate} - {kasko.vehicle.brand} {kasko.vehicle.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {kasko.companyName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {kasko.policyNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(kasko.startDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(kasko.endDate).toLocaleDateString('tr-TR')}
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
