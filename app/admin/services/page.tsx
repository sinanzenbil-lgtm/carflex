'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

interface Vehicle {
  id: string
  licensePlate: string
  brand: string
  model: string
  year: number
  lastKilometer: number
  inspectionEndDate: string | null
  insuranceEndDate: string | null
  kaskoEndDate: string | null
  nextMaintenanceKm: number | null
}

export default function ServicesPage() {
  const { getAuthHeaders } = useAdmin()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVehicles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchVehicles = async () => {
    try {
      const res = await fetch('/api/vehicles', {
        credentials: 'include',
        headers: getAuthHeaders(),
      })
      
      if (!res.ok) {
        console.error('API error:', res.status, res.statusText)
        setVehicles([])
        return
      }
      
      const data = await res.json()
      if (Array.isArray(data)) {
        setVehicles(data)
      } else {
        console.error('API returned non-array data:', data)
        setVehicles([])
      }
    } catch (error) {
      console.error('Error:', error)
      setVehicles([])
    } finally {
      setLoading(false)
    }
  }

  const calculateMaintenanceRemaining = (vehicle: Vehicle): number | null => {
    if (!vehicle.nextMaintenanceKm) return null
    return vehicle.nextMaintenanceKm - vehicle.lastKilometer
  }

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('tr-TR')
  }

  const getDateColorClass = (dateString: string | null): { text: string; bg: string } => {
    if (!dateString) return { text: 'text-white font-semibold', bg: 'bg-red-600' }
    
    const date = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    date.setHours(0, 0, 0, 0)
    
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    // Tarih geçmişse - çok koyu kırmızı arka plan
    if (diffDays < 0) {
      return { text: 'text-white font-bold', bg: 'bg-red-900' }
    }
    
    // 1 aydan az kaldıysa - turuncu arka plan
    if (diffDays < 30) {
      return { text: 'text-white font-semibold', bg: 'bg-orange-500' }
    }
    
    // 2 aydan az kaldıysa - sarı arka plan
    if (diffDays < 60) {
      return { text: 'text-yellow-900 font-semibold', bg: 'bg-yellow-400' }
    }
    
    // Normal
    return { text: 'text-gray-900', bg: '' }
  }

  const getMaintenanceColorClass = (vehicle: Vehicle): { text: string; bg: string } => {
    const remaining = calculateMaintenanceRemaining(vehicle)
    
    if (remaining === null) {
      return { text: 'text-white font-semibold', bg: 'bg-red-600' }
    }
    
    // Bakım kilometresi geçmişse - çok koyu kırmızı arka plan
    if (remaining < 0) {
      return { text: 'text-white font-bold', bg: 'bg-red-900' }
    }
    
    // 3000 km'den az kaldıysa - turuncu arka plan
    if (remaining < 3000) {
      return { text: 'text-white font-semibold', bg: 'bg-orange-500' }
    }
    
    // 5000 km'den az kaldıysa - sarı arka plan
    if (remaining < 5000) {
      return { text: 'text-yellow-900 font-semibold', bg: 'bg-yellow-400' }
    }
    
    // Normal
    return { text: 'text-gray-900', bg: '' }
  }

  if (loading) {
    return <div>Yükleniyor...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Araçlar</h1>
        <Link
          href="/admin/vehicles/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Yeni Araç Ekle
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plaka
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marka / Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Yıl
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Muayene Geçerlilik Tarihi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sigorta Son Tarihi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kasko Son Tarihi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bakıma Kalan Kilometre
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehicles.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  Henüz araç bulunmamaktadır.
                </td>
              </tr>
            ) : (
              vehicles.map((vehicle) => {
                const maintenanceRemaining = calculateMaintenanceRemaining(vehicle)
                return (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {vehicle.licensePlate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vehicle.brand} {vehicle.model}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vehicle.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block px-4 py-1.5 rounded text-sm min-w-[120px] text-center ${getDateColorClass(vehicle.inspectionEndDate).text} ${getDateColorClass(vehicle.inspectionEndDate).bg}`}>
                        {formatDate(vehicle.inspectionEndDate)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block px-4 py-1.5 rounded text-sm min-w-[120px] text-center ${getDateColorClass(vehicle.insuranceEndDate).text} ${getDateColorClass(vehicle.insuranceEndDate).bg}`}>
                        {formatDate(vehicle.insuranceEndDate)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block px-4 py-1.5 rounded text-sm min-w-[120px] text-center ${getDateColorClass(vehicle.kaskoEndDate).text} ${getDateColorClass(vehicle.kaskoEndDate).bg}`}>
                        {formatDate(vehicle.kaskoEndDate)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block px-4 py-1.5 rounded text-sm min-w-[120px] text-center ${getMaintenanceColorClass(vehicle).text} ${getMaintenanceColorClass(vehicle).bg}`}>
                        {maintenanceRemaining !== null 
                          ? `${Math.abs(maintenanceRemaining).toLocaleString('tr-TR')} km${maintenanceRemaining < 0 ? ' (Geçmiş)' : ''}`
                          : '-'
                        }
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
