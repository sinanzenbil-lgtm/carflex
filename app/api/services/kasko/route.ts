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

    const kaskos = await prisma.kasko.findMany({
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
        startDate: 'desc',
      },
    })

    return NextResponse.json(kaskos)
  } catch (error) {
    console.error('Error fetching kaskos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch kaskos' },
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
      companyName,
      policyNumber,
      startDate,
      endDate,
      notes,
    } = body

    const kasko = await prisma.kasko.create({
      data: {
        vehicleId,
        companyName,
        policyNumber,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        notes: notes || null,
      },
    })

    // Aracın kasko bitiş tarihini güncelle
    await prisma.vehicle.update({
      where: { id: vehicleId },
      data: { kaskoEndDate: new Date(endDate) },
    })

    return NextResponse.json(kasko, { status: 201 })
  } catch (error) {
    console.error('Error creating kasko:', error)
    return NextResponse.json(
      { error: 'Failed to create kasko' },
      { status: 500 }
    )
  }
}
