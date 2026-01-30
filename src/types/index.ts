export type VerificationStatus = "unverified" | "auto" | "manual" | "confirmed";
export type DataSource = "jamb_list" | "slip" | "crowdsourced";

export interface Centre {
    id: string;
    name: string;
    state: string;
    lga_or_town: string;
    full_address: string;
    landmark?: string;
    latitude?: number;
    longitude?: number;
    verification_status: VerificationStatus;
    confidence_score: number;
    data_source?: DataSource;
    last_verified_at?: string;
}
