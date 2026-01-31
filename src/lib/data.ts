import centersData from '@/data/centers.json';
import { Centre, VerificationStatus } from '@/types';

// Raw data type from JSON
interface RawCentre {
    id: string;
    state: string;
    town: string;
    centerName: string;
    address: string;
    latitude: number | null;
    longitude: number | null;
    landmark: string;
}

// Transform raw data to application Centre type
export const getCentres = (): Centre[] => {
    return (centersData as RawCentre[]).map((raw) => ({
        ...raw,
        // Map new fields to old interface expectations
        lga_or_town: raw.town,
        name: raw.centerName,
        full_address: raw.address,
        // Default values for missing fields
        verification_status: 'unverified' as VerificationStatus,
        confidence_score: raw.latitude && raw.longitude ? 80 : 0, // Auto-score based on coords
        data_source: 'jamb_list',
        // Ensure numeric or undefined for coords
        latitude: raw.latitude || undefined,
        longitude: raw.longitude || undefined,
    }));
};
