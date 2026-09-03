import { NextRequest, NextResponse } from 'next/server'
import { getAllFightersWithDetails, searchFightersWithDetails } from '@/lib/services/fighter-service'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  const divisionId = searchParams.get('division')
  const gymId = searchParams.get('gym')
  
  let result = query 
    ? searchFightersWithDetails(query)
    : getAllFightersWithDetails()
    
  if (divisionId) result = result.filter(f => f.divisionId === divisionId)
  if (gymId) result = result.filter(f => f.gymId === gymId)
  
  return NextResponse.json({ data: result, total: result.length })
}
