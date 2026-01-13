import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: params.id },
      include: {
        rentalVehicles: {
          include: {
            rental: {
              include: {
                company: true,
              },
            },
          },
        },
        maintenances: {
          include: {
            company: true,
          },
          orderBy: { maintenanceDate: 'desc' },
        },
        damages: {
          include: {
            company: true,
          },
          orderBy: { damageDate: 'desc' },
        },
        inspections: {
          orderBy: { inspectionDate: 'desc' },
        },
      },
    })

    if (!vehicle) {
      return NextResponse.json(
        { error: 'Vehicle not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(vehicle)
  } catch (error) {
    console.error('Error fetching vehicle:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vehicle' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const userId = request.headers.get('x-user-id')
    
    console.log('=== PUT REQUEST START ===')
    console.log('Body received:', JSON.stringify(body, null, 2))
    console.log('Body isPublished:', body.isPublished, typeof body.isPublished)
    
    // Önce mevcut aracı kontrol et
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id: params.id },
    })

    if (!existingVehicle) {
      return NextResponse.json(
        { error: 'Araç bulunamadı' },
        { status: 404 }
      )
    }

    // userId kontrolü - super_admin değilse sadece kendi araçlarını güncelleyebilir
    if (userId && existingVehicle.userId && existingVehicle.userId !== userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      })
      
      if (user?.role !== 'super_admin') {
        return NextResponse.json(
          { error: 'Bu aracı güncelleme yetkiniz yok' },
          { status: 403 }
        )
      }
    }
    
    // Mevcut veriyi temel al, sadece gönderilen alanları güncelle
    const updateData: any = {}
    
    // Zorunlu alanlar - her zaman güncelle
    if (body.brand !== undefined) {
      updateData.brand = String(body.brand).trim() || existingVehicle.brand
    }
    if (body.model !== undefined) {
      updateData.model = String(body.model).trim() || existingVehicle.model
    }
    if (body.year !== undefined) {
      const yearVal = typeof body.year === 'number' ? body.year : parseInt(String(body.year))
      updateData.year = !isNaN(yearVal) ? yearVal : existingVehicle.year
    }
    if (body.transmission !== undefined) {
      updateData.transmission = String(body.transmission).trim() || existingVehicle.transmission
    }
    if (body.purchasePrice !== undefined) {
      const priceVal = typeof body.purchasePrice === 'number' ? body.purchasePrice : parseFloat(String(body.purchasePrice))
      updateData.purchasePrice = !isNaN(priceVal) ? priceVal : existingVehicle.purchasePrice
    }
    if (body.licensePlate !== undefined) {
      updateData.licensePlate = String(body.licensePlate).trim().toUpperCase() || existingVehicle.licensePlate
    }
    if (body.lastKilometer !== undefined) {
      const kmVal = typeof body.lastKilometer === 'number' ? body.lastKilometer : parseFloat(String(body.lastKilometer))
      updateData.lastKilometer = !isNaN(kmVal) ? kmVal : (existingVehicle.lastKilometer || 0)
    }
    
    // Null olabilen string alanlar - sadece gönderilmişse güncelle
    if (body.licenseNumber !== undefined) {
      updateData.licenseNumber = body.licenseNumber && String(body.licenseNumber).trim() !== '' ? String(body.licenseNumber).trim() : null
    }
    if (body.chassisNumber !== undefined) {
      updateData.chassisNumber = body.chassisNumber && String(body.chassisNumber).trim() !== '' ? String(body.chassisNumber).trim() : null
    }
    if (body.engineNumber !== undefined) {
      updateData.engineNumber = body.engineNumber && String(body.engineNumber).trim() !== '' ? String(body.engineNumber).trim() : null
    }
    if (body.color !== undefined) {
      updateData.color = body.color && String(body.color).trim() !== '' ? String(body.color).trim() : null
    }
    if (body.inspectionReport !== undefined) {
      updateData.inspectionReport = body.inspectionReport && String(body.inspectionReport).trim() !== '' ? String(body.inspectionReport).trim() : null
    }
    if (body.licenseDocument !== undefined) {
      updateData.licenseDocument = body.licenseDocument && String(body.licenseDocument).trim() !== '' ? String(body.licenseDocument) : null
    }
    if (body.insurancePolicy !== undefined) {
      updateData.insurancePolicy = body.insurancePolicy && String(body.insurancePolicy).trim() !== '' ? String(body.insurancePolicy) : null
    }
    
    // JSON string alanlar
    if (body.damagedParts !== undefined) {
      updateData.damagedParts = body.damagedParts && String(body.damagedParts).trim() !== '' ? String(body.damagedParts) : null
    }
    if (body.paintedParts !== undefined) {
      updateData.paintedParts = body.paintedParts && String(body.paintedParts).trim() !== '' ? String(body.paintedParts) : null
    }
    if (body.replacedParts !== undefined) {
      updateData.replacedParts = body.replacedParts && String(body.replacedParts).trim() !== '' ? String(body.replacedParts) : null
    }
    if (body.images !== undefined) {
      updateData.images = body.images && String(body.images).trim() !== '' ? String(body.images) : null
    }
    
    // Null olabilen Float alanlar
    if (body.dailyPrice !== undefined) {
      if (body.dailyPrice && body.dailyPrice !== '') {
        const priceVal = typeof body.dailyPrice === 'number' ? body.dailyPrice : parseFloat(String(body.dailyPrice))
        updateData.dailyPrice = !isNaN(priceVal) ? priceVal : null
      } else {
        updateData.dailyPrice = null
      }
    }
    if (body.monthlyPrice !== undefined) {
      if (body.monthlyPrice && body.monthlyPrice !== '') {
        const priceVal = typeof body.monthlyPrice === 'number' ? body.monthlyPrice : parseFloat(String(body.monthlyPrice))
        updateData.monthlyPrice = !isNaN(priceVal) ? priceVal : null
      } else {
        updateData.monthlyPrice = null
      }
    }
    if (body.nextMaintenanceKm !== undefined) {
      if (body.nextMaintenanceKm && body.nextMaintenanceKm !== '') {
        const kmVal = typeof body.nextMaintenanceKm === 'number' ? body.nextMaintenanceKm : parseFloat(String(body.nextMaintenanceKm))
        updateData.nextMaintenanceKm = !isNaN(kmVal) ? kmVal : null
      } else {
        updateData.nextMaintenanceKm = null
      }
    }
    
    // Boolean alanlar - her zaman boolean'a çevir (false değerleri de dahil)
    if (body.isLongTerm !== undefined) {
      if (typeof body.isLongTerm === 'boolean') {
        updateData.isLongTerm = body.isLongTerm
      } else if (typeof body.isLongTerm === 'string') {
        updateData.isLongTerm = body.isLongTerm === 'true' || body.isLongTerm === 'long'
      } else {
        updateData.isLongTerm = Boolean(body.isLongTerm)
      }
    }
    if (body.isActive !== undefined) {
      if (typeof body.isActive === 'boolean') {
        updateData.isActive = body.isActive
      } else if (typeof body.isActive === 'string') {
        updateData.isActive = body.isActive === 'true' || body.isActive === 'active'
      } else {
        updateData.isActive = Boolean(body.isActive)
      }
    }
    if (body.isPublished !== undefined) {
      // Kesinlikle boolean'a çevir
      if (typeof body.isPublished === 'boolean') {
        updateData.isPublished = body.isPublished === true
      } else if (typeof body.isPublished === 'string') {
        updateData.isPublished = body.isPublished === 'true' || body.isPublished === '1'
      } else {
        updateData.isPublished = Boolean(body.isPublished)
      }
      // Son kontrol - kesinlikle boolean olmalı
      if (typeof updateData.isPublished !== 'boolean') {
        console.error('CRITICAL: isPublished is still not boolean after conversion!', updateData.isPublished, typeof updateData.isPublished)
        updateData.isPublished = Boolean(updateData.isPublished)
      }
    }
    
    // Tarih alanları
    if (body.inspectionEndDate !== undefined) {
      updateData.inspectionEndDate = body.inspectionEndDate && String(body.inspectionEndDate).trim() !== '' ? new Date(body.inspectionEndDate) : null
    }
    if (body.insuranceEndDate !== undefined) {
      updateData.insuranceEndDate = body.insuranceEndDate && String(body.insuranceEndDate).trim() !== '' ? new Date(body.insuranceEndDate) : null
    }
    if (body.kaskoEndDate !== undefined) {
      updateData.kaskoEndDate = body.kaskoEndDate && String(body.kaskoEndDate).trim() !== '' ? new Date(body.kaskoEndDate) : null
    }

    // Undefined, null string ve geçersiz değerleri temizle
    Object.keys(updateData).forEach(key => {
      const value = updateData[key]
      if (value === undefined) {
        delete updateData[key]
      } else if (typeof value === 'string' && value.trim() === '') {
        // Boş string'leri null'a çevir (opsiyonel alanlar için)
        if (['licenseNumber', 'chassisNumber', 'engineNumber', 'color', 'inspectionReport', 'licenseDocument', 'insurancePolicy'].includes(key)) {
          updateData[key] = null
        } else {
          delete updateData[key]
        }
      }
    })

    // Boolean alanların gerçekten boolean olduğundan emin ol - son kontrol
    if ('isLongTerm' in updateData && typeof updateData.isLongTerm !== 'boolean') {
      updateData.isLongTerm = Boolean(updateData.isLongTerm)
    }
    if ('isActive' in updateData && typeof updateData.isActive !== 'boolean') {
      updateData.isActive = Boolean(updateData.isActive)
    }
    if ('isPublished' in updateData && typeof updateData.isPublished !== 'boolean') {
      updateData.isPublished = Boolean(updateData.isPublished)
    }

    // Prisma'ya gönderilecek veriyi hazırla - sadece geçerli değerleri ekle
    const prismaUpdateData: any = {}
    
    // Tüm alanları kontrol et ve sadece geçerli olanları ekle
    for (const [key, value] of Object.entries(updateData)) {
      // Undefined değerleri atla
      if (value === undefined) {
        continue
      }
      
      // Boolean alanlar için özel kontrol - kesinlikle boolean olmalı
      if (key === 'isLongTerm' || key === 'isActive' || key === 'isPublished') {
        // Her durumda boolean'a çevir
        const boolValue = value === true || value === 'true' || value === 1 || value === '1'
        prismaUpdateData[key] = boolValue
        console.log(`Boolean field ${key}: ${value} -> ${boolValue} (${typeof boolValue})`)
      } else {
        // Diğer alanlar için direkt ekle
        prismaUpdateData[key] = value
      }
    }
    
    // Son kontrol - boolean alanlar kesinlikle boolean olmalı
    if ('isPublished' in prismaUpdateData) {
      prismaUpdateData.isPublished = prismaUpdateData.isPublished === true
    }
    if ('isActive' in prismaUpdateData) {
      prismaUpdateData.isActive = prismaUpdateData.isActive === true
    }
    if ('isLongTerm' in prismaUpdateData) {
      prismaUpdateData.isLongTerm = prismaUpdateData.isLongTerm === true
    }
    
    console.log('=== PRISMA UPDATE DATA ===')
    console.log('Keys:', Object.keys(prismaUpdateData))
    console.log('Full data:', JSON.stringify(prismaUpdateData, null, 2))
    console.log('Boolean fields final:', {
      isPublished: prismaUpdateData.isPublished,
      isPublishedType: typeof prismaUpdateData.isPublished,
      isActive: prismaUpdateData.isActive,
      isActiveType: typeof prismaUpdateData.isActive,
      isLongTerm: prismaUpdateData.isLongTerm,
      isLongTermType: typeof prismaUpdateData.isLongTerm,
    })
    
    // Prisma client'ını kontrol et
    console.log('Prisma client Vehicle model has isPublished:', 'isPublished' in (prisma.vehicle as any).fields || 'isPublished' in prisma.vehicle)

    const vehicle = await prisma.vehicle.update({
      where: { id: params.id },
      data: prismaUpdateData,
    })

    return NextResponse.json(vehicle)
  } catch (error: any) {
    console.error('Error updating vehicle:', error)
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
      cause: error.cause,
    })
    console.error('Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2))
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Bu plaka zaten kayıtlı' },
        { status: 400 }
      )
    }
    
    // Prisma hatası için daha detaylı mesaj
    const errorMessage = error.message || 'Failed to update vehicle'
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error.code,
        meta: error.meta,
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.vehicle.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Vehicle deleted' })
  } catch (error) {
    console.error('Error deleting vehicle:', error)
    return NextResponse.json(
      { error: 'Failed to delete vehicle' },
      { status: 500 }
    )
  }
}
