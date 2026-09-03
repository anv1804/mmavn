import { NextRequest, NextResponse } from 'next/server'
import { getAllEventsWithDetails, getUpcomingEventsWithDetails, getCompletedEventsWithDetails } from '@/lib/services/event-service'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const status = searchParams.get('status')
  
  let result
  if (status === 'upcoming') result = getUpcomingEventsWithDetails()
  else if (status === 'completed') result = getCompletedEventsWithDetails()
  else result = getAllEventsWithDetails()
  
  return NextResponse.json({ data: result, total: result.length })
}
