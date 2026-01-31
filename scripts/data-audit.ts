import fs from 'fs';
import path from 'path';

// Define types for our data
interface Centre {
  state: string;
  town?: string;
  lga_or_town?: string;
  centerName: string;
}

interface StateData {
  state: string;
  lgas: string[];
}

interface StateStats {
  totalLgas: number;
  coveredLgas: number;
  coveragePercent: number;
  missingLgas: string[];
}

const HIGH_POPULATION_STATES = [
  'Lagos', 
  'Oyo', 
  'Rivers', 
  'Ogun', 
  'FCT', 
  'Kano', 
  'Kaduna', 
  'Katsina' // Also high pop
];

function normalize(str: string): string {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function runAudit() {
  const centersPath = path.join(process.cwd(), 'src/data/centers.json');
  const lgasPath = path.join(process.cwd(), 'scripts/data/nigeria-lgas.json');

  console.log('Loading data...');
  
  if (!fs.existsSync(centersPath) || !fs.existsSync(lgasPath)) {
    console.error('Error: Data files not found.');
    console.error(`Centers: ${centersPath} (${fs.existsSync(centersPath) ? 'Found' : 'Missing'})`);
    console.error(`LGAs: ${lgasPath} (${fs.existsSync(lgasPath) ? 'Found' : 'Missing'})`);
    process.exit(1);
  }

  const centers: Centre[] = JSON.parse(fs.readFileSync(centersPath, 'utf-8'));
  const referenceData: StateData[] = JSON.parse(fs.readFileSync(lgasPath, 'utf-8'));

  console.log(`Loaded ${centers.length} centers and reference data for ${referenceData.length} states.`);

  const auditReport: Record<string, StateStats> = {};

  // Create a map of existing normalized "towns/lgas" per state from centers.json
  const existingLgasPerState: Record<string, Set<string>> = {};

  centers.forEach(c => {
    let state = c.state;
    
    // Normalize State Names if necessary (e.g. Abuja -> FCT)
    if (state.toLowerCase().includes('abuja') || state.toLowerCase() === 'fct') {
      state = 'FCT';
    }

    if (!existingLgasPerState[state]) {
      existingLgasPerState[state] = new Set();
    }

    // Check both town and lga_or_town fields
    const town = c.town;
    const lga = c.lga_or_town; // Note: lga_or_town might be undefined in raw json if not transformed yet? 
    // Wait, centers.json is raw. src/lib/data.ts transforms it.
    // In raw JSON, we saw "town". 'lga_or_town' is likely not in existing raw JSON based on view_file #8.
    // Let's rely on "town".
    
    if (town) existingLgasPerState[state].add(normalize(town));
    // If lga field existed, we'd check that too.
  });

  console.log('\n--- DATA COVERAGE AUDIT ---\n');

  let lowCoverageCount = 0;

  referenceData.forEach(stateRef => {
    const stateName = stateRef.state;
    const allLgas = stateRef.lgas;
    
    // Match state name in existing data (handle case sensitivity)
    // We used exact keys in existingLgasPerState but let's be safe
    const existingStateKey = Object.keys(existingLgasPerState).find(k => k.toLowerCase() === stateName.toLowerCase());
    const coveredSet = existingStateKey ? existingLgasPerState[existingStateKey] : new Set<string>();

    const missing: string[] = [];
    allLgas.forEach(lga => {
      // We check if the standardized LGA name exists in our centers data
      // We also check for partial matches loosely? No, user wants identifying GAPS.
      // If "Agege" is in centers as "Agege", matching normalized "agege" works.
      if (!coveredSet.has(normalize(lga))) {
        missing.push(lga);
      }
    });

    const stats: StateStats = {
      totalLgas: allLgas.length,
      coveredLgas: allLgas.length - missing.length,
      coveragePercent: Math.round(((allLgas.length - missing.length) / allLgas.length) * 100),
      missingLgas: missing
    };

    auditReport[stateName] = stats;

    if (stats.coveragePercent < 50) {
      lowCoverageCount++;
    }
  });

  // OUTPUT REPORT
  console.log(`States with < 50% Coverage: ${lowCoverageCount}\n`);

  console.log('--- HIGH PRIORITY GAPS (Key States) ---');
  HIGH_POPULATION_STATES.forEach(state => {
    const stats = auditReport[state];
    if (stats) {
      console.log(`\nState: ${state} (${stats.coveredLgas}/${stats.totalLgas} covered - ${stats.coveragePercent}%)`);
      if (stats.missingLgas.length > 0) {
        console.log(`Missing LGAs: ${stats.missingLgas.join(', ')}`);
      } else {
        console.log('Full Coverage! ✅');
      }
    } else {
      console.log(`State: ${state} - No reference data found.`);
    }
  });

  console.log('\n\n--- ALL STATE COVERAGE SUMMARY ---');
  Object.entries(auditReport).forEach(([state, stats]) => {
    if (stats.coveragePercent < 100) {
       console.log(`${state}: ${stats.coveragePercent}% (${stats.missingLgas.length} missing)`);
    }
  });
  
  // Dump full report to file? Or just console. 
  // User asked for output report.
}

runAudit();
