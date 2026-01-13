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

    const insurances = await prisma.trafficInsurance.findMany({
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

    return NextResponse.json(insurances)
  } catch (error) {
    console.error('Error fetching traffic insurances:', error)
    return NextResponse.json(
      { error: 'Failed to fetch traffic insurances' },
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

    const insurance = await prisma.trafficInsurance.create({
      data: {
        vehicleId,
        companyName,
        policyNumber,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        notes: notes || null,
      },
    })

    // Aracın sigorta bitiş tarihini güncelle
    await prisma.vehicle.update({
      where: { id: vehicleId },
      data: { insuranceEndDate: new Date(endDate) },
    })

    return NextResponse.json(insurance, { status: 201 })
  } catch (error) {
    console.error('Error creating traffic insurance:', error)
    return NextResponse.json(
      { error: 'Failed to create traffic insurance' },
      { status: 500 }
    )
  }
}
