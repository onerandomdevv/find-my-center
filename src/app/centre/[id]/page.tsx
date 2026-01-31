import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { VerificationBadge } from '@/components/VerificationBadge';
import { MapView } from '@/components/MapView';
import { getCentres } from '@/lib/data';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function CentreDetailsPage({ params }: PageProps) {
    const { id } = await params;
    const centres = getCentres();
    const centre = centres.find((c) => c.id === id);

    if (!centre) {
        notFound();
    }

    // Data Sanity
    const verificationStatus = centre.verification_status || 'unverified';
    const confidenceScore = centre.confidence_score || 0;

    const googleMapsLink =
        centre.latitude && centre.longitude
            ? `https://www.google.com/maps/search/?api=1&query=${centre.latitude},${centre.longitude}`
            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${centre.name}, ${centre.full_address}`
            )}`;

    return (
        <main className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="mx-auto max-w-2xl space-y-6">
                <Link
                    href="/find"
                    className="text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                    ← Back to Search
                </Link>

                {/* Header Section */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {centre.name}
                            </h1>
                            <p className="font-medium text-gray-500">
                                {centre.lga_or_town}, {centre.state}
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <VerificationBadge status={verificationStatus} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-lg bg-gray-50 p-4">
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Full Address
                            </p>
                            <p className="select-all text-base text-gray-900">
                                {centre.full_address}
                            </p>
                        </div>

                        {centre.landmark && (
                            <div className="rounded-lg bg-blue-50 p-4">
                                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-800">
                                    Landmark
                                </p>
                                <p className="text-base font-bold text-blue-900">
                                    {centre.landmark}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Map Section */}
                <MapView
                    latitude={centre.latitude || undefined}
                    longitude={centre.longitude || undefined}
                    confidenceScore={confidenceScore}
                    locationName={centre.name || 'Centre'}
                />

                {/* Actions */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <Button
                        href={googleMapsLink}
                        variant="primary"
                        fullWidth
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Open in Google Maps
                    </Button>

                    {/* Share button mock implementation */}
                    <Button
                        // In a real app, this would use navigator.share
                        href={`whatsapp://send?text=My JAMB Centre: ${centre.name} - ${centre.full_address}`}
                        variant="outline"
                        fullWidth
                    >
                        Share Location
                    </Button>
                </div>
            </div>
        </main>
    );
}
