'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Company {
  id: string
  name: string
  taxId: string
  contactPerson: string | null
  phone: string | null
  email: string | null
  address: string | null
}

interface AccountEntry {
  id: string
  type: string
  amount: number
  date: string
  description: string | null
  sourceType: string | null
  rental?: { id: string }
  payment?: { id: string }
  hgsPassage?: { id: string }
}

export default function CompanyDetailPage() {
  const params = useParams()
  const [company, setCompany] = useState<Company | null>(null)
  const [entries, setEntries] = useState<AccountEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    if (params.id) {
      fetchCompany()
      fetchAccountEntries()
    }
  }, [params.id])

  const fetchCompany = async () => {
    try {
      const res = await fetch(`/api/companies/${params.id}`)
      const data = await res.json()
      setCompany(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchAccountEntries = async () => {
    try {
      const res = await fetch(`/api/companies/${params.id}/account-entries`)
      const data = await res.json()
      setEntries(data.entries)
      setBalance(data.balance)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Yükleniyor...</div>
  }

  if (!company) {
    return <div>Cari bulunamadı</div>
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/companies" className="text-gray-600 hover:text-gray-800">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">{company.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Firma Bilgileri</h2>
          <div className="space-y-2">
            <div>
              <span className="text-gray-600">Vergi No:</span>
              <span className="ml-2 font-medium">{company.taxId}</span>
            </div>
            {company.contactPerson && (
              <div>
                <span className="text-gray-600">İletişim Kişisi:</span>
                <span className="ml-2">{company.contactPerson}</span>
              </div>
            )}
            {company.phone && (
              <div>
                <span className="text-gray-600">Telefon:</span>
                <span className="ml-2">{company.phone}</span>
              </div>
            )}
            {company.email && (
              <div>
                <span className="text-gray-600">E-posta:</span>
                <span className="ml-2">{company.email}</span>
              </div>
            )}
            {company.address && (
              <div>
                <span className="text-gray-600">Adres:</span>
                <span className="ml-2">{company.address}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Güncel Bakiye</h2>
          <div className="text-3xl font-bold">
            <span className={balance > 0 ? 'text-red-600' : balance < 0 ? 'text-green-600' : 'text-gray-500'}>
              {balance > 0 ? '+' : ''}{balance.toLocaleString('tr-TR')} ₺
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {balance > 0 ? 'Firma size borçlu' : balance < 0 ? 'Firmaya borçlusunuz' : 'Bakiye sıfır'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Cari Ekstre</h2>
        {entries.length === 0 ? (
          <p className="text-gray-500">Henüz hareket bulunmamaktadır.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Açıklama
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Borç
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Alacak
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Bakiye
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map((entry, index) => {
                const runningBalance = entries.slice(0, index + 1).reduce((sum, e) => {
                  return sum + (e.type === 'debit' ? e.amount : -e.amount)
                }, 0)
                
                return (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(entry.date).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {entry.description || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      {entry.type === 'debit' ? (
                        <span className="text-red-600 font-medium">
                          {entry.amount.toLocaleString('tr-TR')} ₺
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      {entry.type === 'credit' ? (
                        <span className="text-green-600 font-medium">
                          {entry.amount.toLocaleString('tr-TR')} ₺
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                      <span className={runningBalance > 0 ? 'text-red-600' : runningBalance < 0 ? 'text-green-600' : 'text-gray-500'}>
                        {runningBalance > 0 ? '+' : ''}{runningBalance.toLocaleString('tr-TR')} ₺
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
