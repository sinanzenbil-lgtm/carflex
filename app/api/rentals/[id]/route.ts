import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/api-helpers'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const rental = await prisma.rental.findUnique({
      where: { id: params.id },
      include: {
        company: true,
        vehicles: {
          include: {
            vehicle: true,
          },
        },
        payments: {
          include: {
            bank: true,
            cashRegister: true,
            posDevice: true,
          },
          orderBy: { paymentDate: 'desc' },
        },
      },
    })

    if (!rental) {
      return NextResponse.json(
        { error: 'Rental not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(rental)
  } catch (error) {
    console.error('Error fetching rental:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rental' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error, user } = await requireAuth()
    if (error) return error

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

    // Mevcut rental'ı kontrol et
    const existingRental = await prisma.rental.findUnique({
      where: { id: params.id },
      include: {
        vehicles: true,
      },
    })

    if (!existingRental) {
      return NextResponse.json(
        { error: 'Rental not found' },
        { status: 404 }
      )
    }

    // Mevcut araçları sil
    await prisma.rentalVehicle.deleteMany({
      where: { rentalId: params.id },
    })

    // Rental'ı güncelle
    const rental = await prisma.rental.update({
      where: { id: params.id },
      data: {
        companyId,
        startDate: new Date(startDate),
        renewalDate: renewalDate ? new Date(renewalDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        amount: parseFloat(amount),
        vatAmount: parseFloat(vatAmount),
        totalAmount: parseFloat(totalAmount),
        vadeDays: vadeDays || 0,
        expectedIncomeDate: expectedIncomeDate ? new Date(expectedIncomeDate) : null,
        notes: notes || null,
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

    // Cari ekstresini güncelle
    const existingEntry = await prisma.accountEntry.findFirst({
      where: {
        rentalId: params.id,
        sourceType: 'rental',
      },
    })

    if (existingEntry) {
      await prisma.accountEntry.update({
        where: { id: existingEntry.id },
        data: {
          amount: totalAmount,
          date: new Date(startDate),
          description: `Kiralama sözleşmesi - ${rental.id.slice(0, 8)}`,
        },
      })
    } else {
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
    }

    // Finans takvimini güncelle
    const existingIncome = await prisma.income.findFirst({
      where: {
        rentalId: params.id,
      },
    })

    if (expectedIncomeDate) {
      if (existingIncome) {
        await prisma.income.update({
          where: { id: existingIncome.id },
          data: {
            amount: totalAmount,
            date: new Date(expectedIncomeDate),
            title: `Kiralama Geliri - ${rental.id.slice(0, 8)}`,
          },
        })
      } else {
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
    } else if (existingIncome) {
      await prisma.income.delete({
        where: { id: existingIncome.id },
      })
    }

    return NextResponse.json(rental)
  } catch (error: any) {
    console.error('Error updating rental:', error)
    return NextResponse.json(
      { error: 'Failed to update rental' },
      { status: 500 }
    )
  }
}
