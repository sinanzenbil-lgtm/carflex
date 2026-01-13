'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useAdmin } from '../../../context/AdminContext'

interface Vehicle {
  id: string
  licensePlate: string
  brand: string
  model: string
}

export default function NewInspectionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { getAuthHeaders } = useAdmin()
  const vehicleId = searchParams.get('vehicleId')
  
  const [loading, setLoading] = useState(false)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [formData, setFormData] = useState({
    vehicleId: vehicleId || '',
    inspectionDate: new Date().toISOString().split('T')[0],
    nextInspectionDate: '',
    result: '',
    notes: '',
  })

  useEffect(() => {
    fetchVehicles()
    // Muayene tarihi değiştiğinde otomatik olarak 2 yıl ekle
    if (formData.inspectionDate) {
      const inspectionDate = new Date(formData.inspectionDate)
      const nextDate = new Date(inspectionDate)
      nextDate.setFullYear(nextDate.getFullYear() + 2)
      setFormData(prev => ({
        ...prev,
        nextInspectionDate: nextDate.toISOString().split('T')[0]
      }))
    }
  }, [formData.inspectionDate])

  const fetchVehicles = async () => {
    try {
      const res = await fetch('/api/vehicles', {
        credentials: 'include',
        headers: getAuthHeaders(),
      })
      const data = await res.json()
      if (Array.isArray(data)) {
        setVehicles(data)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleInspectionDateChange = (date: string) => {
    const inspectionDate = new Date(date)
    const nextDate = new Date(inspectionDate)
    nextDate.setFullYear(nextDate.getFullYear() + 2)
    
    setFormData({
      ...formData,
      inspectionDate: date,
      nextInspectionDate: nextDate.toISOString().split('T')[0]
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/services/inspection', {
        method: 'POST',
        credentials: 'include',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...formData,
          nextInspectionDate: formData.nextInspectionDate || null,
          result: formData.result || null,
        }),
      })

      if (res.ok) {
        router.push('/admin/services/inspection')
      } else {
        const errorData = await res.json().catch(() => ({}))
        alert(errorData.error || 'Hata oluştu')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/services" className="text-gray-600 hover:text-gray-800">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Muayene Ekle</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Araç *
            </label>
            <select
              required
              value={formData.vehicleId}
              onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
            >
              <option value="">Araç Seçin</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.licensePlate} - {vehicle.brand} {vehicle.model}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Muayene Ne Zaman Yapıldı (Muayene Tarihi) *
            </label>
            <input
              type="date"
              required
              value={formData.inspectionDate}
              onChange={(e) => handleInspectionDateChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Son Muayene Geçerlilik Tarihi
            </label>
            <input
              type="date"
              value={formData.nextInspectionDate}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
            />
            <p className="text-xs text-gray-500 mt-1">Otomatik olarak 2 yıl sonrası hesaplanır</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sonuç
            </label>
            <select
              value={formData.result}
              onChange={(e) => setFormData({ ...formData, result: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
            >
              <option value="">Seçin</option>
              <option value="geçti">Geçti</option>
              <option value="kaldı">Kaldı</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notlar
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
          <Link
            href="/admin/services/inspection"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
          >
            İptal
          </Link>
        </div>
      </form>
    </div>
  )
}
