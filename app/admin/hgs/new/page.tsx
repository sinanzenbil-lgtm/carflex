'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, X } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

interface Vehicle {
  id: string
  licensePlate: string
}

interface Company {
  id: string
  name: string
}

export default function NewHGSPage() {
  const router = useRouter()
  const { getAuthHeaders } = useAdmin()
  const [loading, setLoading] = useState(false)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [images, setImages] = useState<string[]>([])
  const [formData, setFormData] = useState({
    vehicleId: '',
    companyId: '',
    passageDate: new Date().toISOString().split('T')[0],
    amount: '',
    location: '',
  })

  useEffect(() => {
    fetchVehicles()
    fetchCompanies()
  }, [])

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.size > 2 * 1024 * 1024) {
        alert(`${file.name} dosyası 2MB'dan büyük. Lütfen daha küçük bir dosya seçin.`)
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setImages((prev) => [...prev, base64])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/hgs', {
        method: 'POST',
        credentials: 'include',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
          images: images.length > 0 ? JSON.stringify(images) : null,
        }),
      })

      if (res.ok) {
        router.push('/admin/hgs')
      } else {
        alert('Hata oluştu')
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
        <Link href="/admin/hgs" className="text-gray-600 hover:text-gray-800">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">HGS Geçişi Ekle</h1>
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
                  {vehicle.licensePlate}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cari *
            </label>
            <select
              required
              value={formData.companyId}
              onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
            >
              <option value="">Cari Seçin</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Geçiş Tarihi *
            </label>
            <input
              type="date"
              required
              value={formData.passageDate}
              onChange={(e) => setFormData({ ...formData, passageDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tutar (₺) *
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Geçiş Yeri
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
              placeholder="Örn: İstanbul-Ankara OGS"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Görüntüler
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
            <p className="text-xs text-gray-500 mt-1">JPG, PNG formatında, maksimum 2MB</p>
            
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Görüntü ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
            href="/admin/hgs"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
          >
            İptal
          </Link>
        </div>
      </form>
    </div>
  )
}
