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

export default function Dashboard() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedIncident, setSelectedIncident] = useState(null);

  useEffect(() => {
    const mockCameras = [
      { id: '1', name: 'Shop Floor A', location: 'Building A - Floor 1' },
      { id: '2', name: 'Vault', location: 'Building B - Basement' },
      { id: '3', name: 'Main Entrance', location: 'Building A - Ground Floor' },
    ];
    setCameras(mockCameras);
  }, []);

  const handleIncidentSelect = (incident: any) => {
    console.log('Selected incident:', incident); // Debug log
    console.log('Thumbnail URL:', incident.thumbnailUrl); // Debug log
    setSelectedIncident(incident);
  };

  // Debug: log the current selected incident
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
