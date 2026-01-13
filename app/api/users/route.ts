import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
import { requireAdmin } from '@/lib/api-helpers'

export async function GET() {
  try {
    const { error } = await requireAdmin()
    if (error) return error

    // Tüm kullanıcıları (firmaları) listele
    const users = await prisma.user.findMany({
      where: {
        role: 'user', // Sadece normal kullanıcıları göster
      },
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
      orderBy: { companyName: 'asc' },
    })
    
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
