import centersData from '@/data/centers.json';
import aliasesData from '@/data/lga-aliases.json';

export interface CoverageInfo {
  hasAliasMapping: boolean;
  availableTowns: string[];
  hasAnyStateCoverage: boolean;
}

/**
 * Checks the coverage status for a given State and LGA.
 * Used to provide helpful feedback when no results are found.
 */
export function getCoverageInfo(state: string | null, lga: string | null): CoverageInfo {
  if (!state) {
    return {
      hasAliasMapping: false,
      availableTowns: [],
      hasAnyStateCoverage: false,
    };
  }

  // 1. Check for aliases
  const stateMap = (aliasesData as Record<string, Record<string, string[]>>)[state] || {};
  const aliases = lga ? stateMap[lga] || [] : [];
  const hasAliasMapping = aliases.length > 0;

  // 2. Check for any state coverage
  // We use the raw dataset to see if ANY center exists for this state
  const hasAnyStateCoverage = centersData.some(c => c.state === state);

  return {
    hasAliasMapping,
    availableTowns: aliases,
    hasAnyStateCoverage,
  };
}
