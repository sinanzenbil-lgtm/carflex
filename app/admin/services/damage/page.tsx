'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

interface Damage {
  id: string
  damageDate: string
  kilometer: number
  description: string | null
  repairCost: number | null
  vehicle: {
    licensePlate: string
    brand: string
    model: string
  }
  company: {
    name: string
  }
}

export default function DamagePage() {
  const { getAuthHeaders } = useAdmin()
  const [damages, setDamages] = useState<Damage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDamages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchDamages = async () => {
    try {
      const res = await fetch('/api/services/damage', {
        credentials: 'include',
        headers: getAuthHeaders(),
      })
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        console.error('API error:', res.status, res.statusText, errorData)
        alert(`Hata: ${errorData.error || errorData.details || 'Bilinmeyen hata'}`)
        setDamages([])
        return
      }
      
      const data = await res.json()
      console.log('Damages data:', data)
      if (Array.isArray(data)) {
        setDamages(data)
      } else {
        console.error('API returned non-array data:', data)
        setDamages([])
      }
    } catch (error) {
      console.error('Error fetching damages:', error)
      setDamages([])
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
        <h1 className="text-3xl font-bold text-gray-800">Hasar</h1>
        <Link
          href="/admin/services/damage/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Hasar Ekle
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tarih
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Araç
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kilometre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Açıklama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Onarım Maliyeti
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Firma
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {damages.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  Henüz hasar kaydı bulunmamaktadır.
                </td>
              </tr>
            ) : (
              damages.map((damage) => (
                <tr key={damage.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(damage.damageDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {damage.vehicle?.licensePlate || '-'} - {damage.vehicle?.brand || ''} {damage.vehicle?.model || ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {damage.kilometer?.toLocaleString('tr-TR') || 0} km
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {damage.description || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {damage.repairCost 
                      ? `${damage.repairCost.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺`
                      : '-'
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {damage.company?.name || '-'}
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
