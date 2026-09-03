import { NextResponse } from 'next/server';
import { getSystemStats } from '@/lib/services/admin-service';

export async function GET() {
  try {
    const stats = getSystemStats();
    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
