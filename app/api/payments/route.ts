import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/api-helpers'

export async function GET(request: NextRequest) {
  try {
    const { error, user } = await requireAuth()
    if (error) return error

    // Admin için seçili firma ID'sini header'dan al
    const selectedCompanyId = request.headers.get('x-selected-company-id')

    // Admin tüm tahsilatları veya seçili firmanın tahsilatlarını, user sadece kendi tahsilatlarını görebilir
    let where: any = {}
    
    if (user?.role === 'super_admin') {
      // Admin için seçili firma varsa sadece o firmanın tahsilatlarını göster
      if (selectedCompanyId) {
        where = { companyId: selectedCompanyId }
      }
      // Seçili firma yoksa tüm tahsilatları göster
    } else {
      // User için kendi userId'sine ait rental'lardan company'leri bul
      const userRentals = await prisma.rental.findMany({
        where: { userId: user?.id },
        select: { companyId: true },
        distinct: ['companyId'],
      })
      const companyIds = userRentals.map(r => r.companyId)
      if (companyIds.length > 0) {
        where = { companyId: { in: companyIds } }
      } else {
        // Eğer user'ın company'si yoksa boş liste döndür
        return NextResponse.json([])
      }
    }

    const payments = await prisma.payment.findMany({
      where,
      include: {
        company: true,
        rental: {
          include: {
            vehicles: {
              include: {
                vehicle: true,
              },
            },
          },
        },
        bank: true,
        cashRegister: true,
        posDevice: true,
      },
      orderBy: { paymentDate: 'desc' },
    })

    return NextResponse.json(payments)
  } catch (error) {
    console.error('Error fetching payments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error, user } = await requireAuth()
    if (error) return error

    const body = await request.json()
    console.log('Payment creation request body:', body)
    
    const {
      rentalId,
      companyId,
      amount,
      paymentDate,
      paymentType,
      paymentSourceType, // 'rental', 'general', vb.
      bankId,
      cashRegisterId,
      posDeviceId,
      notes,
    } = body

    // Validation
    if (!companyId) {
      return NextResponse.json(
        { error: 'Company ID is required' },
        { status: 400 }
      )
    }

    if (!amount || parseFloat(amount) <= 0) {
      return NextResponse.json(
        { error: 'Valid amount is required' },
        { status: 400 }
      )
    }

    if (!paymentDate) {
      return NextResponse.json(
        { error: 'Payment date is required' },
        { status: 400 }
      )
    }

    if (!paymentType) {
      return NextResponse.json(
        { error: 'Payment type is required' },
        { status: 400 }
      )
    }

    // bankId, cashRegisterId ve posDeviceId boş string veya geçersiz ise null yap
    // Çünkü bunlar relation field'lar ve veritabanında mevcut ID'ler olmalı
    let finalBankId = null
    let finalCashRegisterId = null
    let finalPosDeviceId = null

    if (paymentType === 'banka' && bankId && bankId.trim() !== '') {
      // Eğer banka yönetimi henüz eklenmemişse, bankId'yi null bırak
      // İleride banka yönetimi eklendiğinde burada ID kontrolü yapılabilir
      finalBankId = null // Şimdilik null, çünkü banka yönetimi yok
    }

    if (paymentType === 'nakit' && cashRegisterId && cashRegisterId.trim() !== '') {
      finalCashRegisterId = null // Şimdilik null, çünkü kasa yönetimi yok
    }

    if (paymentType === 'kredi_karti' && posDeviceId && posDeviceId.trim() !== '') {
      finalPosDeviceId = null // Şimdilik null, çünkü POS yönetimi yok
    }

    // Tahsilatı oluştur
    console.log('Creating payment with data:', {
      rentalId: rentalId || null,
      companyId,
      amount: parseFloat(amount),
      paymentDate: new Date(paymentDate),
      paymentType,
      bankId: finalBankId,
      cashRegisterId: finalCashRegisterId,
      posDeviceId: finalPosDeviceId,
      notes: notes || null,
    })

    const payment = await prisma.payment.create({
      data: {
        rentalId: rentalId || null,
        companyId,
        amount: parseFloat(amount),
        paymentDate: new Date(paymentDate),
        paymentType,
        bankId: finalBankId,
        cashRegisterId: finalCashRegisterId,
        posDeviceId: finalPosDeviceId,
        notes: notes || null,
      },
    })

    console.log('Payment created successfully:', payment.id)

    // Cari ekstresine alacak olarak ekle
    try {
      await prisma.accountEntry.create({
        data: {
          companyId,
          type: 'credit',
          amount: parseFloat(amount),
          date: new Date(paymentDate),
          description: `Tahsilat - ${payment.id.slice(0, 8)}`,
          sourceType: 'payment',
          sourceId: payment.id,
          paymentId: payment.id,
          rentalId: rentalId || null,
        },
      })
      console.log('Account entry created successfully')
    } catch (accountEntryError: any) {
      console.error('Error creating account entry:', accountEntryError)
      // AccountEntry oluşturulamazsa payment'ı sil
      await prisma.payment.delete({ where: { id: payment.id } })
      throw accountEntryError
    }

    return NextResponse.json(payment, { status: 201 })
  } catch (error: any) {
    console.error('Error creating payment:', error)
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
    })
    return NextResponse.json(
      { 
        error: 'Failed to create payment',
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    )
  }
}
