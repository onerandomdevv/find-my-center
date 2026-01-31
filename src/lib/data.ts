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

/**
 * Generate a unique ID from centre properties
 * Used for centres with missing ID fields
 */
function generateCentreId(state: string, town: string, centerName: string, index: number): string {
    const sanitize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').trim();
    const stateSlug = sanitize(state);
    const townSlug = sanitize(town);
    const nameSlug = sanitize(centerName).substring(0, 20); // Limit name length
    return `${stateSlug}-${townSlug}-${nameSlug}-${index}`;
}

/**
 * Generate a fallback address from available information
 */
function generateFallbackAddress(centerName: string, town: string, state: string): string {
    return `${centerName}, ${town}, ${state} State`;
}

// Transform raw data to application Centre type
/**
 * Retrieves and processes all centre data.
 * - Filters out invalid entries.
 * - Auto-generates IDs and fallbacks for missing data.
 * - This function is used by `generateStaticParams` to pre-build pages.
 */
export const getCentres = (): Centre[] => {
    return (centersData as RawCentre[])
        .map((raw, index) => {
            // Skip centres that are completely invalid (no name or state)
            if (!raw.centerName || !raw.state) {
                return null;
            }

            // Generate ID if missing
            const centreId = raw.id && raw.id.trim() !== '' 
                ? raw.id 
                : generateCentreId(raw.state, raw.town, raw.centerName, index);

            // Generate fallback address if missing
            const address = raw.address && raw.address.trim() !== ''
                ? raw.address
                : generateFallbackAddress(raw.centerName, raw.town, raw.state);

            // Ensure town is not empty
            const town = raw.town && raw.town.trim() !== '' ? raw.town : 'Unknown';

            const centre: Centre = {
                id: centreId,
                state: raw.state,
                town: town,
                centerName: raw.centerName,
                address: address,
                latitude: raw.latitude || undefined,
                longitude: raw.longitude || undefined,
                landmark: raw.landmark && raw.landmark.trim() !== '' ? raw.landmark : undefined,
                // Mapped fields for backward compatibility
                lga_or_town: town,
                name: raw.centerName,
                full_address: address,
                // Default values for missing fields
                verification_status: 'unverified' as VerificationStatus,
                confidence_score: raw.latitude && raw.longitude ? 80 : 0,
                data_source: 'jamb_list',
            };

            return centre;
        })
        .filter((centre): centre is Centre => centre !== null);
};
