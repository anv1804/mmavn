import { NextRequest, NextResponse } from 'next/server'
import { getRankingsWithDetails, getDivisionsWithRankings } from '@/lib/services/ranking-service'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const divisionId = searchParams.get('division')
  
  if (divisionId) {
    const rankings = getRankingsWithDetails(divisionId)
    return NextResponse.json({ data: rankings })
  }
  
  // Return all divisions that have rankings
  const divisionsWithRankings = getDivisionsWithRankings()
  return NextResponse.json({ data: divisionsWithRankings })
}
