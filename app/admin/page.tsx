'use client'

import { useState, useEffect } from 'react'
import { useAdmin } from './context/AdminContext'

export default function AdminDashboard() {
  const { getAuthHeaders } = useAdmin()
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeRentals: 0,
    availableVehicles: 0,
    monthlyIncome: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const headers = getAuthHeaders()
      const [vehiclesRes, rentalsRes, incomesRes] = await Promise.all([
        fetch('/api/vehicles', { credentials: 'include', headers }),
        fetch('/api/rentals', { credentials: 'include', headers }),
        fetch('/api/finance/incomes', { credentials: 'include', headers }),
      ])

      const vehicles = await vehiclesRes.json()
      const rentals = await rentalsRes.json()
      const incomes = await incomesRes.json()

      // Array kontrolü
      const vehiclesArray = Array.isArray(vehicles) ? vehicles : []
      const rentalsArray = Array.isArray(rentals) ? rentals : []
      const incomesArray = Array.isArray(incomes) ? incomes : []

      // Aktif kiralama sözleşmelerindeki araç ID'lerini topla
      const activeRentals = rentalsArray.filter((r: any) => r.status === 'active')
      const rentedVehicleIds = new Set<string>()
      activeRentals.forEach((rental: any) => {
        rental.vehicles?.forEach((rv: any) => {
          rentedVehicleIds.add(rv.vehicleId)
        })
      })

      // Boşta olan araçlar (aktif kiralama sözleşmesinde olmayan ve aktif olan araçlar)
      const availableVehicles = vehiclesArray.filter((v: any) => 
        v.isActive && !rentedVehicleIds.has(v.id)
      ).length

      // Bu ayın gelirlerini hesapla
      const now = new Date()
      const currentMonth = now.getMonth()
      const currentYear = now.getFullYear()
      const monthlyIncome = incomesArray
        .filter((income: any) => {
          const incomeDate = new Date(income.date)
          return incomeDate.getMonth() === currentMonth && incomeDate.getFullYear() === currentYear
        })
        .reduce((sum: number, income: any) => sum + income.amount, 0)

      setStats({
        totalVehicles: vehiclesArray.length,
        activeRentals: activeRentals.length,
        availableVehicles,
        monthlyIncome,
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
        <div className="text-center py-8">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm mb-2">Toplam Araç</h3>
          <p className="text-3xl font-bold text-gray-800">{stats.totalVehicles}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm mb-2">Aktif Kiralama</h3>
          <p className="text-3xl font-bold text-gray-800">{stats.activeRentals}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm mb-2">Boşta Olan Araç</h3>
          <p className="text-3xl font-bold text-gray-800">{stats.availableVehicles}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm mb-2">Aylık Gelir</h3>
          <p className="text-3xl font-bold text-gray-800">{stats.monthlyIncome.toLocaleString('tr-TR')} ₺</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Son Aktiviteler</h2>
        <p className="text-gray-500">Henüz aktivite bulunmamaktadır.</p>
      </div>
    </div>
  )
}
