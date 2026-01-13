'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Calendar } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

interface Income {
  id: string
  title: string
  amount: number
  date: string
}

interface Expense {
  id: string
  title: string
  amount: number
  date: string
}

interface Credit {
  id: string
  bankName: string
  totalAmount: number
  monthlyPayment: number
  installments: CreditInstallment[]
}

interface CreditInstallment {
  id: string
  installmentNumber: number
  dueDate: string
  total: number
  isPaid: boolean
}

export default function FinancePage() {
  const { getAuthHeaders } = useAdmin()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [incomes, setIncomes] = useState<Income[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [credits, setCredits] = useState<Credit[]>([])

  useEffect(() => {
    fetchFinanceData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate])

  const fetchFinanceData = async () => {
    try {
      const headers = getAuthHeaders()
      const [incomesRes, expensesRes, creditsRes] = await Promise.all([
        fetch('/api/finance/incomes', { credentials: 'include', headers }),
        fetch('/api/finance/expenses', { credentials: 'include', headers }),
        fetch('/api/finance/credits', { credentials: 'include', headers }),
      ])
      
      const incomesData = await incomesRes.json()
      const expensesData = await expensesRes.json()
      const creditsData = await creditsRes.json()

      setIncomes(Array.isArray(incomesData) ? incomesData : [])
      setExpenses(Array.isArray(expensesData) ? expensesData : [])
      setCredits(Array.isArray(creditsData) ? creditsData : [])
    } catch (error) {
      console.error('Error:', error)
      setIncomes([])
      setExpenses([])
      setCredits([])
    }
  }

  const monthIncomes = incomes.filter(i => {
    const date = new Date(i.date)
    return date.getMonth() === selectedDate.getMonth() && 
           date.getFullYear() === selectedDate.getFullYear()
  })

  const monthExpenses = expenses.filter(e => {
    const date = new Date(e.date)
    return date.getMonth() === selectedDate.getMonth() && 
           date.getFullYear() === selectedDate.getFullYear()
  })

  const monthCreditPayments = credits.flatMap(c => 
    c.installments.filter(inst => {
      const date = new Date(inst.dueDate)
      return !inst.isPaid && 
             date.getMonth() === selectedDate.getMonth() && 
             date.getFullYear() === selectedDate.getFullYear()
    })
  )

  const totalIncome = monthIncomes.reduce((sum, i) => sum + i.amount, 0)
  const totalExpense = monthExpenses.reduce((sum, e) => sum + e.amount, 0) +
                       monthCreditPayments.reduce((sum, c) => sum + c.total, 0)
  const net = totalIncome - totalExpense

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Finansal Yönetim</h1>
        <div className="flex gap-2">
          <Link
            href="/admin/finance/income/new"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Gelir Ekle
          </Link>
          <Link
            href="/admin/finance/expense/new"
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Gider Ekle
          </Link>
          <Link
            href="/admin/finance/credit/new"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Kredi Ekle
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tarih Seç
        </label>
        <input
          type="month"
          value={`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}`}
          onChange={(e) => {
            const [year, month] = e.target.value.split('-')
            setSelectedDate(new Date(parseInt(year), parseInt(month) - 1))
          }}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-sm text-gray-600 mb-2">Toplam Gelir</h3>
          <p className="text-3xl font-bold text-green-600">
            {totalIncome.toLocaleString('tr-TR')} ₺
          </p>
        </div>
        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="text-sm text-gray-600 mb-2">Toplam Gider</h3>
          <p className="text-3xl font-bold text-red-600">
            {totalExpense.toLocaleString('tr-TR')} ₺
          </p>
        </div>
        <div className={`p-6 rounded-lg ${net >= 0 ? 'bg-blue-50' : 'bg-orange-50'}`}>
          <h3 className="text-sm text-gray-600 mb-2">Net</h3>
          <p className={`text-3xl font-bold ${net >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
            {net.toLocaleString('tr-TR')} ₺
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Gelirler</h2>
          {monthIncomes.length === 0 ? (
            <p className="text-gray-500">Bu ay için gelir bulunmamaktadır.</p>
          ) : (
            <div className="space-y-2">
              {monthIncomes.map((income) => (
                <div key={income.id} className="flex justify-between p-2 hover:bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{income.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(income.date).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <p className="font-semibold text-green-600">
                    +{income.amount.toLocaleString('tr-TR')} ₺
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Giderler</h2>
          {monthExpenses.length === 0 && monthCreditPayments.length === 0 ? (
            <p className="text-gray-500">Bu ay için gider bulunmamaktadır.</p>
          ) : (
            <div className="space-y-2">
              {monthExpenses.map((expense) => (
                <div key={expense.id} className="flex justify-between p-2 hover:bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{expense.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <p className="font-semibold text-red-600">
                    -{expense.amount.toLocaleString('tr-TR')} ₺
                  </p>
                </div>
              ))}
              {monthCreditPayments.map((inst) => (
                <div key={inst.id} className="flex justify-between p-2 hover:bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">Kredi Taksiti</p>
                    <p className="text-sm text-gray-500">
                      {new Date(inst.dueDate).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <p className="font-semibold text-red-600">
                    -{inst.total.toLocaleString('tr-TR')} ₺
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
