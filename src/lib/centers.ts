import centers from "../data/centers.json";

export type Center = {
  id: string;
  state: string;
  town: string;
  centerName: string;
  address: string;
  latitude: number | null;
  longitude: number;
  landmark: string;
};

// Return all centers
export function getAllCenters(): Center[] {
  return centers as Center[];
}

// Find one center by ID
export function getCenterById(id: string): Center | undefined {
  return (centers as Center[]).find(c => c.id === id);
}

// Filter by state and/or town
export function filterCenters(
  state?: string,
  town?: string
): Center[] {
  return (centers as Center[]).filter(center => {
    const stateMatch = state
      ? center.state.toLowerCase() === state.toLowerCase()
      : true;

    const townMatch = town
      ? center.town.toLowerCase() === town.toLowerCase()
      : true;

    return stateMatch && townMatch;
  });
}
