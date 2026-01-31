'use client';

import React, { useState } from 'react';

interface MapViewProps {
  latitude?: number;
  longitude?: number;
  confidenceScore: number;
  locationName: string;
}

export const MapView: React.FC<MapViewProps> = ({
  latitude,
  longitude,
  confidenceScore,
  locationName,
}) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  // Requirement: Do not show map if confidence < 70 or coordinates missing
  if (!latitude || !longitude || confidenceScore < 70) {
    return (
      <div className="rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Map Unavailable
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Map unavailable for this centre. Please use the address and
                landmark below. Leave early.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Using Google Maps Embed API for MVP (no API key needed for basic 'place' mode if testing, 
  // but for coordinates 'view' mode often works or 'q' with coords).
  // Ideally, use a real Map SDK. For MVP light-weight, an iframe or specifically 
  // constructing a google maps URL is safest.
  // Actually, for a robust "No API Key" fallback, standard <iframe> embed might require a key 
  // or show "Development Only". The prompt said "Google Maps (loaded lazily)".
  // I will use a simple external link button as primary fallback if iframe fails, 
  // but let's try a direct iframe.

  // Note: To truly lazy load, we can use 'loading="lazy"' attribute on iframe.

  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      {/* Fallback / Error State */}
      {mapError ? (
        <div className="bg-gray-100 p-8 text-center text-gray-500">
          <p>Map could not be loaded.</p>
        </div>
      ) : (
        <iframe
          title={`Map of ${locationName}`}
          width="100%"
          height="300"
          frameBorder="0"
          style={{ border: 0 }}
          src={mapUrl}
          allowFullScreen
          loading="lazy"
          onError={() => setMapError(true)}
        ></iframe>
      )}
      <div className="bg-gray-50 p-2 text-center text-xs text-gray-500">
        Google Maps View (Approximate)
      </div>
    </div>
  );
};
