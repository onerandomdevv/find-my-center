import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { VerificationBadge } from "@/components/VerificationBadge";
import { InternalMap } from "@/components/InternalMap";
import { getCentres } from "@/lib/data";

interface PageProps {
  params: Promise<{ id: string }>;
}

// 1. Static Site Generation (SSG) - "Last Forever" Performance
// Pre-render all centre pages at build time.
export async function generateStaticParams() {
  const centres = getCentres();
  return centres.map((centre) => ({
    id: centre.id,
  }));
}

// 2. SEO - "Last Forever" Discoverability
// Generate dynamic metadata for each centre.
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const centres = getCentres();
  const centre = centres.find((c) => c.id === id);

  if (!centre) {
    return {
      title: "Centre Not Found",
    };
  }

  return {
    title: `Directions to ${centre.name} | JAMB Centre Locator`,
    description: `Get real-time directions to ${centre.name} in ${centre.town}, ${centre.state}. Full address: ${centre.full_address}.`,
    openGraph: {
      title: `${centre.name} - Directions & Info`,
      description: `Locate ${centre.name} for your exam. Get precise directions and details.`,
    },
  };
}

export default async function CentreDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const centres = getCentres();
  const centre = centres.find((c) => c.id === id);

  if (!centre) {
    notFound();
  }

  const verificationStatus = centre.verification_status || "unverified";

  return (
    <main className="h-screen w-full bg-gray-50 flex flex-col md:flex-row overflow-hidden">
      {/* Left Sidebar - Details */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 p-6 flex flex-col gap-6 overflow-y-auto z-10 shadow-lg md:shadow-none">
        {/* Back Link */}
        <Link
          href="/find"
          className="text-sm font-medium text-gray-500 hover:text-gray-900 inline-flex items-center gap-1 group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Search
        </Link>

        {/* Centre Info */}
        <div>
          <div className="mb-2">
            <VerificationBadge status={verificationStatus} />
          </div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight">
            {centre.name}
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {centre.lga_or_town}, {centre.state}
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Full Address
            </p>
            <p className="select-all text-sm text-gray-900 leading-relaxed">
              {centre.full_address}
            </p>
          </div>

          {centre.landmark && (
            <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-800">
                Landmark
              </p>
              <p className="text-sm font-bold text-blue-900">
                {centre.landmark}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-2">
          <Button
            href={`whatsapp://send?text=My JAMB Centre: ${centre.name} - ${centre.full_address}`}
            variant="outline"
            fullWidth
            className="text-xs"
          >
            Share Location via WhatsApp
          </Button>
        </div>

        <div className="mt-auto pt-6 text-xs text-gray-400 border-t border-gray-100">
          <p>Calculated route assumes current traffic conditions.</p>
        </div>
      </div>

      {/* Right Content - Map */}
      <div className="flex-grow h-[60vh] md:h-full relative bg-gray-200">
        <div className="absolute inset-0 p-4 pb-20 md:p-0">
          <InternalMap
            destination={{
              latitude: centre.latitude || undefined,
              longitude: centre.longitude || undefined,
              address: centre.full_address || "",
              name: centre.name || "",
              state: centre.state || "",
            }}
          />
        </div>
      </div>
    </main>
  );
}
