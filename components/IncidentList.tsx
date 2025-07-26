'use client';

import React, { useState, useEffect } from 'react';

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

interface IncidentListProps {
  onIncidentSelect: (incident: Incident) => void;
}

const IncidentList: React.FC<IncidentListProps> = ({ onIncidentSelect }) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resolvingIds, setResolvingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/incidents?resolved=false');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server returned non-JSON response');
      }
      
      const data = await response.json();
      setIncidents(data);
      
    } catch (error) {
      console.error('Error fetching incidents:', error);
      setError(error.message || 'Failed to fetch incidents');
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (incidentId: string) => {
    setResolvingIds(prev => new Set(prev).add(incidentId));
    
    try {
      const response = await fetch(`/api/incidents/${incidentId}/resolve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }
      
      await response.json();
      
      // Optimistic UI update - remove from list
      setIncidents(prev => prev.filter(incident => incident.id !== incidentId));
      
    } catch (error) {
      console.error('Error resolving incident:', error);
      setError(`Failed to resolve incident: ${error.message}`);
    } finally {
      setResolvingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(incidentId);
        return newSet;
      });
    }
  };

  const getThreatColor = (type: string) => {
    switch (type) {
      case 'Gun Threat': return 'bg-red-500';
      case 'Unauthorised Access': return 'bg-yellow-500';
      case 'Face Recognised': return 'bg-blue-500';
      case 'Suspicious Activity': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getThreatIcon = (type: string) => {
    switch (type) {
      case 'Gun Threat':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        );
      case 'Unauthorised Access':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm3 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
          </svg>
        );
      case 'Face Recognised':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
        );
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-white text-lg font-semibold mb-4">Active Incidents</h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading incidents...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-white text-lg font-semibold mb-4">Active Incidents</h2>
        <div className="flex flex-col items-center justify-center h-64">
          <div className="text-red-400 text-center">
            <p className="mb-2">Error loading incidents:</p>
            <p className="text-sm">{error}</p>
          </div>
          <button 
            onClick={fetchIncidents}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-lg font-semibold">Active Incidents</h2>
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {incidents.length} Active
        </span>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {incidents.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>No active incidents</p>
          </div>
        ) : (
          incidents.map((incident) => (
            <div
              key={incident.id}
              className={`bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-all cursor-pointer ${
                resolvingIds.has(incident.id) ? 'opacity-50' : ''
              }`}
              onClick={() => onIncidentSelect(incident)}
            >
              <div className="flex items-start space-x-3">
                <img
                  src={incident.thumbnailUrl}
                  alt="Incident thumbnail"
                  className="w-16 h-12 bg-gray-600 rounded object-cover"
                  onError={(e) => {
                    //(e.target as HTMLImageElement).src = '/placeholder-thumb.jpg';
                const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    target.nextElementSibling?.remove(); // Remove any existing placeholder
    
    const placeholder = document.createElement('div');
    placeholder.className = 'w-16 h-12 bg-gray-600 rounded flex items-center justify-center text-gray-400 text-xs';
    placeholder.innerHTML = '<span>📹</span>';
    target.parentNode?.insertBefore(placeholder, target.nextSibling); 
                }}
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${getThreatColor(incident.type)}`}>
                      {getThreatIcon(incident.type)}
                    </div>
                    <span className="text-white font-medium text-sm">{incident.type}</span>
                  </div>
                  
                  <p className="text-gray-300 text-sm">{incident.camera.name}</p>
                  <p className="text-gray-400 text-xs">{incident.camera.location}</p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-400 text-xs">
                      {formatTime(incident.tsStart)} - {formatTime(incident.tsEnd)}
                    </span>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleResolve(incident.id);
                      }}
                      disabled={resolvingIds.has(incident.id)}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-full transition-colors disabled:opacity-50"
                    >
                      {resolvingIds.has(incident.id) ? 'Resolving...' : 'Resolve'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IncidentList;
