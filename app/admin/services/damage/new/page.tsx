'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useAdmin } from '../../../context/AdminContext'

interface Company {
  id: string
  name: string
}

interface Vehicle {
  id: string
  licensePlate: string
  brand: string
  model: string
}

export default function NewDamagePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { getAuthHeaders } = useAdmin()
  const vehicleId = searchParams.get('vehicleId')
  
  const [loading, setLoading] = useState(false)
  const [companies, setCompanies] = useState<Company[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [formData, setFormData] = useState({
    vehicleId: vehicleId || '',
    companyId: '',
    damageDate: new Date().toISOString().split('T')[0],
    kilometer: '',
    description: '',
    repairCost: '',
    notes: '',
  })

  useEffect(() => {
    fetchCompanies()
    fetchVehicles()
  }, [])

  const fetchCompanies = async () => {
    try {
      const res = await fetch('/api/companies', {
        credentials: 'include',
        headers: getAuthHeaders(),
      })
      const data = await res.json()
      if (Array.isArray(data)) {
        setCompanies(data)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/services/damage', {
        method: 'POST',
        credentials: 'include',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...formData,
          kilometer: parseFloat(formData.kilometer),
          repairCost: formData.repairCost ? parseFloat(formData.repairCost) : null,
          images: null, // Fotoğraf yükleme özelliği daha sonra eklenecek
        }),
      })

      if (res.ok) {
        router.push('/admin/services/damage')
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
        <h1 className="text-3xl font-bold text-gray-800">Hasar Ekle</h1>
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
              Firma *
            </label>
            <select
              required
              value={formData.companyId}
              onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
            >
              <option value="">Firma Seçin</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hasar Tarihi *
            </label>
            <input
              type="date"
              required
              value={formData.damageDate}
              onChange={(e) => setFormData({ ...formData, damageDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kilometre *
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.kilometer}
              onChange={(e) => setFormData({ ...formData, kilometer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Onarım Maliyeti (₺)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.repairCost}
              onChange={(e) => setFormData({ ...formData, repairCost: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Açıklama
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
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
            href="/admin/services/damage"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
          >
            İptal
          </Link>
        </div>
      </form>
    </div>
  )
}
