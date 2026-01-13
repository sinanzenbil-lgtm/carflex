import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPassword } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    console.log('Login attempt for email:', email)

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email ve şifre gereklidir' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      console.log('User not found for email:', email)
      return NextResponse.json(
        { error: 'Email veya şifre hatalı' },
        { status: 401 }
      )
    }

    console.log('User found:', user.email, 'Role:', user.role)
    console.log('Stored password hash:', user.password.substring(0, 20) + '...')
    
    const isValid = await verifyPassword(password, user.password)
    console.log('Password valid:', isValid)
    
    if (!isValid) {
      // Test: Şifreyi tekrar hash'le ve karşılaştır
      const testHash = await bcrypt.hash(password, 10)
      console.log('Test hash:', testHash.substring(0, 20) + '...')
      const directCompare = await bcrypt.compare(password, user.password)
      console.log('Direct compare result:', directCompare)
    }

    if (!isValid) {
      return NextResponse.json(
        { error: 'Email veya şifre hatalı' },
        { status: 401 }
      )
    }

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
    })

    // Cookie'yi manuel olarak set et
    response.cookies.set('userId', user.id, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    
    console.log('Login successful, userId:', user.id)

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Giriş yapılırken hata oluştu' },
      { status: 500 }
    )
  }
}
