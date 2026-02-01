# FindMyCenter 📍

**FindMyCenter** is a mission-critical web application that helps Nigerian students reliably locate their official JAMB exam centres — even on slow networks or when maps are unavailable.

> **Mission:** No student should miss their exam because they couldn’t find the venue.

---

## ✨ Key Features

- ⚡ **Text-First, Offline-Friendly**
  Designed to work on slow 3G networks. Maps are an enhancement, not a dependency.

- 🛡️ **Clean & Verified Data**
  890+ exam centres cleaned, normalized, and structured for accuracy and consistency.

- 🔍 **Deterministic Search Flow**
  Users filter by **State → LGA → Centre** to avoid ambiguity and similar place names.

- 🗺️ **Optional Map View**
  Embedded map view for visual context, without forcing external navigation apps.

- 🚀 **Instant Load (SSG)**
  Pages are statically generated for near-zero load time and high reliability.

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Google Maps Embed API
- **Data Layer**: Local JSON in `src/data/` (SSG-friendly)
- **Deployment Target**: Static-first (Vercel-ready)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/onerandomdevv/find-my-center.git
cd find-my-center
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
src/
 ├─ data/                 # Production Runtime Data (SSG source)
 │   ├─ centers.json      # Cleaned exam centre database
 │   └─ lga-aliases.json  # Search normalization mappings
 │
 ├─ app/                  # Next.js App Router
 ├─ components/           # UI Components
 └─ lib/                  # Shared utilities

scripts/                  # Offline Tooling (Build-time / Auditing)
 ├─ data/                 # Authoritative reference data
 ├─ audits/               # Generated reports and verify logs
 ├─ debug/                # Temporary inspection artifacts
 └─ data-audit.ts         # Data coverage analysis tool
```

> **Architecture Note:** `src/data/` is the only directory imported by frontend code. `scripts/` is for local development and auditing only.

## 📊 Data Coverage & Audit

The project includes tooling to ensure high data availability across Nigeria.

### Running the Data Audit

To verify coverage against official LGA requirements:

```bash
npx tsx scripts/data-audit.ts
```

This script identifies:

- Missing LGAs (Zero coverage)
- Low-coverage states (< 50%)
- Data gaps in high-population areas (Lagos, FCT, etc.)

## 🤝 Contributing

We welcome contributions.

1.  **Fork** the repository
2.  **Create a branch**: `git checkout -b feature/your-feature`
3.  **Commit** your changes with a clear message
4.  **Push** the branch and open a Pull Request

> **Note:** Please run `npm run build` before pushing.
> The project uses Static Site Generation (SSG), and builds must pass.

## 🧭 Project Philosophy

- **Text-first, map-second**
- **Reliability over aesthetics**
- **Static > dynamic when possible**
- **Clear data contracts**

## 📄 License

This project is open-source. License to be finalized.
