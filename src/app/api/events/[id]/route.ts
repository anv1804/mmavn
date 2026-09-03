import { NextRequest, NextResponse } from 'next/server'
import { getEventWithDetails } from '@/lib/services/event-service'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const event = getEventWithDetails(id)
  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 })
  }
  return NextResponse.json({ data: event })
}
