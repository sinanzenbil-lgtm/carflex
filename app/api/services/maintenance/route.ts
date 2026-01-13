import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/api-helpers'

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')
    const selectedCompanyId = request.headers.get('x-selected-company-id')
    
    let where: any = {}
    
    if (userId) {
      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (user?.role !== 'super_admin') {
        where.vehicle = { userId }
      } else if (selectedCompanyId) {
        where.vehicle = { userId: selectedCompanyId }
      }
    }

    const maintenances = await prisma.maintenance.findMany({
      where,
      include: {
        vehicle: {
          select: {
            licensePlate: true,
            brand: true,
            model: true,
          }
        },
        company: {
          select: {
            name: true,
          }
        }
      },
      orderBy: {
        maintenanceDate: 'desc',
      },
    })

    return NextResponse.json(maintenances)
  } catch (error) {
    console.error('Error fetching maintenances:', error)
    return NextResponse.json(
      { error: 'Failed to fetch maintenances' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    const {
      vehicleId,
      companyId,
      maintenanceDate,
      type,
      price,
      kilometer,
      nextMaintenanceKm,
      details,
      notes,
    } = body

    const maintenance = await prisma.maintenance.create({
      data: {
        vehicleId,
        companyId,
        maintenanceDate: new Date(maintenanceDate),
        type,
        price: parseFloat(price),
        kilometer: parseFloat(kilometer),
        nextMaintenanceKm: nextMaintenanceKm ? parseFloat(nextMaintenanceKm) : null,
        details: details || null,
        notes: notes || null,
      },
    })

    // Aracın son kilometresini ve bir sonraki bakım kilometresini güncelle
    const updateData: any = { lastKilometer: parseFloat(kilometer) }
    if (nextMaintenanceKm) {
      updateData.nextMaintenanceKm = parseFloat(nextMaintenanceKm)
    }
    
    await prisma.vehicle.update({
      where: { id: vehicleId },
      data: updateData,
    })

    // Cari ekstresine borç olarak ekle
    await prisma.accountEntry.create({
      data: {
        companyId,
        type: 'debit',
        amount: parseFloat(price),
        date: new Date(maintenanceDate),
        description: `Bakım/Onarım - ${maintenance.id.slice(0, 8)}`,
        sourceType: 'maintenance',
        sourceId: maintenance.id,
      },
    })

    return NextResponse.json(maintenance, { status: 201 })
  } catch (error) {
    console.error('Error creating maintenance:', error)
    return NextResponse.json(
      { error: 'Failed to create maintenance' },
      { status: 500 }
    )
  }
}
