import { NextRequest, NextResponse } from 'next/server'
import { getFighterWithDetails } from '@/lib/services/fighter-service'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const fighter = getFighterWithDetails(id)
  if (!fighter) {
    return NextResponse.json({ error: 'Fighter not found' }, { status: 404 })
  }
  return NextResponse.json({ data: fighter })
}
