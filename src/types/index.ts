export type VerificationStatus = "unverified" | "auto" | "manual" | "confirmed";
export type DataSource = "jamb_list" | "slip" | "crowdsourced";

// Updated to match the new centers.json structure
export interface Centre {
    id: string;
    state: string;
    town: string; // Used as LGA/Town
    centerName: string;
    address: string;
    latitude?: number | null;
    longitude?: number | null;
    landmark?: string;
    // Keep these for backward compatibility/logic, but make optional or computed
    lga_or_town?: string;
    name?: string;
    full_address?: string;
    // Add missing fields from validation if they don't exist in JSON
    verification_status?: VerificationStatus;
    confidence_score?: number;
    data_source?: DataSource;
    last_verified_at?: string;
}
