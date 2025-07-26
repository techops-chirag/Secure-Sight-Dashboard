import { NextRequest, NextResponse } from 'next/server';

// Mock data for demo purposes
const mockIncidents = [
  {
    id: '1',
    type: 'Gun Threat',
    tsStart: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    tsEnd: new Date(Date.now() - 2 * 60 * 60 * 1000 + 300000).toISOString(),
    thumbnailUrl: '/thumbnails/thumb-1.jpeg',
    resolved: false,
    camera: {
      name: 'Shop Floor A',
      location: 'Building A - Floor 1',
    },
  },
  {
    id: '2',
    type: 'Unauthorised Access',
    tsStart: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    tsEnd: new Date(Date.now() - 4 * 60 * 60 * 1000 + 180000).toISOString(),
    thumbnailUrl: '/thumbnails/thumb-2.jpeg',
    resolved: false,
    camera: {
      name: 'Main Entrance',
      location: 'Building A - Ground Floor',
    },
  },
  {
    id: '3',
    type: 'Face Recognised',
    tsStart: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    tsEnd: new Date(Date.now() - 6 * 60 * 60 * 1000 + 120000).toISOString(),
    thumbnailUrl: '/thumbnails/thumb-3.jpeg',
    resolved: false,
    camera: {
      name: 'Vault',
      location: 'Building B - Basement',
    },
  },
  {
    id: '4',
    type: 'Suspicious Activity',
    tsStart: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    tsEnd: new Date(Date.now() - 8 * 60 * 60 * 1000 + 240000).toISOString(),
    thumbnailUrl: '/thumbnails/thumb-4.jpeg',
    resolved: false,
    camera: {
      name: 'Parking Lot',
      location: 'Outdoor - Section C',
    },
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resolved = searchParams.get('resolved');
    
    // Filter incidents based on resolved status
    let filteredIncidents = mockIncidents;
    if (resolved === 'false') {
      filteredIncidents = mockIncidents.filter(incident => !incident.resolved);
    } else if (resolved === 'true') {
      filteredIncidents = mockIncidents.filter(incident => incident.resolved);
    }

    // Sort by newest first
    filteredIncidents.sort((a, b) => new Date(b.tsStart).getTime() - new Date(a.tsStart).getTime());

    return NextResponse.json(filteredIncidents);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    
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
