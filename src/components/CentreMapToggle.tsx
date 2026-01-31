"use client";

"use client";

import Link from "next/link";

interface CentreMapToggleProps {
  id: string;
  latitude?: number;
  longitude?: number;
  address: string;
  centreName: string;
  state: string;
  confidenceScore: number;
  locationName: string;
}

export const CentreMapToggle: React.FC<CentreMapToggleProps> = ({ id }) => {
  return (
    <div className="mt-3 border-t border-gray-100 pt-3">
      <Link
        href={`/centre/${id}`}
        className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>Get Directions</span>
      </Link>
    </div>
  );
};
