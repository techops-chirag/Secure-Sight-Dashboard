'use client';

import React, { useState } from 'react';
import Image from 'next/image';

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

interface IncidentPlayerProps {
  cameras: Camera[];
  selectedIncident?: Incident | null;
}

const IncidentPlayer: React.FC<IncidentPlayerProps> = ({ cameras, selectedIncident }) => {
  const [activeCamera, setActiveCamera] = useState(0);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  // Simulate different camera feed patterns for each camera
  const getCameraPlaceholder = (index: number, cameraName: string) => {
    const patterns = [
      // Grid pattern for Shop Floor A
      <div key={index} className="w-full h-full bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className={`absolute w-2 h-2 bg-green-400 rounded-full animate-pulse`} 
                 style={{ 
                   top: `${20 + (i * 20)}%`, 
                   left: `${30 + (i % 2) * 40}%`,
                   animationDelay: `${i * 0.3}s`
                 }} />
          ))}
        </div>
        <div className="absolute bottom-2 left-2 text-green-400 text-xs font-mono">
          LIVE • {cameraName.substring(0, 8)}
        </div>
        <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      </div>,
      
      // Corridor view for Vault
      <div key={index} className="w-full h-full bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-blue-400 opacity-50" />
          <div className="absolute bottom-3 left-3 text-blue-400 text-xs font-mono">
            🔒 SECURE • {cameraName.substring(0, 5)}
          </div>
        </div>
        <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      </div>,
      
      // Entry view for Main Entrance
      <div key={index} className="w-full h-full bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-gray-700">
          <div className="absolute bottom-1/3 left-1/3 w-4 h-1 bg-yellow-400 opacity-60" />
          <div className="absolute bottom-1/3 right-1/3 w-4 h-1 bg-yellow-400 opacity-60" />
          <div className="absolute bottom-3 left-3 text-yellow-400 text-xs font-mono">
            ENTRY • {cameraName.substring(5)}
          </div>
        </div>
        <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      </div>
    ];
    
    return patterns[index % patterns.length];
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      {/* Main Video Display */}
      <div className="relative bg-black rounded-lg mb-4" style={{ aspectRatio: '16/9' }}>
        {selectedIncident ? (
          <>
            {!imageError ? (
              <Image
                src={selectedIncident.thumbnailUrl}
                alt="Incident footage"
                fill
                className="object-cover rounded-lg"
                onError={handleImageError}
                onLoad={handleImageLoad}
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">Image failed to load</p>
                <p className="text-xs text-gray-500 mt-1">{selectedIncident.thumbnailUrl}</p>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Select an incident to view</p>
          </div>
        )}
        
        {/* Overlay Info */}
        {selectedIncident && (
          <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-2 rounded">
            <p className="text-sm font-medium">{selectedIncident.camera.name}</p>
            <p className="text-xs text-gray-300">{selectedIncident.camera.location}</p>
            <p className="text-xs text-gray-400 mt-1">{selectedIncident.type}</p>
          </div>
        )}
        
        {/* Live Indicator */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-white text-xs font-medium">LIVE</span>
        </div>
      </div>

      {/* Camera Thumbnails with Realistic Content */}
      <div className="flex space-x-3">
        {cameras.slice(0, 3).map((camera, index) => (
          <button
            key={camera.id}
            onClick={() => setActiveCamera(index)}
            className={`flex-1 bg-gray-700 rounded-lg p-3 text-left hover:bg-gray-600 transition-colors ${
              activeCamera === index ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            {/* Realistic Camera Feed Preview */}
            <div className="bg-black rounded aspect-video mb-2 relative overflow-hidden">
              {getCameraPlaceholder(index, camera.name)}
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-xs font-medium">{camera.name}</p>
                <p className="text-gray-400 text-xs">{camera.location}</p>
              </div>
              
              {/* Status indicator */}
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${
                  activeCamera === index ? 'bg-blue-500' : 'bg-green-500'
                } animate-pulse`}></div>
                <span className="text-xs text-gray-400">
                  {activeCamera === index ? 'ACTIVE' : 'LIVE'}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {/* Camera Controls */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center space-x-4">
          <span>Quality: HD (1080p)</span>
          <span>•</span>
          <span>FPS: 30</span>
          <span>•</span>
          <span>Codec: H.264</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-1 hover:bg-gray-700 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-1 hover:bg-gray-700 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
          <button className="p-1 hover:bg-gray-700 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentPlayer;
