import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

    const inspections = await prisma.inspection.findMany({
      where,
      include: {
        vehicle: {
          select: {
            licensePlate: true,
            brand: true,
            model: true,
          }
        }
      },
      orderBy: {
        inspectionDate: 'desc',
      },
    })

    return NextResponse.json(inspections)
  } catch (error) {
    console.error('Error fetching inspections:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inspections' },
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
      inspectionDate,
      nextInspectionDate,
      result,
      notes,
    } = body

    const inspection = await prisma.inspection.create({
      data: {
        vehicleId,
        inspectionDate: new Date(inspectionDate),
        nextInspectionDate: nextInspectionDate ? new Date(nextInspectionDate) : null,
        result: result || null,
        notes: notes || null,
      },
    })

    // Aracın muayene bitiş tarihini güncelle
    if (nextInspectionDate) {
      await prisma.vehicle.update({
        where: { id: vehicleId },
        data: { inspectionEndDate: new Date(nextInspectionDate) },
      })
    }

    return NextResponse.json(inspection, { status: 201 })
  } catch (error) {
    console.error('Error creating inspection:', error)
    return NextResponse.json(
      { error: 'Failed to create inspection' },
      { status: 500 }
    )
  }
}
