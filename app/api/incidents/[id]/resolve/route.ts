import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: 'Incident ID is required' }, { status: 400 });
    }

    // Mock response for demo
    const updatedIncident = {
      id,
      type: 'Resolved Incident',
      tsStart: new Date().toISOString(),
      tsEnd: new Date().toISOString(),
      thumbnailUrl: '/thumbnails/thumb-1.jpeg',
      resolved: true,
      camera: {
        name: 'Mock Camera',
        location: 'Mock Location',
      },
    };

    return NextResponse.json(updatedIncident);
  } catch (error) {
    console.error('Error updating incident:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        error: 'Failed to update incident', 
        details: errorMessage 
      }, 
      { status: 500 }
    );
  }
}
