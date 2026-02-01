# FindMyCenter — MVP Specification

## Goal

Provide a fast, reliable way for candidates to locate their official JAMB exam centre using text-based search.

## Core Principles

- Text-first, map-second
- Deterministic selection (no free-text guessing)
- Offline-friendly
- Static-first architecture

## In Scope (MVP)

- State → LGA → Centre filtering
- Static data from local JSON
- Optional embedded map
- Desktop-first UI

## Out of Scope (MVP)

- User accounts
- Crowd-sourced submissions
- Real-time updates
- Native mobile apps

## Data Contract

- Centre data is read-only
- IDs are stable
- JSON is the source of truth
- "Anchor Centres" used for zero-coverage LGAs
- **Data Boundary**: `src/data/` is runtime; `scripts/` is tooling only.

## Future Phases

- Verification status
- Confidence scoring
- Mobile optimization
- Offline PWA caching
