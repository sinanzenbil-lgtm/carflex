'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

interface Inspection {
  id: string
  inspectionDate: string
  nextInspectionDate: string | null
  result: string | null
  vehicle: {
    licensePlate: string
    brand: string
    model: string
  }
}

export default function InspectionPage() {
  const { getAuthHeaders } = useAdmin()
  const [inspections, setInspections] = useState<Inspection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInspections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchInspections = async () => {
    try {
      const res = await fetch('/api/services/inspection', {
        credentials: 'include',
        headers: getAuthHeaders(),
      })
      
      if (!res.ok) {
        console.error('API error:', res.status, res.statusText)
        setInspections([])
        return
      }
      
      const data = await res.json()
      if (Array.isArray(data)) {
        setInspections(data)
      } else {
        console.error('API returned non-array data:', data)
        setInspections([])
      }
    } catch (error) {
      console.error('Error:', error)
      setInspections([])
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
        <h1 className="text-3xl font-bold text-gray-800">Muayene</h1>
        <Link
          href="/admin/services/inspection/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Muayene Ekle
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
                Muayene Tarihi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Son Muayene Geçerlilik Tarihi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sonuç
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inspections.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  Henüz muayene kaydı bulunmamaktadır.
                </td>
              </tr>
            ) : (
              inspections.map((inspection) => (
                <tr key={inspection.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {inspection.vehicle.licensePlate} - {inspection.vehicle.brand} {inspection.vehicle.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(inspection.inspectionDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {inspection.nextInspectionDate 
                      ? new Date(inspection.nextInspectionDate).toLocaleDateString('tr-TR')
                      : '-'
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {inspection.result ? (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        inspection.result === 'geçti' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {inspection.result === 'geçti' ? 'Geçti' : 'Kaldı'}
                      </span>
                    ) : (
                      '-'
                    )}
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
