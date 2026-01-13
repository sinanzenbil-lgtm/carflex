'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

interface Maintenance {
  id: string
  maintenanceDate: string
  type: string
  price: number
  kilometer: number
  nextMaintenanceKm: number | null
  details: string | null
  vehicle: {
    licensePlate: string
    brand: string
    model: string
  }
  company: {
    name: string
  }
}

export default function MaintenancePage() {
  const { getAuthHeaders } = useAdmin()
  const [maintenances, setMaintenances] = useState<Maintenance[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMaintenances()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMaintenances = async () => {
    try {
      const res = await fetch('/api/services/maintenance', {
        credentials: 'include',
        headers: getAuthHeaders(),
      })
      
      if (!res.ok) {
        console.error('API error:', res.status, res.statusText)
        setMaintenances([])
        return
      }
      
      const data = await res.json()
      if (Array.isArray(data)) {
        setMaintenances(data)
      } else {
        console.error('API returned non-array data:', data)
        setMaintenances([])
      }
    } catch (error) {
      console.error('Error:', error)
      setMaintenances([])
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
        <h1 className="text-3xl font-bold text-gray-800">Bakım Onarım</h1>
        <Link
          href="/admin/services/maintenance/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Bakım/Onarım Ekle
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
                Tip
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kilometre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sonraki Bakım Km
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tutar (KDV Dahil)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Firma
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Açıklama
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {maintenances.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  Henüz bakım kaydı bulunmamaktadır.
                </td>
              </tr>
            ) : (
              maintenances.map((maintenance) => (
                <tr key={maintenance.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(maintenance.maintenanceDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {maintenance.vehicle.licensePlate} - {maintenance.vehicle.brand} {maintenance.vehicle.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {maintenance.type === 'bakim' ? 'Bakım' : 'Onarım'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {maintenance.kilometer.toLocaleString('tr-TR')} km
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {maintenance.nextMaintenanceKm 
                      ? `${maintenance.nextMaintenanceKm.toLocaleString('tr-TR')} km`
                      : '-'
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {maintenance.price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {maintenance.company.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {maintenance.details || '-'}
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
