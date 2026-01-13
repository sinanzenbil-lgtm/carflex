import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/api-helpers'

export async function GET(request: NextRequest) {
  try {
    const { error, user } = await requireAuth()
    if (error) return error

    // Admin için seçili firma ID'sini header'dan al
    const selectedCompanyId = request.headers.get('x-selected-company-id')

    // Admin tüm araçları veya seçili firmanın araçlarını, user sadece kendi araçlarını görebilir
    const where = user?.role === 'super_admin' 
      ? (selectedCompanyId ? { userId: selectedCompanyId } : {}) 
      : { userId: user?.id }

    const vehicles = await prisma.vehicle.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(vehicles)
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vehicles' },
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
      brand,
      model,
      year,
      transmission,
      purchasePrice,
      licensePlate,
      licenseNumber,
      chassisNumber,
      engineNumber,
      color,
      damagedParts,
      paintedParts,
      replacedParts,
      inspectionReport,
      inspectionEndDate,
      insuranceEndDate,
      licenseDocument,
      insurancePolicy,
      lastKilometer,
      isLongTerm,
      dailyPrice,
      monthlyPrice,
      isPublished,
      images,
    } = body

    const vehicle = await prisma.vehicle.create({
      data: {
        // Admin seçili firma varsa onun userId'sini kullan, yoksa null (tüm firmalar için)
        // User için kendi userId'sini kullan
        userId: user?.role === 'super_admin' 
          ? (selectedCompanyId || null)
          : user?.id,
        brand,
        model,
        year: parseInt(year),
        transmission,
        purchasePrice: purchasePrice ? parseFloat(purchasePrice) : 0,
        licensePlate: licensePlate.toUpperCase(),
        licenseNumber,
        chassisNumber,
        engineNumber,
        color,
        damagedParts: damagedParts || null,
        paintedParts: paintedParts || null,
        replacedParts: replacedParts || null,
        inspectionReport: inspectionReport || null,
        inspectionEndDate: inspectionEndDate ? new Date(inspectionEndDate) : null,
        insuranceEndDate: insuranceEndDate ? new Date(insuranceEndDate) : null,
        licenseDocument: licenseDocument || null,
        insurancePolicy: insurancePolicy || null,
        lastKilometer: lastKilometer ? parseFloat(lastKilometer) : 0,
        isLongTerm: isLongTerm === true || isLongTerm === 'long',
        dailyPrice: dailyPrice ? parseFloat(dailyPrice) : null,
        monthlyPrice: monthlyPrice ? parseFloat(monthlyPrice) : null,
        isPublished: isPublished === true,
        images: images || null,
      },
    })

    return NextResponse.json(vehicle, { status: 201 })
  } catch (error: any) {
    console.error('Error creating vehicle:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Bu plaka zaten kayıtlı' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create vehicle' },
      { status: 500 }
    )
  }
}
