import { NextRequest, NextResponse } from 'next/server'
import { compareTwoFighters } from '@/lib/services/fighter-service'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id1 = searchParams.get('fighter1')
  const id2 = searchParams.get('fighter2')
  
  if (!id1 || !id2) {
    return NextResponse.json({ error: 'Both fighter1 and fighter2 query params are required' }, { status: 400 })
  }
  
  const comparison = compareTwoFighters(id1, id2)
  if (!comparison) {
    return NextResponse.json({ error: 'One or both fighters not found' }, { status: 404 })
  }
  
  return NextResponse.json({ data: comparison })
}
