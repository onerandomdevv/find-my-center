"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CentreCard } from "@/components/CentreCard";
import { Button } from "@/components/ui/Button";
import { getCentres } from "@/lib/data";
import { getSearchTargets } from "@/lib/normalizeSearch";
import { NoResultsFallback } from "@/components/NoResultsFallback";
import { getCoverageInfo } from "@/lib/getCoverageInfo";

const centres = getCentres();

function ResultsList() {
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const lga = searchParams.get("lga");

  const filteredCentres = centres.filter((c) => {
    // Sanity check: exclude if name or id is missing
    if (!c.id || !c.name) return false;

    // Filter by State and normalized LGA targets
    if (state && c.state !== state) return false;

    if (lga) {
      const targets = getSearchTargets(state, lga);
      if (!targets.includes(c.town)) return false;
    }

    return true;
  });

  if (filteredCentres.length === 0) {
    const coverageInfo = getCoverageInfo(state, lga);
    return (
      <NoResultsFallback state={state} lga={lga} coverageInfo={coverageInfo} />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          {filteredCentres.length} Centre
          {filteredCentres.length === 1 ? "" : "s"} Found
          {lga && state && (
            <span className="ml-2 text-base font-normal text-gray-500">
              in {lga}, {state}
            </span>
          )}
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredCentres.map((centre) => (
          <CentreCard key={centre.id} centre={centre} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button href="/find" variant="secondary">
          Refine Search
        </Button>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
          <Link
            href="/find"
            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            ← Back to Search
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="grid gap-4 sm:grid-cols-2 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 rounded-lg bg-gray-200"></div>
              ))}
            </div>
          }
        >
          <ResultsList />
        </Suspense>
      </div>
    </main>
  );
}
