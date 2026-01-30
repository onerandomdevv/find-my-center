# FindMyCenter

**FindMyCenter** is a "Text-First" exam centre locator designed for reliability on exam days in Nigeria. It prioritizes speed, accuracy, and low data usage to ensure candidates can find their offical exam venues even on slow 3G networks or without map data.

## 🚀 Core Philosophy
**"Text-First, Map-Second"**
Maps are treated as an enhancement, not a dependency. If a map fails to load or data is poor, the app remains 100% functional using descriptive addresses and landmarks.

## 🛠️ Tech Stack
-   **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Architecture**: Client-side logic with URL state persistence for resilience.

## ✨ Features

### 1. Reliable Search Flow
-   **Deterministic Logic**: Users select State -> LGA -> Centre. No free-text guessing.
-   **URL Persistence**: Search state is saved in the URL (e.g., `/find?state=Lagos&lga=Ikeja`), allowing results to be shared or reloaded without data loss.

### 2. Guarded Data & Maps
-   **Ambiguity Guards**: Every result explicitly lists Centre Name + State + LGA to prevent confusion with similar names in different towns.
-   **Map Guardrails**: Google Maps only load if the data `confidence_score` is ≥ 70.
-   **Trust Indicators**: Clear badges distinguish between "Confirmed" (Official) and "Unverified" (Crowdsourced) locations.

### 3. Resilience & Performance
-   **Instant Load**: Landing page designed to load in < 2s on 3G.
-   **Global Error Boundary**: graceful error handling prevents "White Screens of Death" on crash.
-   **Lazy Loading**: Maps are lazy-loaded to save user data.

## 🚦 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/onerandomdevv/find-my-center.git
    cd find-my-center
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the app**:
    Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure
-   `src/app`: App Router pages (Landing, Find, Results, Details).
-   `src/components`: Reusable UI components (Buttons, Selects, MapView).
-   `src/data`: Mock database (`centres.json`).
-   `src/types`: TypeScript definitions.

---
*Built for reliability.*
