import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [maintenances, damages, inspections] = await Promise.all([
      prisma.maintenance.findMany({
        where: { vehicleId: params.id },
        include: { company: true },
        orderBy: { maintenanceDate: 'desc' },
      }),
      prisma.damage.findMany({
        where: { vehicleId: params.id },
        include: { company: true },
        orderBy: { damageDate: 'desc' },
      }),
      prisma.inspection.findMany({
        where: { vehicleId: params.id },
        orderBy: { inspectionDate: 'desc' },
      }),
    ])

    return NextResponse.json({
      maintenances,
      damages,
      inspections,
    })
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}
