const fs = require('fs');
const path = require('path');

const centersPath = path.join(__dirname, '../src/data/centers.json');
const rawData = fs.readFileSync(centersPath, 'utf8');
const centers = JSON.parse(rawData);

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-')   // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start of text
    .replace(/-+$/, '');      // Trim - from end of text
}

let updatedCount = 0;
let idFixedCount = 0;
let coordsFixedCount = 0;

const seenIds = new Set();

const updatedCenters = centers.map((center, index) => {
  let isUpdated = false;

  // 1. Fix IDs
  if (!center.id || center.id.trim() === '') {
    // Generate base slug: state-town-name
    // If town is missing, use just state-name
    let baseSlug = '';
    const safeState = slugify(center.state || 'unknown');
    const safeTown = slugify(center.town || 'center');
    const safeName = slugify(center.centerName || `item-${index}`);

    if (center.town) {
        baseSlug = `${safeState}-${safeTown}-${safeName}`;
    } else {
        baseSlug = `${safeState}-${safeName}`;
    }

    // Ensure uniqueness
    let finalSlug = baseSlug;
    let counter = 1;
    while (seenIds.has(finalSlug)) {
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    center.id = finalSlug;
    idFixedCount++;
    isUpdated = true;
  }

  // Track ID to ensure uniqueness for next iterations (even if original ID was present)
  // If an existing ID is a duplicate, we should technically fix it too, but let's assume originals are okay for now
  // unless we see a collision.
  if (seenIds.has(center.id)) {
      // Collision detected on existing ID! Fix it.
      let baseSlug = center.id;
      let counter = 1;
      while (seenIds.has(`${baseSlug}-${counter}`)) {
          counter++;
      }
      center.id = `${baseSlug}-${counter}`;
      isUpdated = true;
  }
  seenIds.add(center.id);


  // 2. Fix Partial Coordinates
  // If one is null but other is set, or if they are 0, wipe them.
  const lat = parseFloat(center.latitude);
  const lng = parseFloat(center.longitude);

  const hasLat = !isNaN(lat) && center.latitude !== null;
  const hasLng = !isNaN(lng) && center.longitude !== null;

  if (hasLat !== hasLng) {
      // One is missing/invalid, wipe both
      center.latitude = null;
      center.longitude = null;
      coordsFixedCount++;
      isUpdated = true;
  }
  
  // Also wipe if lat/lng are exactly 0 (often default placeholders)
  if (hasLat && hasLng && lat === 0 && lng === 0) {
      center.latitude = null;
      center.longitude = null;
      coordsFixedCount++;
      isUpdated = true;
  }

  if (isUpdated) updatedCount++;
  return center;
});

// Write back
fs.writeFileSync(centersPath, JSON.stringify(updatedCenters, null, 2), 'utf8');

console.log(`✅ Data cleanup complete.`);
console.log(`- Total centers processed: ${centers.length}`);
console.log(`- IDs generated/fixed: ${idFixedCount}`);
console.log(`- Corrupt coordinates wiped: ${coordsFixedCount}`);
console.log(`- Total entries updated: ${updatedCount}`);
