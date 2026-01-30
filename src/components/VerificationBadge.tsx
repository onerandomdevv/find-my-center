import React from 'react';
import { VerificationStatus } from '@/types';

interface VerificationBadgeProps {
    status: VerificationStatus;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ status }) => {
    const styles = {
        confirmed: 'bg-green-100 text-green-800 border-green-200',
        auto: 'bg-blue-100 text-blue-800 border-blue-200',
        manual: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        unverified: 'bg-gray-100 text-gray-800 border-gray-200',
    };

    const labels = {
        confirmed: 'Confirmed',
        auto: 'Auto-Located',
        manual: 'Manually Verified',
        unverified: 'Unverified',
    };

    return (
        <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[status] || styles.unverified
                }`}
        >
            {labels[status] || labels.unverified}
        </span>
    );
};
