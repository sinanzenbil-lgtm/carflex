import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, companyName, taxId, phone, logoUrl } = body

    console.log('Register attempt:', { 
      email, 
      hasPassword: !!password, 
      companyName, 
      taxId,
      hasLogo: !!logoUrl,
      logoSize: logoUrl ? logoUrl.length : 0
    })

    if (!email || !password || !companyName || !taxId) {
      console.log('Missing required fields')
      return NextResponse.json(
        { error: 'Email, şifre, firma ismi ve vergi numarası gereklidir' },
        { status: 400 }
      )
    }

    // Email kontrolü
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.log('Email already exists:', email)
      return NextResponse.json(
        { error: 'Bu email adresi zaten kullanılıyor' },
        { status: 400 }
      )
    }

    // Vergi numarası kontrolü (eğer taxId varsa)
    if (taxId && taxId.trim() !== '') {
      try {
        // Önce tüm kullanıcıları çekip taxId kontrolü yap
        const allUsers = await prisma.user.findMany()
        const taxIdExists = allUsers.some(u => u.taxId && u.taxId.trim() === taxId.trim())
        
        if (taxIdExists) {
          console.log('Tax ID already exists:', taxId)
          return NextResponse.json(
            { error: 'Bu vergi numarası zaten kullanılıyor' },
            { status: 400 }
          )
        }
      } catch (error: any) {
        console.error('Error checking taxId:', error)
        // Hata durumunda devam et, unique constraint database seviyesinde kontrol edilecek
      }
    }

    console.log('Hashing password...')
    const hashedPassword = await hashPassword(password)
    console.log('Password hashed successfully')

    console.log('Creating user in database...')
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        companyName,
        taxId,
        phone: phone || null,
        logoUrl: logoUrl || null,
        role: 'user', // Yeni kullanıcılar user olarak oluşturulur
      },
    })
    console.log('User created successfully:', user.id)

    // Hem cookie hem de response body'de userId döndür (localStorage için)
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        companyName: user.companyName,
        taxId: user.taxId,
        phone: user.phone,
        logoUrl: user.logoUrl,
        role: user.role,
      },
      userId: user.id, // localStorage için
    }, { status: 201 })

    // Cookie'yi manuel olarak set et
    response.cookies.set('userId', user.id, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    
    console.log('Register successful, userId:', user.id)

    return response
  } catch (error: any) {
    console.error('Register error:', error)
    
    // Daha detaylı hata mesajı
    let errorMessage = 'Kayıt olurken hata oluştu'
    
    if (error.code === 'P2002') {
      // Prisma unique constraint violation
      if (error.meta?.target?.includes('email')) {
        errorMessage = 'Bu email adresi zaten kullanılıyor'
      } else if (error.meta?.target?.includes('taxId')) {
        errorMessage = 'Bu vergi numarası zaten kullanılıyor'
      } else {
        errorMessage = 'Bu bilgiler zaten kayıtlı'
      }
    } else if (error.message) {
      errorMessage = error.message
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
