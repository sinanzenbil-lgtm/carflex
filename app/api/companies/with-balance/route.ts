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
  } catch (error: any) {
    console.error('Error fetching companies with balance:', error)
    
    // Check if it's a Prisma initialization error
    if (error?.name === 'PrismaClientInitializationError') {
      return NextResponse.json(
        { 
          error: 'Database connection error. Please check DATABASE_URL environment variable.',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch companies', details: process.env.NODE_ENV === 'development' ? error.message : undefined },
      { status: 500 }
    )
  }
}
