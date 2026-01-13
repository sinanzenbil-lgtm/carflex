import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/api-helpers'

export async function GET(request: NextRequest) {
  try {
    const { error, user } = await requireAuth()
    if (error) return error

    // Admin için seçili firma ID'sini header'dan al
    const selectedCompanyId = request.headers.get('x-selected-company-id')

    // Income tablosundaki tüm gelirleri çek
    let incomeWhere: any = {}
    
    // Kiralama sözleşmelerini de gelir olarak ekle
    let rentalWhere: any = {}
    
    if (user?.role === 'super_admin') {
      if (selectedCompanyId) {
        rentalWhere = { userId: selectedCompanyId }
      }
    } else {
      rentalWhere = { userId: user?.id }
    }

    // Income kayıtlarını çek
    const incomes = await prisma.income.findMany({
      where: incomeWhere,
      orderBy: { date: 'desc' },
    })
    
    // Income kayıtları için rental bilgilerini ayrı çek
    const incomeRentals = await prisma.rental.findMany({
      where: {
        id: { in: incomes.filter(i => i.rentalId).map(i => i.rentalId!) },
      },
      include: {
        company: true,
      },
    })
    
    // Income kayıtlarına rental bilgilerini ekle
    const incomesWithRental = incomes.map(income => ({
      ...income,
      rental: income.rentalId ? incomeRentals.find(r => r.id === income.rentalId) ? {
        company: incomeRentals.find(r => r.id === income.rentalId)!.company,
      } : null : null,
    }))

    // Kiralama sözleşmelerini çek (expectedIncomeDate olan veya olmayan tüm aktif kiralamalar)
    const rentals = await prisma.rental.findMany({
      where: {
        ...rentalWhere,
        status: 'active',
      },
      include: {
        company: true,
      },
      orderBy: { startDate: 'desc' },
    })

    // Kiralama sözleşmelerini gelir formatına dönüştür
    // Eğer zaten Income tablosunda varsa (rentalId ile), onu kullan
    // Yoksa kiralama sözleşmesini gelir olarak ekle
    const rentalIncomes: any[] = rentals.map(rental => {
      // Bu kiralama için Income kaydı var mı kontrol et
      const existingIncome = incomes.find(inc => inc.rentalId === rental.id)
      
      if (existingIncome) {
        // Zaten Income tablosunda var, onu kullan
        return null
      } else {
        // Income tablosunda yok, kiralama sözleşmesini gelir olarak ekle
        return {
          id: `rental-${rental.id}`,
          title: `Kiralama Geliri - ${rental.id.slice(0, 8)}`,
          amount: rental.totalAmount,
          date: rental.expectedIncomeDate || rental.startDate,
          source: 'rental',
          rentalId: rental.id,
          notes: null,
          rental: {
            company: rental.company,
          },
        }
      }
    }).filter((item): item is any => item !== null) // null değerleri filtrele

    // Tüm gelirleri birleştir
    const allIncomes = [...incomesWithRental, ...rentalIncomes]

    // Tarihe göre sırala
    allIncomes.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA
    })

    return NextResponse.json(allIncomes)
  } catch (error) {
    console.error('Error fetching incomes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch incomes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const income = await prisma.income.create({
      data: {
        title: body.title,
        amount: parseFloat(body.amount),
        date: new Date(body.date),
        source: body.source || null,
        rentalId: body.rentalId || null,
        notes: body.notes || null,
      },
    })

    return NextResponse.json(income, { status: 201 })
  } catch (error) {
    console.error('Error creating income:', error)
    return NextResponse.json(
      { error: 'Failed to create income' },
      { status: 500 }
    )
  }
}
