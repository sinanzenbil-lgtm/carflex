'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  licensePlate: string
  transmission: string
  isActive: boolean
  isLongTerm: boolean
  dailyPrice: number | null
  monthlyPrice: number | null
}

export default function VehiclesPage() {
  const { getAuthHeaders } = useAdmin()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

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
      // API'den dönen veri bir array olmalı
      if (Array.isArray(data)) {
        setVehicles(data)
      } else {
        console.error('API returned non-array data:', data)
        setVehicles([])
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      setVehicles([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu aracı silmek istediğinize emin misiniz?')) return
    
    try {
      const res = await fetch(`/api/vehicles/${id}`, { 
        method: 'DELETE',
        credentials: 'include',
        headers: getAuthHeaders(),
      })
      if (res.ok) {
        fetchVehicles()
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error)
    }
  }

  const filteredVehicles = Array.isArray(vehicles) 
    ? vehicles.filter(vehicle =>
        vehicle.licensePlate?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

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

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Plakaya göre ara..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plaka
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marka/Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Yıl
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Şanzıman
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tip
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fiyat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredVehicles.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  {searchTerm ? 'Arama sonucu bulunamadı.' : 'Henüz araç eklenmemiş.'}
                </td>
              </tr>
            ) : (
              filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {vehicle.licensePlate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehicle.brand} {vehicle.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehicle.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehicle.transmission}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehicle.isLongTerm ? 'Uzun Dönem' : 'Kısa Dönem'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehicle.isLongTerm 
                      ? `${vehicle.monthlyPrice?.toLocaleString('tr-TR')} ₺/ay`
                      : `${vehicle.dailyPrice?.toLocaleString('tr-TR')} ₺/gün`
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      vehicle.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {vehicle.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/vehicles/${vehicle.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/admin/vehicles/${vehicle.id}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(vehicle.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
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
