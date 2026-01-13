'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

interface Company {
  id: string
  name: string
  taxId: string
}

interface Rental {
  id: string
  startDate: string
  companyId: string
  company: {
    id: string
    name: string
  }
  vehicles: {
    vehicle: {
      licensePlate: string
    }
  }[]
}

export default function NewPaymentPage() {
  const router = useRouter()
  const { getAuthHeaders } = useAdmin()
  const [loading, setLoading] = useState(false)
  const [companies, setCompanies] = useState<Company[]>([])
  const [rentals, setRentals] = useState<Rental[]>([])
  const [companySearch, setCompanySearch] = useState('')
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false)
  const [formData, setFormData] = useState({
    companyId: '',
    rentalId: '',
    amount: '',
    paymentDate: new Date().toISOString().split('T')[0],
    paymentType: 'nakit',
    paymentSourceType: 'general', // 'rental' veya 'general'
    bankId: '',
    cashRegisterId: '',
    posDeviceId: '',
    notes: '',
  })

  useEffect(() => {
    fetchCompanies()
  }, [])

  useEffect(() => {
    if (formData.companyId) {
      fetchRentals()
    } else {
      setRentals([])
    }
  }, [formData.companyId])

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

  const fetchRentals = async () => {
    try {
      const res = await fetch('/api/rentals', {
        credentials: 'include',
        headers: getAuthHeaders(),
      })
      const data = await res.json()
      // Sadece seçili cariye ait kiralamaları filtrele
      const filteredRentals = data.filter((r: Rental) => {
        return r.companyId === formData.companyId || r.company?.id === formData.companyId
      })
      setRentals(filteredRentals)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(companySearch.toLowerCase()) ||
    company.taxId.includes(companySearch)
  )

  const selectedCompany = companies.find(c => c.id === formData.companyId)
  const selectedRental = rentals.find(r => r.id === formData.rentalId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.companyId) {
      alert('Cari seçmelisiniz')
      return
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert('Geçerli bir tutar girmelisiniz')
      return
    }

    // Banka, kasa ve POS yönetimi henüz eklenmediği için validation kaldırıldı
    // Bu alanlar şimdilik opsiyonel

    setLoading(true)

    const requestBody = {
      ...formData,
      amount: parseFloat(formData.amount),
      rentalId: formData.rentalId || null,
    }

    console.log('Sending payment request:', requestBody)

    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        credentials: 'include',
        headers: getAuthHeaders(),
        body: JSON.stringify(requestBody),
      })

      console.log('Response status:', res.status)
      console.log('Response ok:', res.ok)

      if (res.ok) {
        const data = await res.json()
        console.log('Payment created successfully:', data)
        router.push('/admin/payments')
      } else {
        let errorMessage = 'Hata oluştu'
        try {
          const error = await res.json()
          console.error('Payment creation error:', error)
          errorMessage = error.details || error.error || errorMessage
        } catch (e) {
          console.error('Error parsing response:', e)
          errorMessage = `HTTP ${res.status}: ${res.statusText}`
        }
        alert(errorMessage)
      }
    } catch (error: any) {
      console.error('Error:', error)
      alert(error?.message || 'Hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/payments" className="text-gray-600 hover:text-gray-800">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Yeni Tahsilat Ekle</h1>
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
                    setFormData({ ...formData, companyId: '', rentalId: '' })
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
                        setFormData({ ...formData, companyId: company.id, rentalId: '' })
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
              Tahsilat Tipi
            </label>
            <select
              value={formData.paymentSourceType}
              onChange={(e) => setFormData({ ...formData, paymentSourceType: e.target.value, rentalId: '' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
            >
              <option value="general">Genel Tahsilat</option>
              <option value="rental">Kiralama Tahsilatı</option>
            </select>
          </div>

          {formData.paymentSourceType === 'rental' && formData.companyId && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kiralama Sözleşmesi
              </label>
              <select
                value={formData.rentalId}
                onChange={(e) => setFormData({ ...formData, rentalId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
              >
                <option value="">Kiralama seçiniz...</option>
                {rentals.map((rental) => (
                  <option key={rental.id} value={rental.id}>
                    {rental.id.slice(0, 8)} - {new Date(rental.startDate).toLocaleDateString('tr-TR')} - {rental.vehicles.map(v => v.vehicle.licensePlate).join(', ')}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tutar *
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tarih *
            </label>
            <input
              type="date"
              required
              value={formData.paymentDate}
              onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ödeme Cinsi *
            </label>
            <select
              required
              value={formData.paymentType}
              onChange={(e) => setFormData({ 
                ...formData, 
                paymentType: e.target.value,
                bankId: '',
                cashRegisterId: '',
                posDeviceId: '',
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
            >
              <option value="nakit">Nakit</option>
              <option value="kredi_karti">Kredi Kartı</option>
              <option value="banka">Banka</option>
            </select>
          </div>

          {formData.paymentType === 'banka' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banka
              </label>
              <input
                type="text"
                value={formData.bankId}
                onChange={(e) => setFormData({ ...formData, bankId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
                placeholder="Banka adı"
              />
              <p className="text-xs text-gray-500 mt-1">
                Not: Banka yönetimi yakında eklenecek
              </p>
            </div>
          )}

          {formData.paymentType === 'nakit' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kasa
              </label>
              <input
                type="text"
                value={formData.cashRegisterId}
                onChange={(e) => setFormData({ ...formData, cashRegisterId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
                placeholder="Kasa adı"
              />
              <p className="text-xs text-gray-500 mt-1">
                Not: Kasa yönetimi yakında eklenecek
              </p>
            </div>
          )}

          {formData.paymentType === 'kredi_karti' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                POS Cihazı
              </label>
              <input
                type="text"
                value={formData.posDeviceId}
                onChange={(e) => setFormData({ ...formData, posDeviceId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
                placeholder="POS cihazı adı"
              />
              <p className="text-xs text-gray-500 mt-1">
                Not: POS cihazı yönetimi yakında eklenecek
              </p>
            </div>
          )}
        </div>

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
            href="/admin/payments"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
          >
            İptal
          </Link>
        </div>
      </form>
    </div>
  )
}
