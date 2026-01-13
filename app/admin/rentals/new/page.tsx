'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

interface Vehicle {
  id: string
  licensePlate: string
  brand: string
  model: string
  year?: number
  isLongTerm: boolean
  isActive: boolean
  dailyPrice: number | null
  monthlyPrice: number | null
}

interface Company {
  id: string
  name: string
  taxId: string
}

export default function NewRentalPage() {
  const router = useRouter()
  const { getAuthHeaders } = useAdmin()
  const [loading, setLoading] = useState(false)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([])
  const [vehiclePrices, setVehiclePrices] = useState<Record<string, number>>({})
  const [loadingVehicles, setLoadingVehicles] = useState(true)
  const [companySearch, setCompanySearch] = useState('')
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false)
  const [vehicleSearch, setVehicleSearch] = useState('')
  const [formData, setFormData] = useState({
    companyId: '',
    startDate: new Date().toISOString().split('T')[0],
    renewalPeriodType: '', // 'same-day', 'first-of-month', 'quarterly', 'manual'
    renewalDate: '',
    endDate: '',
    vadeDays: 0,
    notes: '',
  })

  useEffect(() => {
    fetchVehicles()
    fetchCompanies()
  }, [])

  // Kira yenileme tarihini otomatik hesapla
  useEffect(() => {
    if (!formData.startDate || !formData.renewalPeriodType) {
      return
    }

    if (formData.renewalPeriodType === 'manual') {
      // Manuel seçildiğinde tarih alanı aktif kalır, değişiklik yapmıyoruz
      return
    }

    const startDate = new Date(formData.startDate)
    let renewalDate = new Date(startDate)

    if (formData.renewalPeriodType === 'same-day') {
      // Her ayın aynı günü - başlangıç tarihinin günü
      renewalDate.setMonth(renewalDate.getMonth() + 1)
      // Ay sonu kontrolü - eğer başlangıç tarihi ayın son günlerindeyse
      const startDay = startDate.getDate()
      const lastDayOfNextMonth = new Date(renewalDate.getFullYear(), renewalDate.getMonth() + 1, 0).getDate()
      renewalDate.setDate(Math.min(startDay, lastDayOfNextMonth))
    } else if (formData.renewalPeriodType === 'first-of-month') {
      // Her ayın biri
      renewalDate.setMonth(renewalDate.getMonth() + 1)
      renewalDate.setDate(1)
    } else if (formData.renewalPeriodType === 'quarterly') {
      // Her 3 ayda bir
      renewalDate.setMonth(renewalDate.getMonth() + 3)
    }

    setFormData(prev => ({
      ...prev,
      renewalDate: renewalDate.toISOString().split('T')[0]
    }))
  }, [formData.startDate, formData.renewalPeriodType])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.company-dropdown-container')) {
        setShowCompanyDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchVehicles = async () => {
    try {
      setLoadingVehicles(true)
      const res = await fetch('/api/vehicles', {
        credentials: 'include',
        headers: getAuthHeaders(),
      })
      const data = await res.json()
      const longTermVehicles = data.filter((v: Vehicle) => v.isLongTerm && v.isActive)
      setVehicles(longTermVehicles)
    } catch (error) {
      console.error('Error:', error)
      alert('Araçlar yüklenirken hata oluştu')
    } finally {
      setLoadingVehicles(false)
    }
  }

  const fetchCompanies = async () => {
    try {
      const res = await fetch('/api/companies', {
        credentials: 'include',
        headers: getAuthHeaders(),
      })
      const data = await res.json()
      setCompanies(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(companySearch.toLowerCase()) ||
    company.taxId.includes(companySearch)
  )

  const selectedCompany = companies.find(c => c.id === formData.companyId)

  const handleVehicleToggle = (vehicleId: string, price: number) => {
    if (selectedVehicles.includes(vehicleId)) {
      setSelectedVehicles(selectedVehicles.filter(id => id !== vehicleId))
      const newPrices = { ...vehiclePrices }
      delete newPrices[vehicleId]
      setVehiclePrices(newPrices)
    } else {
      setSelectedVehicles([...selectedVehicles, vehicleId])
      setVehiclePrices({ ...vehiclePrices, [vehicleId]: price })
    }
  }

  const calculateTotal = () => {
    // Araç fiyatları KDV dahil tutardır
    const total = Object.values(vehiclePrices).reduce((sum, price) => sum + price, 0)
    // KDV hariç = KDV dahil / 1.20
    const subtotal = total / 1.20
    // KDV = Toplam - KDV hariç
    const vat = total - subtotal
    return { subtotal, vat, total }
  }

  const calculateAutoPrice = () => {
    if (!formData.startDate || selectedVehicles.length === 0) {
      alert('Başlangıç tarihi ve en az bir araç seçmelisiniz')
      return
    }

    const startDate = new Date(formData.startDate)
    const newPrices: Record<string, number> = { ...vehiclePrices }

    selectedVehicles.forEach((vehicleId) => {
      const vehicle = vehicles.find(v => v.id === vehicleId)
      if (!vehicle || !vehicle.monthlyPrice) return

      // Araç fiyatı KDV dahil olduğu için direkt kullanıyoruz
      newPrices[vehicleId] = vehicle.monthlyPrice
    })

    setVehiclePrices(newPrices)
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedVehicles.length === 0) {
      alert('En az bir araç seçmelisiniz')
      return
    }

    if (!formData.companyId) {
      alert('Cari seçmelisiniz')
      return
    }

    if (!formData.renewalDate) {
      alert('Kira yenileme tarihi belirtmelisiniz')
      return
    }

    setLoading(true)

    const { subtotal, vat, total } = calculateTotal()
    const expectedIncomeDate = formData.vadeDays > 0
      ? new Date(new Date(formData.startDate).getTime() + formData.vadeDays * 24 * 60 * 60 * 1000)
      : null

    try {
      const res = await fetch('/api/rentals', {
        method: 'POST',
        credentials: 'include',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...formData,
          amount: subtotal, // KDV hariç
          vatAmount: vat, // KDV tutarı
          totalAmount: total, // KDV dahil toplam
          vehicleIds: selectedVehicles,
          vehiclePrices: vehiclePrices, // KDV dahil fiyatlar
          expectedIncomeDate: expectedIncomeDate?.toISOString(),
        }),
      })

      if (res.ok) {
        router.push('/admin/rentals')
      } else {
        const error = await res.json()
        alert(error.error || 'Hata oluştu')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const { subtotal, vat, total } = calculateTotal()

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/rentals" className="text-gray-600 hover:text-gray-800">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Yeni Kiralama Sözleşmesi</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="relative company-dropdown-container">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cari *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={selectedCompany ? `${selectedCompany.name} (${selectedCompany.taxId})` : companySearch}
                onChange={(e) => {
                  setCompanySearch(e.target.value)
                  setShowCompanyDropdown(true)
                  if (!e.target.value) {
                    setFormData({ ...formData, companyId: '' })
                  }
                }}
                onFocus={() => setShowCompanyDropdown(true)}
                placeholder="Cari ara..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 placeholder:text-gray-400 bg-white"
              />
              {showCompanyDropdown && (companySearch || filteredCompanies.length > 0) && filteredCompanies.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredCompanies.map((company) => (
                    <div
                      key={company.id}
                      onClick={() => {
                        setFormData({ ...formData, companyId: company.id })
                        setCompanySearch('')
                        setShowCompanyDropdown(false)
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="font-medium text-gray-900">{company.name}</div>
                      <div className="text-sm text-gray-600">Vergi No: {company.taxId}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/admin/companies/new"
              className="text-sm text-primary-600 hover:text-primary-700 mt-1 inline-block"
            >
              + Yeni Cari Ekle
            </Link>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kira Başlangıç Tarihi *
            </label>
            <input
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kira Yenileme Periyodu *
            </label>
            <select
              required
              value={formData.renewalPeriodType}
              onChange={(e) => setFormData({ ...formData, renewalPeriodType: e.target.value, renewalDate: '' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
            >
              <option value="">Seçiniz...</option>
              <option value="same-day">Her ayın aynı günü</option>
              <option value="first-of-month">Her ayın biri</option>
              <option value="quarterly">Her 3 ayda bir</option>
              <option value="manual">Manuel tarih</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kira Yenileme Tarihi *
            </label>
            <input
              type="date"
              required
              value={formData.renewalDate}
              onChange={(e) => setFormData({ ...formData, renewalDate: e.target.value })}
              disabled={formData.renewalPeriodType !== 'manual' && formData.renewalPeriodType !== ''}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 ${
                formData.renewalPeriodType !== 'manual' && formData.renewalPeriodType !== '' 
                  ? 'bg-gray-100 cursor-not-allowed' 
                  : ''
              }`}
            />
            {formData.renewalPeriodType && formData.renewalPeriodType !== 'manual' && (
              <p className="text-xs text-gray-500 mt-1">
                Tarih otomatik hesaplanmıştır
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kira Bitiş Tarihi
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vade Günü
            </label>
            <input
              type="number"
              value={formData.vadeDays}
              onChange={(e) => setFormData({ ...formData, vadeDays: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">
              Gelir tarihi: {formData.vadeDays > 0 && formData.startDate
                ? new Date(new Date(formData.startDate).getTime() + formData.vadeDays * 24 * 60 * 60 * 1000).toLocaleDateString('tr-TR')
                : 'Belirtilmedi'}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Araçlar *
            </label>
            <button
              type="button"
              onClick={calculateAutoPrice}
              className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Otomatik Hesapla
            </button>
          </div>
          <div className="mb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={vehicleSearch}
                onChange={(e) => setVehicleSearch(e.target.value)}
                placeholder="Plakaya göre ara..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 text-sm"
              />
            </div>
          </div>
          <div className="border border-gray-300 rounded-lg p-4 max-h-64 overflow-y-auto">
            {loadingVehicles ? (
              <p className="text-gray-500 text-center py-4">Araçlar yükleniyor...</p>
            ) : vehicles.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-500 mb-2">Uzun dönem araç bulunamadı</p>
                <Link
                  href="/admin/vehicles/new"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  + Yeni Araç Ekle
                </Link>
              </div>
            ) : (() => {
              const filteredVehicles = vehicles.filter(vehicle =>
                vehicle.licensePlate.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
                vehicle.brand.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
                vehicle.model.toLowerCase().includes(vehicleSearch.toLowerCase())
              ).slice(0, 5) // En fazla 5 araç göster
              return filteredVehicles.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Arama sonucu bulunamadı.</p>
              ) : (
                filteredVehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedVehicles.includes(vehicle.id)}
                      onChange={() => handleVehicleToggle(vehicle.id, vehicle.monthlyPrice || 0)}
                      className="w-4 h-4 text-primary-600"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">
                        {vehicle.licensePlate || 'Plaka Yok'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {vehicle.brand || ''} {vehicle.model || ''}
                        {vehicle.year && ` (${vehicle.year})`}
                      </div>
                      {vehicle.monthlyPrice && (
                        <div className="text-xs text-gray-500 mt-1">
                          Mevcut fiyat: {vehicle.monthlyPrice.toLocaleString('tr-TR')} ₺/ay (KDV Dahil)
                        </div>
                      )}
                    </div>
                  </div>
                  {selectedVehicles.includes(vehicle.id) && (
                    <div className="ml-4">
                      <label className="text-xs text-gray-500 block mb-1">Kira Fiyatı (₺) - KDV Dahil</label>
                      <input
                        type="number"
                        step="0.01"
                        value={vehiclePrices[vehicle.id] || vehicle.monthlyPrice || 0}
                        onChange={(e) => setVehiclePrices({
                          ...vehiclePrices,
                          [vehicle.id]: parseFloat(e.target.value) || 0
                        })}
                        className="w-32 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary-500 text-gray-900"
                        placeholder="Fiyat"
                      />
                    </div>
                  )}
                </div>
                ))
              )
            })()}
          </div>
        </div>

        {selectedVehicles.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Araç Kiralama Tutarları</h3>
            <div className="space-y-2 mb-4">
              {selectedVehicles.map((vehicleId) => {
                const vehicle = vehicles.find(v => v.id === vehicleId)
                const price = vehiclePrices[vehicleId] || 0
                return vehicle ? (
                  <div key={vehicleId} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    <span className="text-sm text-gray-700">
                      {vehicle.licensePlate} - {vehicle.brand} {vehicle.model}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {price.toLocaleString('tr-TR')} ₺
                    </span>
                  </div>
                ) : null
              })}
            </div>
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">KDV Hariç Toplam:</span>
                <span className="font-semibold text-gray-900">{subtotal.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">KDV (%20):</span>
                <span className="font-semibold text-gray-900">{vat.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span className="text-gray-800">Genel Toplam (KDV Dahil):</span>
                <span className="text-gray-900">{total.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺</span>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
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

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
          <Link
            href="/admin/rentals"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
          >
            İptal
          </Link>
        </div>
      </form>
    </div>
  )
}
