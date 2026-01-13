'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

interface Payment {
  id: string
  amount: number
  paymentDate: string
  paymentType: string
  notes: string | null
  company: {
    name: string
    taxId: string
  }
  rental: {
    id: string
  } | null
  bank: {
    name: string
  } | null
  cashRegister: {
    name: string
  } | null
  posDevice: {
    name: string
  } | null
}

export default function PaymentsPage() {
  const { getAuthHeaders } = useAdmin()
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPayments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchPayments = async () => {
    try {
      const res = await fetch('/api/payments', {
        credentials: 'include',
        headers: getAuthHeaders(),
      })
      
      if (!res.ok) {
        console.error('API error:', res.status, res.statusText)
        setPayments([])
        return
      }
      
      const data = await res.json()
      if (Array.isArray(data)) {
        setPayments(data)
      } else {
        console.error('API returned non-array data:', data)
        setPayments([])
      }
    } catch (error) {
      console.error('Error fetching payments:', error)
      setPayments([])
    } finally {
      setLoading(false)
    }
  }

  const getPaymentTypeLabel = (type: string) => {
    switch (type) {
      case 'nakit':
        return 'Nakit'
      case 'kredi_karti':
        return 'Kredi Kartı'
      case 'banka':
        return 'Banka'
      default:
        return type
    }
  }

  const getPaymentSourceLabel = (payment: Payment) => {
    if (payment.bank) return payment.bank.name
    if (payment.cashRegister) return payment.cashRegister.name
    if (payment.posDevice) return payment.posDevice.name
    return '-'
  }

  if (loading) {
    return <div>Yükleniyor...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Tahsilatlar</h1>
        <Link
          href="/admin/payments/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Yeni Tahsilat Ekle
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tarih
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Cari
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tutar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Ödeme Tipi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Ödeme Cinsi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Kiralama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Notlar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!Array.isArray(payments) || payments.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  Henüz tahsilat eklenmemiş.
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(payment.paymentDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.company.name}
                    <div className="text-xs text-gray-500">Vergi No: {payment.company.taxId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.amount.toLocaleString('tr-TR')} ₺
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getPaymentTypeLabel(payment.paymentType)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getPaymentSourceLabel(payment)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.rental ? (
                      <Link
                        href={`/admin/rentals/${payment.rental.id}`}
                        className="text-primary-600 hover:text-primary-800"
                      >
                        {payment.rental.id.slice(0, 8)}
                      </Link>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {payment.notes || '-'}
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
