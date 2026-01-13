import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const entries = await prisma.accountEntry.findMany({
      where: { companyId: params.id },
      include: {
        rental: true,
        payment: true,
        hgsPassage: true,
      },
      orderBy: { date: 'asc' },
    })

    const balance = entries.reduce((sum, entry) => {
      return sum + (entry.type === 'debit' ? entry.amount : -entry.amount)
    }, 0)

    return NextResponse.json({ entries, balance })
  } catch (error) {
    console.error('Error fetching account entries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch account entries' },
      { status: 500 }
    )
  }
}
