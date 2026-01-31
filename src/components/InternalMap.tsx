"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface InternalMapProps {
  destination: {
    latitude?: number;
    longitude?: number;
    address: string;
    name: string;
    state: string;
  };
}

export const InternalMap: React.FC<InternalMapProps> = ({ destination }) => {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [status, setStatus] = useState<
    "loading" | "success" | "denied" | "error"
  >("loading");

  useEffect(() => {
    let isMounted = true;

    if (!navigator.geolocation) {
      setStatus("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (isMounted) {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setStatus("success");
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        if (isMounted) {
          if (error.code === error.PERMISSION_DENIED) {
            setStatus("denied");
          } else {
            setStatus("error");
          }
        }
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );

    return () => {
      isMounted = false;
    };
  }, []);

  // Helper to construct address string
  const getDestinationQuery = () => {
    if (destination.latitude && destination.longitude) {
      return `${destination.latitude},${destination.longitude}`;
    }
    // Filter out empty parts and join with comma
    const parts = [
      destination.name,
      destination.address,
      destination.state,
      "Nigeria",
    ];
    return encodeURIComponent(
      parts.filter((p) => p && p.trim() !== "").join(", "),
    );
  };

  const destString = getDestinationQuery();

  // Construct Source String
  const sourceString = userLocation
    ? `${userLocation.lat},${userLocation.lng}`
    : "";

  // Construct Map URL
  // If we have user location, show directions (saddr -> daddr)
  // If no user location, just show the destination (daddr only? or just q=)
  let mapUrl = "";

  if (userLocation) {
    mapUrl = `https://maps.google.com/maps?saddr=${sourceString}&daddr=${destString}&output=embed`;
  } else {
    // Fallback if location not available: just show the place
    mapUrl = `https://maps.google.com/maps?q=${destString}&zoom=15&output=embed`;
  }

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      {/* Status Indicators */}
      {status === "loading" && (
        <div className="absolute top-4 left-4 right-4 z-50 rounded-md bg-white/90 p-3 text-blue-700 shadow-md backdrop-blur-sm md:w-auto md:left-1/2 md:-translate-x-1/2 md:top-6">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
            <p className="text-sm font-medium">Locating you...</p>
          </div>
        </div>
      )}

      {status === "denied" && (
        <div className="absolute top-4 left-4 right-4 z-50 rounded-md bg-white/90 p-3 text-yellow-700 shadow-md backdrop-blur-sm md:left-1/2 md:-translate-x-1/2 md:max-w-md">
          <p className="text-sm font-bold">Location access denied.</p>
          <p className="text-xs">Showing centre location only.</p>
        </div>
      )}

      {/* The Map */}
      <div className="flex-grow overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm h-full min-h-[400px]">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          title={`Map showing directions to ${destination.name}`}
          style={{ border: 0, minHeight: "100%" }}
          src={mapUrl}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      <div className="bg-gray-50 p-3 text-center text-xs text-gray-500 rounded-md">
        {status === "success"
          ? "Showing route from your current location"
          : "Showing centre location"}
      </div>
    </div>
  );
};
