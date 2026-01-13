'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

interface TrafficInsurance {
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

export default function TrafficInsurancePage() {
  const { getAuthHeaders } = useAdmin()
  const [insurances, setInsurances] = useState<TrafficInsurance[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInsurances()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchInsurances = async () => {
    try {
      const res = await fetch('/api/services/traffic-insurance', {
        credentials: 'include',
        headers: getAuthHeaders(),
      })
      
      if (!res.ok) {
        console.error('API error:', res.status, res.statusText)
        setInsurances([])
        return
      }
      
      const data = await res.json()
      if (Array.isArray(data)) {
        setInsurances(data)
      } else {
        console.error('API returned non-array data:', data)
        setInsurances([])
      }
    } catch (error) {
      console.error('Error:', error)
      setInsurances([])
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
        <h1 className="text-3xl font-bold text-gray-800">Trafik Sigortası</h1>
        <Link
          href="/admin/services/traffic-insurance/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Trafik Sigortası Ekle
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
                Sigorta Firması
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
            {insurances.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Henüz trafik sigortası kaydı bulunmamaktadır.
                </td>
              </tr>
            ) : (
              insurances.map((insurance) => (
                <tr key={insurance.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {insurance.vehicle.licensePlate} - {insurance.vehicle.brand} {insurance.vehicle.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {insurance.companyName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {insurance.policyNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(insurance.startDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(insurance.endDate).toLocaleDateString('tr-TR')}
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
