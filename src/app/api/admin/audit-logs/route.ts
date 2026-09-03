import { NextRequest, NextResponse } from 'next/server';
import { getAuditLogs } from '@/lib/services/admin-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const entity = searchParams.get('entity');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : undefined;

    let logs = getAuditLogs();

    if (entity) {
      logs = logs.filter(log => log.entity === entity);
    }

    if (limit && !isNaN(limit) && limit > 0) {
      logs = logs.slice(0, limit);
    }

    return NextResponse.json({
      success: true,
      data: logs,
      total: logs.length,
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
