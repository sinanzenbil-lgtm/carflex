import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      orderBy: { name: 'asc' },
    })

    const companiesWithBalance = await Promise.all(
      companies.map(async (company) => {
        const entries = await prisma.accountEntry.findMany({
          where: { companyId: company.id },
        })

        const balance = entries.reduce((sum, entry) => {
          return sum + (entry.type === 'debit' ? entry.amount : -entry.amount)
        }, 0)

        return {
          ...company,
          balance,
        }
      })
    )

    return NextResponse.json(companiesWithBalance)
  } catch (error) {
    console.error('Error fetching companies with balance:', error)
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    )
  }
}
