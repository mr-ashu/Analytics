# Mini Analytics Portal (Mixpanellite Clone)

A React + TypeScript analytics UI with local (mocked) authentication, protected routes, filterable dashboard, timeseries chart, TopN table, and CSV export — all with no backend APIs.

## Features
- **Authentication**: UI-simulated login (editor@demo.com / password123), protected routes, logout.
- **Dashboard**: Timeseries chart, TopN table, project/event/breakdown/date filters.
- **Shareable Views**: URL search params reflect filters and restore on refresh/share.
- **Export**: Export TopN table to CSV (matches visible data).
- **Local Data**: All data is generated locally (see `src/Utils/fakeApi.ts`).
- **Error/Loading/Empty States**: Simulated latency and 10% error rate, with user-friendly UI.
- **State Management**: Redux Toolkit + redux-persist for auth, URL state for filters.
 

## How to Run
```sh
pnpm install   # or npm install
pnpm dev       # or npm start
```

## How to Test
```sh
pnpm test      # or npm test
```

## No-backend Approach
- All analytics data is generated in `src/Utils/fakeApi.ts` using seeded random for determinism.
- Simulates latency (300ms) and 10% error rate for realistic UX.
- No network/API calls are made.

## Auth
- Auth state is managed with Redux Toolkit and persisted to localStorage via redux-persist.
- Only `editor@demo.com` / `password123` is accepted.
- ProtectedRoute ensures only authenticated users can access `/dashboard`.
- Logout clears auth state and returns to `/login`.

## State & Data Modeling; URL State
- Auth: Redux Toolkit + redux-persist.
- Filters: URL search params (react-router's useSearchParams).
- Data: Local mock utilities, deterministic by filter.

## Tradeoffs, Assumptions, TODOs
- No backend, so all data is mock/deterministic.
- Error/empty state simulation is basic but covers requirements.
 
