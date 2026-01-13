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

    const damages = await prisma.damage.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
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
        damageDate: 'desc',
      },
    })

    return NextResponse.json(damages || [])
  } catch (error: any) {
    console.error('Error fetching damages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch damages', details: error?.message || String(error) },
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
      damageDate,
      kilometer,
      description,
      images,
      repairCost,
      notes,
    } = body

    const damage = await prisma.damage.create({
      data: {
        vehicleId,
        companyId,
        damageDate: new Date(damageDate),
        kilometer: parseFloat(kilometer),
        description: description || null,
        images: images ? (Array.isArray(images) ? JSON.stringify(images) : images) : null,
        repairCost: repairCost ? parseFloat(repairCost) : null,
        notes: notes || null,
      },
    })

    // Aracın son kilometresini güncelle
    await prisma.vehicle.update({
      where: { id: vehicleId },
      data: { lastKilometer: parseFloat(kilometer) },
    })

    // Eğer onarım maliyeti varsa cari ekstresine ekle
    if (repairCost) {
      await prisma.accountEntry.create({
        data: {
          companyId,
          type: 'debit',
          amount: parseFloat(repairCost),
          date: new Date(damageDate),
          description: `Hasar Onarımı - ${damage.id.slice(0, 8)}`,
          sourceType: 'damage',
          sourceId: damage.id,
        },
      })
    }

    return NextResponse.json(damage, { status: 201 })
  } catch (error) {
    console.error('Error creating damage:', error)
    return NextResponse.json(
      { error: 'Failed to create damage' },
      { status: 500 }
    )
  }
}
