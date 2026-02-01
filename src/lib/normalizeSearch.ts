import aliasesData from '@/data/lga-aliases.json';

/**
 * Normalizes state and LGA names to resolve search targets.
 * This logic ensures that searching for an official LGA name also returns
 * results for known neighbourhoods mapped to that LGA.
 * 
 * Rules:
 * 1. Always include the original LGA name in search targets.
 * 2. If the (state, lga) pair exists in the alias map, include those mapped towns.
 * 3. Returns a unique array of strings for exact matching against centre.town.
 */
export function getSearchTargets(state: string | null, lga: string | null): string[] {
  if (!state || !lga) return [];

  const stateMap = (aliasesData as Record<string, Record<string, string[]>>)[state] || {};
  const aliases = stateMap[lga] || [];

  // Always include the LGA itself + any mapped neighbourhoods
  const targets = new Set([lga, ...aliases]);
  
  return Array.from(targets);
}
