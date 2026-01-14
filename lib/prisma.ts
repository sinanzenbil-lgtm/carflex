import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Check if DATABASE_URL is set and valid
// Only check at runtime, not during build (to allow build to succeed)
if (!process.env.DATABASE_URL) {
  // Only throw at runtime, not during build
  if (typeof window === 'undefined' && process.env.NEXT_PHASE !== 'phase-production-build') {
    console.error('❌ DATABASE_URL environment variable is not set!')
    throw new Error('DATABASE_URL environment variable is required')
  }
}

// Check if DATABASE_URL is pointing to localhost (won't work in production)
// Only check at runtime, not during build (to allow build to succeed)
// This check is deferred to runtime to allow builds to succeed
if (typeof window === 'undefined' && process.env.DATABASE_URL) {
  const isLocalhost = process.env.DATABASE_URL.includes('localhost') || process.env.DATABASE_URL.includes('127.0.0.1')
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL
  const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build'
  
  if (isLocalhost && isProduction && !isBuildPhase) {
    // Only throw at runtime, not during build
    console.error('❌ DATABASE_URL is pointing to localhost. This will not work in production!')
    console.error('Please set DATABASE_URL to a production PostgreSQL database.')
    throw new Error('DATABASE_URL cannot point to localhost in production')
  }
}

// Force new instance in development to ensure latest schema is used
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
