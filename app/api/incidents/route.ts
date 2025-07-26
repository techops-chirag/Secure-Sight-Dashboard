import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resolved = searchParams.get('resolved');
    
    const whereClause = resolved !== null ? { resolved: resolved === 'true' } : {};
    
    const incidents = await prisma.incident.findMany({
      where: whereClause,
      include: {
        camera: true,
      },
      orderBy: {
        tsStart: 'desc',
      },
    });

    return NextResponse.json(incidents);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    
    // Fix: Properly handle the unknown error type
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch incidents', 
        details: errorMessage 
      }, 
      { status: 500 }
    );
  }
}
