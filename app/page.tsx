'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import IncidentPlayer from '@/components/IncidentPlayer';
import IncidentList from '@/components/IncidentList';

interface Camera {
  id: string;
  name: string;
  location: string;
}

interface Incident {
  id: string;
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  resolved: boolean;
  camera: {
    name: string;
    location: string;
  };
}

export default function Dashboard() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  useEffect(() => {
    const mockCameras = [
      { id: '1', name: 'Shop Floor A', location: 'Building A - Floor 1' },
      { id: '2', name: 'Vault', location: 'Building B - Basement' },
      { id: '3', name: 'Main Entrance', location: 'Building A - Ground Floor' },
    ];
    setCameras(mockCameras);
  }, []);

  const handleIncidentSelect = (incident: Incident) => {
    console.log('Selected incident:', incident);
    console.log('Thumbnail URL:', incident.thumbnailUrl);
    setSelectedIncident(incident);
  };

  useEffect(() => {
    console.log('Current selected incident:', selectedIncident);
  }, [selectedIncident]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <IncidentPlayer 
              cameras={cameras} 
              selectedIncident={selectedIncident}
            />
          </div>
          
          <div className="lg:col-span-1">
            <IncidentList onIncidentSelect={handleIncidentSelect} />
          </div>
        </div>
      </div>
    </div>
  );
}
