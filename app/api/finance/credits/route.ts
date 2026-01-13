import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const credits = await prisma.credit.findMany({
      include: {
        installments: {
          orderBy: { installmentNumber: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(credits)
  } catch (error) {
    console.error('Error fetching credits:', error)
    return NextResponse.json(
      { error: 'Failed to fetch credits' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      bankName,
      totalAmount,
      interestRate,
      principal,
      startDate,
      installmentCount,
      monthlyPayment,
      paymentDay,
      notes,
    } = body

    const credit = await prisma.credit.create({
      data: {
        bankName,
        totalAmount: parseFloat(totalAmount),
        interestRate: parseFloat(interestRate),
        principal: parseFloat(principal),
        startDate: new Date(startDate),
        installmentCount: parseInt(installmentCount),
        monthlyPayment: parseFloat(monthlyPayment),
        paymentDay: parseInt(paymentDay),
        notes: notes || null,
        installments: {
          create: Array.from({ length: parseInt(installmentCount) }, (_, i) => {
            const dueDate = new Date(startDate)
            dueDate.setMonth(dueDate.getMonth() + i + 1)
            dueDate.setDate(parseInt(paymentDay))
            
            const installmentPrincipal = parseFloat(principal) / parseInt(installmentCount)
            const installmentInterest = (parseFloat(totalAmount) - parseFloat(principal)) / parseInt(installmentCount)
            
            return {
              installmentNumber: i + 1,
              dueDate,
              principal: installmentPrincipal,
              interest: installmentInterest,
              total: parseFloat(monthlyPayment),
            }
          }),
        },
      },
      include: {
        installments: true,
      },
    })

    return NextResponse.json(credit, { status: 201 })
  } catch (error) {
    console.error('Error creating credit:', error)
    return NextResponse.json(
      { error: 'Failed to create credit' },
      { status: 500 }
    )
  }
}
