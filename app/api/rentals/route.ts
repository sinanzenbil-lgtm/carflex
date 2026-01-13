import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/api-helpers'

export async function GET(request: NextRequest) {
  try {
    const { error, user } = await requireAuth()
    if (error) return error

    // Admin için seçili firma ID'sini header'dan al
    const selectedCompanyId = request.headers.get('x-selected-company-id')

    // Admin tüm kiralamaları veya seçili firmanın kiralamalarını, user sadece kendi kiralamalarını görebilir
    const where = user?.role === 'super_admin' 
      ? (selectedCompanyId ? { userId: selectedCompanyId } : {}) 
      : { userId: user?.id }

    const rentals = await prisma.rental.findMany({
      where,
      include: {
        company: true,
        vehicles: {
          include: {
            vehicle: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(rentals)
  } catch (error) {
    console.error('Error fetching rentals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rentals' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error, user } = await requireAuth()
    if (error) return error

    // Admin için seçili firma ID'sini header'dan al
    const selectedCompanyId = request.headers.get('x-selected-company-id')

    const body = await request.json()
    
    const {
      companyId,
      startDate,
      renewalDate,
      endDate,
      amount,
      vatAmount,
      totalAmount,
      vadeDays,
      vehicleIds,
      vehiclePrices,
      expectedIncomeDate,
      notes,
    } = body

    const vatRate = 0.20
    // Frontend'den gelen değerler zaten hesaplanmış (araç fiyatları KDV dahil)
    // amount = KDV hariç, vatAmount = KDV, totalAmount = KDV dahil

    // Kiralama sözleşmesini oluştur
    const rental = await prisma.rental.create({
      data: {
        // Admin seçili firma varsa onun userId'sini kullan, yoksa null (tüm firmalar için)
        // User için kendi userId'sini kullan
        userId: user?.role === 'super_admin' 
          ? (selectedCompanyId || null)
          : user?.id,
        companyId,
        startDate: new Date(startDate),
        renewalDate: renewalDate ? new Date(renewalDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        renewalPeriod: null,
        amount: parseFloat(amount), // KDV hariç
        vatRate,
        vatAmount: parseFloat(vatAmount), // KDV tutarı
        totalAmount: parseFloat(totalAmount), // KDV dahil toplam
        vadeDays: vadeDays || 0,
        expectedIncomeDate: expectedIncomeDate ? new Date(expectedIncomeDate) : null,
        notes: notes || null,
        status: 'active',
        vehicles: {
          create: vehicleIds.map((vehicleId: string) => ({
            vehicleId,
            price: vehiclePrices[vehicleId],
          })),
        },
      },
      include: {
        vehicles: {
          include: {
            vehicle: true,
          },
        },
      },
    })

    // Cari ekstresine borç olarak ekle
    await prisma.accountEntry.create({
      data: {
        companyId,
        type: 'debit',
        amount: totalAmount,
        date: new Date(startDate),
        description: `Kiralama sözleşmesi - ${rental.id.slice(0, 8)}`,
        sourceType: 'rental',
        sourceId: rental.id,
        rentalId: rental.id,
      },
    })

    // Finans takvimine gelir ekle (eğer vade günü belirtilmişse)
    if (expectedIncomeDate) {
      await prisma.income.create({
        data: {
          title: `Kiralama Geliri - ${rental.id.slice(0, 8)}`,
          amount: totalAmount,
          date: new Date(expectedIncomeDate),
          source: 'rental',
          rentalId: rental.id,
        },
      })
    }

    return NextResponse.json(rental, { status: 201 })
  } catch (error: any) {
    console.error('Error creating rental:', error)
    return NextResponse.json(
      { error: 'Failed to create rental' },
      { status: 500 }
    )
  }
}
