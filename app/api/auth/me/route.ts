import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Önce cookie'den oku
    let user = await getCurrentUser()
    
    // Eğer cookie'de yoksa, request header'ından userId'yi al (localStorage'dan gönderilmiş olabilir)
    if (!user) {
      const userId = request.headers.get('x-user-id')
      if (userId) {
        user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            email: true,
            name: true,
            companyName: true,
            taxId: true,
            phone: true,
            logoUrl: true,
            role: true,
          },
        })
      }
    }
    
    if (!user) {
      console.log('No user found in /api/auth/me')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Error in /api/auth/me:', error)
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
}
