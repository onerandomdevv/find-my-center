"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { getCentres } from "@/lib/data";
import { getSearchTargets } from "@/lib/normalizeSearch";

const centres = getCentres();

function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [selectedState, setSelectedState] = useState(
    searchParams.get("state") || "",
  );
  const [selectedLga, setSelectedLga] = useState(searchParams.get("lga") || "");
  const [selectedCentreId, setSelectedCentreId] = useState(
    searchParams.get("centre") || "",
  );

  // Derived data
  const states = useMemo(() => {
    const uniqueStates = Array.from(new Set(centres.map((c) => c.state)));
    return uniqueStates.sort().map((s) => ({ label: s || "", value: s || "" }));
  }, []);

  const lgas = useMemo(() => {
    if (!selectedState) return [];
    const filteredLgas = Array.from(
      new Set(
        centres.filter((c) => c.state === selectedState).map((c) => c.town),
      ),
    );
    return filteredLgas.sort().map((l) => ({ label: l || "", value: l || "" }));
  }, [selectedState]);

  const availableCentres = useMemo(() => {
    if (!selectedState || !selectedLga) return [];
    const targets = getSearchTargets(selectedState, selectedLga);
    return centres
      .filter((c) => c.state === selectedState && targets.includes(c.town))
      .map((c) => ({ label: c.name || "Unknown Centre", value: c.id }));
  }, [selectedState, selectedLga]);

  // Update URL function
  const updateUrl = (newState: string, newLga: string, newCentre: string) => {
    const params = new URLSearchParams();
    if (newState) params.set("state", newState);
    if (newLga) params.set("lga", newLga);
    if (newCentre) params.set("centre", newCentre);
    router.replace(`/find?${params.toString()}`, { scroll: false });
  };

  // Handlers
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setSelectedLga("");
    setSelectedCentreId("");
    updateUrl(newState, "", "");
  };

  const handleLgaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLga = e.target.value;
    setSelectedLga(newLga);
    setSelectedCentreId("");
    updateUrl(selectedState, newLga, "");
  };

  const handleCentreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCentre = e.target.value;
    setSelectedCentreId(newCentre);
    updateUrl(selectedState, selectedLga, newCentre);
  };

  const handleNext = () => {
    if (selectedCentreId) {
      router.push(`/centre/${selectedCentreId}`);
    } else if (selectedState && selectedLga) {
      const params = new URLSearchParams();
      params.set("state", selectedState);
      params.set("lga", selectedLga);
      router.push(`/results?${params.toString()}`);
    }
  };

  // Disable Next until at least State and LGA are selected
  // (Or should we require Centre? Prompt says "Select Centre" is step 3.
  // "Disable next step until previous is selected".
  // Let's allow viewing results for an LGA if no centre is selected?
  // User Prompt: "Select State -> Select LGA -> Select Centre".
  // "Optional fuzzy matching on centre name" implies maybe they can skip?
  // But "Centre Search (Critical)" implies picking one.
  // However, "Results List" page description says "Display list of centres for a selected LGA".
  // So selecting LGA is enough to go to Results Page. selecting Centre goes to Centre Details.)

  const canProceed = !!(selectedState && selectedLga);

  return (
    <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
      <Select
        label="Select State"
        placeholder="Choose a state..."
        options={states}
        value={selectedState}
        onChange={handleStateChange}
      />

      <Select
        label="Select LGA / Town"
        placeholder="Choose an LGA..."
        options={lgas}
        value={selectedLga}
        onChange={handleLgaChange}
        disabled={!selectedState}
      />

      <Select
        label="Select Centre (Optional)"
        placeholder="Choose a centre..."
        options={availableCentres}
        value={selectedCentreId}
        onChange={handleCentreChange}
        disabled={!selectedLga}
      />

      <div className="pt-4">
        <Button onClick={handleNext} disabled={!canProceed} fullWidth>
          {selectedCentreId ? "View Centre Details" : "View All Centres in LGA"}
        </Button>
      </div>
    </div>
  );
}

export default function FindPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      {/* Home Button */}
      <nav className="absolute left-6 top-6">
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-all group-hover:ring-gray-300">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </div>
          <span>Home</span>
        </Link>
      </nav>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Search Centres</h1>
        <p className="mt-2 text-gray-600">
          Filter by state and LGA to find your exam venue.
        </p>
      </div>

      <Suspense
        fallback={<div className="text-center p-4">Loading search...</div>}
      >
        <SearchForm />
      </Suspense>
    </main>
  );
}
