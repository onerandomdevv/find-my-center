import React from 'react';
import Link from 'next/link';
import { Centre } from '@/types';
import { VerificationBadge } from './VerificationBadge';

interface CentreCardProps {
    centre: Centre;
}

export const CentreCard: React.FC<CentreCardProps> = ({ centre }) => {
    return (
        <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-2 flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{centre.name}</h3>
                    <p className="text-sm text-gray-500">
                        {centre.lga_or_town}, {centre.state}
                    </p>
                </div>
                <VerificationBadge status={centre.verification_status || 'unverified'} />
            </div>

            <div className="mb-4 space-y-1 text-sm text-gray-600">
                <p>{centre.full_address}</p>
                {centre.landmark && (
                    <p className="font-medium text-gray-800">
                        Landmark: {centre.landmark}
                    </p>
                )}
            </div>

            <div className="mt-auto pt-2">
                <Link
                    href={`/centre/${centre.id}`}
                    className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700"
                >
                    View Details
                    <svg
                        className="ml-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
};
