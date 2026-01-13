'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Car } from 'lucide-react'

interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  licensePlate: string
  transmission: string
  color: string | null
  isLongTerm: boolean
  isActive: boolean
  dailyPrice: number | null
  monthlyPrice: number | null
  images: string | null
  isPublished: boolean
}

function VehiclesContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState(type === 'short-term' ? 'short' : type === 'long-term' ? 'long' : 'all')

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      const res = await fetch('/api/vehicles')
      const data = await res.json()
      // Sadece aktif ve yayımlanan araçları göster
      setVehicles(data.filter((v: Vehicle) => v.isActive && v.isPublished))
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredVehicles = vehicles.filter(v => {
    if (filter === 'long') return v.isLongTerm
    if (filter === 'short') return !v.isLongTerm
    return true
  })

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Araç Kiralama</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'all' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setFilter('long')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'long' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              Uzun Dönem
            </button>
            <button
              onClick={() => setFilter('short')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'short' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              Kısa Dönem (Günlük)
            </button>
          </div>
        </div>

        {filteredVehicles.length === 0 ? (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Bu kategoride araç bulunmamaktadır.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => {
              let imageArray: string[] = []
              if (vehicle.images) {
                try {
                  imageArray = typeof vehicle.images === 'string' ? JSON.parse(vehicle.images) : []
                } catch {
                  imageArray = []
                }
              }
              return (
              <div key={vehicle.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                {imageArray.length > 0 ? (
                  <img
                    src={imageArray[0]}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <Car className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600 mb-4">
                    <p>Yıl: {vehicle.year}</p>
                    <p>Plaka: {vehicle.licensePlate}</p>
                    <p>Şanzıman: {vehicle.transmission}</p>
                    {vehicle.color && <p>Renk: {vehicle.color}</p>}
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-2xl font-bold text-primary-600">
                      {vehicle.isLongTerm
                        ? `${vehicle.monthlyPrice?.toLocaleString('tr-TR')} ₺/ay`
                        : `${vehicle.dailyPrice?.toLocaleString('tr-TR')} ₺/gün`}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {vehicle.isLongTerm ? 'Uzun Dönem' : 'Günlük Kiralama'}
                    </p>
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default function VehiclesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>}>
      <VehiclesContent />
    </Suspense>
  )
}
