import { NextRequest, NextResponse } from 'next/server'
import { filterTechniques, getAllTechniques, getTechniqueStats } from '@/lib/services/technique-service'
import type { TechniqueCategory, TechniqueDifficulty } from '@/types'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q') || undefined
  const category = (searchParams.get('category') as TechniqueCategory) || undefined
  const difficulty = (searchParams.get('difficulty') as TechniqueDifficulty) || undefined

  const stats = getTechniqueStats()

  if (query || category || difficulty) {
    const data = filterTechniques({ query, category, difficulty })
    return NextResponse.json({ data, total: data.length, stats })
  }

  const data = getAllTechniques()
  return NextResponse.json({ data, total: data.length, stats })
}
