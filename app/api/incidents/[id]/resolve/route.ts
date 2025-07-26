import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params in Next.js 15
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: 'Incident ID is required' }, { status: 400 });
    }

    const incident = await prisma.incident.findUnique({
      where: { id },
    });

    if (!incident) {
      return NextResponse.json({ error: 'Incident not found' }, { status: 404 });
    }

    const updatedIncident = await prisma.incident.update({
      where: { id },
      data: { resolved: !incident.resolved },
      include: {
        camera: true,
      },
    });

    return NextResponse.json(updatedIncident);
  } catch (error) {
    console.error('Error updating incident:', error);
    return NextResponse.json(
      { error: 'Failed to update incident', details: error.message }, 
      { status: 500 }
    );
  }
}
