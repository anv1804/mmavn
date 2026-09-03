import { NextRequest, NextResponse } from 'next/server'
import { searchGymsWithDetails, getAllGymsWithDetails } from '@/lib/services/gym-service'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q') || undefined
  const city = searchParams.get('city') || undefined
  const discipline = searchParams.get('discipline') || undefined

  if (query || city || discipline) {
    const data = searchGymsWithDetails({ query, city, discipline })
    return NextResponse.json({ data, total: data.length })
  }

  const data = getAllGymsWithDetails()
  return NextResponse.json({ data, total: data.length })
}
