import { NextResponse } from 'next/server'
import { getCurrentUser } from './auth'

export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    return {
      error: NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      ),
      user: null,
    }
  }
  
  return { error: null, user }
}

export async function requireAdmin() {
  const { error, user } = await requireAuth()
  
  if (error) {
    return { error, user: null }
  }
  
  if (user?.role !== 'super_admin') {
    return {
      error: NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      ),
      user: null,
    }
  }
  
  return { error: null, user }
}
