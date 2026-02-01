"use client";

import { Button } from "./ui/Button";
import { CoverageInfo } from "@/lib/getCoverageInfo";

interface NoResultsFallbackProps {
  state: string | null;
  lga: string | null;
  coverageInfo: CoverageInfo;
}

export function NoResultsFallback({
  state,
  lga,
  coverageInfo,
}: NoResultsFallbackProps) {
  const { hasAliasMapping, availableTowns, hasAnyStateCoverage } = coverageInfo;

  return (
    <div className="rounded-2xl bg-white p-8 md:p-12 text-center shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-orange-500">
        <svg
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>

      <h2 className="mb-3 text-2xl font-bold text-gray-900">
        No Centres Found in {lga || "this area"}
      </h2>

      <div className="mx-auto max-w-sm">
        {hasAliasMapping ? (
          <div className="space-y-4">
            <p className="text-gray-600">
              While we don't have centers listed under the exact name{" "}
              <span className="font-semibold underline decoration-orange-300">
                "{lga}"
              </span>
              , common exam venues are often listed in nearby neighbourhoods:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {availableTowns.map((town) => (
                <span
                  key={town}
                  className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                >
                  {town}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500 italic">
              Try searching for these specific towns in {state}.
            </p>
          </div>
        ) : hasAnyStateCoverage ? (
          <div className="space-y-4">
            <p className="text-gray-600">
              We have verified centers for{" "}
              <span className="font-medium text-gray-900">{state}</span>, but
              none are currently listed for the{" "}
              <span className="font-medium text-gray-900">{lga}</span> district.
            </p>
            <p className="text-sm text-gray-500">
              This might be because the center list is still being updated for
              this cycle.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">
              We haven't indexed verified JAMB centres for{" "}
              <span className="font-bold text-gray-900">{state}</span> yet.
            </p>
            <p className="text-sm text-gray-500">
              Check back soon as we continuously update our coverage.
            </p>
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button
          href="/find"
          variant="primary"
          className="px-8 shadow-md shadow-blue-500/20"
        >
          Try Another Search
        </Button>
        <Button
          href="https://www.jamb.gov.ng"
          variant="outline"
          className="text-gray-600"
          target="_blank"
        >
          Official JAMB Portal
        </Button>
      </div>
    </div>
  );
}
