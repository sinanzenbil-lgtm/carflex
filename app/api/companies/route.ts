import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(companies)
  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      taxId,
      name,
      contactPerson,
      phone,
      email,
      address,
    } = body

    const company = await prisma.company.create({
      data: {
        taxId,
        name,
        contactPerson: contactPerson || null,
        phone: phone || null,
        email: email || null,
        address: address || null,
      },
    })

    return NextResponse.json(company, { status: 201 })
  } catch (error: any) {
    console.error('Error creating company:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Bu vergi kimlik numarası zaten kayıtlı' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create company' },
      { status: 500 }
    )
  }
}
