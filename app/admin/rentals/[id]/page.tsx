'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus } from 'lucide-react'

interface Rental {
  id: string
  startDate: string
  renewalDate: string | null
  endDate: string | null
  amount: number
  vatAmount: number
  totalAmount: number
  status: string
  notes: string | null
  company: {
    id: string
    name: string
  }
  vehicles: {
    vehicle: {
      licensePlate: string
      brand: string
      model: string
    }
    price: number
  }[]
  payments: Payment[]
}

interface Payment {
  id: string
  amount: number
  paymentDate: string
  paymentType: string
  bank?: { name: string }
  cashRegister?: { name: string }
  posDevice?: { name: string }
}

export default function RentalDetailPage() {
  const params = useParams()
  const [rental, setRental] = useState<Rental | null>(null)
  const [loading, setLoading] = useState(true)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchRental()
    }
  }, [params.id])

  const fetchRental = async () => {
    try {
      const res = await fetch(`/api/rentals/${params.id}`)
      const data = await res.json()
      setRental(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalPaid = rental?.payments.reduce((sum, p) => sum + p.amount, 0) || 0
  const remaining = rental ? rental.totalAmount - totalPaid : 0

  if (loading) {
    return <div>Yükleniyor...</div>
  }

  if (!rental) {
    return <div>Sözleşme bulunamadı</div>
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/rentals" className="text-gray-600 hover:text-gray-800">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Kiralama Detayı</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Sözleşme Bilgileri</h2>
          <div className="space-y-2">
            <div>
              <span className="text-gray-600">Cari:</span>
              <span className="ml-2 font-medium">{rental.company.name}</span>
            </div>
            <div>
              <span className="text-gray-600">Başlangıç:</span>
              <span className="ml-2">{new Date(rental.startDate).toLocaleDateString('tr-TR')}</span>
            </div>
            {rental.renewalDate && (
              <div>
                <span className="text-gray-600">Yenileme:</span>
                <span className="ml-2">{new Date(rental.renewalDate).toLocaleDateString('tr-TR')}</span>
              </div>
            )}
            {rental.endDate && (
              <div>
                <span className="text-gray-600">Bitiş:</span>
                <span className="ml-2">{new Date(rental.endDate).toLocaleDateString('tr-TR')}</span>
              </div>
            )}
            <div>
              <span className="text-gray-600">Durum:</span>
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                rental.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {rental.status === 'active' ? 'Aktif' : 'Tamamlandı'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Araçlar</h2>
          <div className="space-y-2">
            {rental.vehicles.map((rv, i) => (
              <div key={i} className="flex justify-between">
                <span>{rv.vehicle.licensePlate} - {rv.vehicle.brand} {rv.vehicle.model}</span>
                <span className="font-medium">{rv.price.toLocaleString('tr-TR')} ₺</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Mali Bilgiler</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">KDV Hariç:</span>
              <span>{rental.amount.toLocaleString('tr-TR')} ₺</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">KDV (%20):</span>
              <span>{rental.vatAmount.toLocaleString('tr-TR')} ₺</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Toplam:</span>
              <span>{rental.totalAmount.toLocaleString('tr-TR')} ₺</span>
            </div>
            <div className="flex justify-between text-green-600 border-t pt-2">
              <span>Ödenen:</span>
              <span>{totalPaid.toLocaleString('tr-TR')} ₺</span>
            </div>
            <div className="flex justify-between text-red-600 font-semibold">
              <span>Kalan:</span>
              <span>{remaining.toLocaleString('tr-TR')} ₺</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tahsilatlar</h2>
          <button
            onClick={() => setShowPaymentModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Tahsilat Ekle
          </button>
        </div>

        {rental.payments.length === 0 ? (
          <p className="text-gray-500">Henüz tahsilat eklenmemiş</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tutar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ödeme Tipi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Detay
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rental.payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {new Date(payment.paymentDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {payment.amount.toLocaleString('tr-TR')} ₺
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {payment.paymentType === 'nakit' ? 'Nakit' :
                     payment.paymentType === 'kredi_karti' ? 'Kredi Kartı' : 'Banka'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.bank?.name || payment.cashRegister?.name || payment.posDevice?.name || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showPaymentModal && (
        <PaymentModal
          rentalId={rental.id}
          companyId={rental.company.id}
          onClose={() => {
            setShowPaymentModal(false)
            fetchRental()
          }}
        />
      )}
    </div>
  )
}

function PaymentModal({ rentalId, companyId, onClose }: { rentalId: string, companyId: string, onClose: () => void }) {
  const [formData, setFormData] = useState({
    amount: '',
    paymentDate: new Date().toISOString().split('T')[0],
    paymentType: 'nakit',
    bankId: '',
    cashRegisterId: '',
    posDeviceId: '',
    notes: '',
  })
  const [banks, setBanks] = useState<any[]>([])
  const [cashRegisters, setCashRegisters] = useState<any[]>([])
  const [posDevices, setPosDevices] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPaymentOptions()
  }, [])

  const fetchPaymentOptions = async () => {
    // Bu API'ler henüz oluşturulmadı, şimdilik boş
    // setBanks, setCashRegisters, setPosDevices
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          rentalId,
          companyId,
          amount: parseFloat(formData.amount),
        }),
      })

      if (res.ok) {
        onClose()
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Tahsilat Ekle</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ödeme Tipi *
              </label>
              <select
                required
                value={formData.paymentType}
                onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
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
                <select
                  value={formData.bankId}
                  onChange={(e) => setFormData({ ...formData, bankId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Banka Seçin</option>
                  {banks.map((bank) => (
                    <option key={bank.id} value={bank.id}>{bank.name}</option>
                  ))}
                </select>
                <Link href="/admin/banks/new" className="text-sm text-primary-600 mt-1 inline-block">
                  + Banka Ekle
                </Link>
              </div>
            )}

            {formData.paymentType === 'nakit' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kasa
                </label>
                <select
                  value={formData.cashRegisterId}
                  onChange={(e) => setFormData({ ...formData, cashRegisterId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Kasa Seçin</option>
                  {cashRegisters.map((cr) => (
                    <option key={cr.id} value={cr.id}>{cr.name}</option>
                  ))}
                </select>
                <Link href="/admin/cash-registers/new" className="text-sm text-primary-600 mt-1 inline-block">
                  + Kasa Ekle
                </Link>
              </div>
            )}

            {formData.paymentType === 'kredi_karti' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  POS Cihazı
                </label>
                <select
                  value={formData.posDeviceId}
                  onChange={(e) => setFormData({ ...formData, posDeviceId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">POS Seçin</option>
                  {posDevices.map((pos) => (
                    <option key={pos.id} value={pos.id}>{pos.name}</option>
                  ))}
                </select>
                <Link href="/admin/pos-devices/new" className="text-sm text-primary-600 mt-1 inline-block">
                  + POS Ekle
                </Link>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notlar
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
            >
              {loading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
