'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Eye, Edit } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

interface Rental {
  id: string
  startDate: string
  endDate: string | null
  amount: number
  totalAmount: number
  status: string
  company: {
    name: string
  }
  vehicles: {
    vehicle: {
      licensePlate: string
      brand: string
      model: string
    }
  }[]
}

export default function RentalsPage() {
  const { getAuthHeaders } = useAdmin()
  const [rentals, setRentals] = useState<Rental[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRentals()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchRentals = async () => {
    try {
      const res = await fetch('/api/rentals', {
        credentials: 'include',
        headers: getAuthHeaders(),
      })
      
      if (!res.ok) {
        console.error('API error:', res.status, res.statusText)
        setRentals([])
        return
      }
      
      const data = await res.json()
      if (Array.isArray(data)) {
        setRentals(data)
      } else {
        console.error('API returned non-array data:', data)
        setRentals([])
      }
    } catch (error) {
      console.error('Error fetching rentals:', error)
      setRentals([])
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
        <h1 className="text-3xl font-bold text-gray-800">Kiralama Sözleşmeleri</h1>
        <Link
          href="/admin/rentals/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Yeni Kiralama Ekle
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Sözleşme No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Cari
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Araçlar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Başlangıç
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Bitiş
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tutar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Durum
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!Array.isArray(rentals) || rentals.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  Henüz kiralama sözleşmesi eklenmemiş.
                </td>
              </tr>
            ) : (
              rentals.map((rental) => (
                <tr key={rental.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {rental.id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {rental.company.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {rental.vehicles.map((v, i) => (
                      <span key={i}>
                        {v.vehicle.licensePlate} ({v.vehicle.brand} {v.vehicle.model})
                        {i < rental.vehicles.length - 1 && ', '}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(rental.startDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {rental.endDate ? new Date(rental.endDate).toLocaleDateString('tr-TR') : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {rental.totalAmount.toLocaleString('tr-TR')} ₺
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      rental.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : rental.status === 'completed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {rental.status === 'active' ? 'Aktif' : rental.status === 'completed' ? 'Tamamlandı' : 'İptal'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/rentals/${rental.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/admin/rentals/${rental.id}/edit`}
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
