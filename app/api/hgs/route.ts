import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const passages = await prisma.hGSPassage.findMany({
      include: {
        vehicle: true,
        company: true,
      },
      orderBy: { passageDate: 'desc' },
    })
    return NextResponse.json(passages)
  } catch (error) {
    console.error('Error fetching HGS passages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch HGS passages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      vehicleId,
      companyId,
      passageDate,
      amount,
      location,
      images,
    } = body

    const passage = await prisma.hGSPassage.create({
      data: {
        vehicleId,
        companyId,
        passageDate: new Date(passageDate),
        amount: parseFloat(amount),
        location: location || null,
        images: images || null,
      },
    })

    // Cari ekstresine borç olarak ekle
    await prisma.accountEntry.create({
      data: {
        companyId,
        type: 'debit',
        amount: parseFloat(amount),
        date: new Date(passageDate),
        description: `HGS Geçişi - ${passage.id.slice(0, 8)}`,
        sourceType: 'hgs',
        sourceId: passage.id,
        hgsPassageId: passage.id,
      },
    })

    return NextResponse.json(passage, { status: 201 })
  } catch (error: any) {
    console.error('Error creating HGS passage:', error)
    return NextResponse.json(
      { error: 'Failed to create HGS passage' },
      { status: 500 }
    )
  }
}
