# GateWise

GateWise is a society management platform with a web dashboard, a mobile app, and a Node.js API. It supports role-based access for admins, residents, security guards, and service staff.

## Apps

- `frontend` - React + Vite web app with landing page, login, admin dashboard, and role dashboards.
- `mobile` - Expo Router mobile app for residents, guards, and service staff.
- `backend` - Express + Prisma API with PostgreSQL, JWT auth, Socket.IO, Redis queues, and notification support.

## Features

- Role-based login for `ADMIN`, `RESIDENT`, `SECURITY`, and `SERVICE` users.
- Admin dashboard for users, guards, service staff, flats, notices, complaints, and entry logs.
- Resident flows for visitors, passes, complaints, notices, messages, vault, and profile.
- Guard flows for gate activity, QR scanning, alerts, status, and settings.
- Backend modules for auth, users, societies, flats, notices, complaints, passes, entry logs, and notifications.
- Real-time Socket.IO rooms for user and society-level notifications.

## Requirements

- Node.js and npm
- PostgreSQL database
- Redis server for queues and notification jobs
- Expo tooling for the mobile app

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Update `backend/.env` with your database, JWT, Redis, and optional Cloudinary/SMTP values.

Required values:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:54322/postgres
DIRECT_URL=postgresql://postgres:postgres@localhost:54322/postgres
JWT_SECRET=gatewise-super-secret-jwt-key-change-in-production
PORT=5000
REDIS_URL=redis://localhost:6379
CORS_ORIGIN=http://localhost:5173
```

Generate the Prisma client and seed demo data:

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

If Prisma seeding is unavailable in your shell, run:

```bash
node prisma/seed.js
```

Start the API:

```bash
npm run dev
```

The API runs on `http://localhost:5000` and exposes a health check at `http://localhost:5000/api/health`.

## Web Frontend Setup

```bash
cd frontend
npm install
```

Optional `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the web app:

```bash
npm run dev
```

The Vite app usually runs on `http://localhost:5173`.

## Mobile Setup

```bash
cd mobile
npm install
npx expo start -c
```

The mobile API client auto-detects the Expo dev server host and maps it to port `5000`. To override it manually, set:

```env
EXPO_PUBLIC_API_URL=http://YOUR_MACHINE_IP:5000
```

## Demo Accounts

The seed script creates these accounts:

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@gatewise.com` | `Admin@123` |
| Resident | `resident1@test.com` | `Resident@123` |
| Resident | `resident2@test.com` | `Resident@123` |
| Security | `guard1@test.com` | `Guard@123` |
| Security | `guard2@test.com` | `Guard@123` |
| Service | `service1@test.com` | `Service@123` |
| Service | `service2@test.com` | `Service@123` |

## Useful Commands

Backend:

```bash
cd backend
npm run dev
npm start
```

Frontend:

```bash
cd frontend
npm run dev
npm run build
npm run lint
```

Mobile:

```bash
cd mobile
npx expo start -c
npm run android
npm run ios
npm run web
npm run lint
```

## Current Status

- Web landing page, login, and admin dashboard are present.
- Backend API is structured by modules and uses Prisma with PostgreSQL.
- Mobile app has resident, guard, service, and auth route groups.
- Real-time notifications and entry request UI are partially wired through Socket.IO and mobile hooks.
- Starter template screens, unused mobile UI primitives, and duplicate web API clients have been removed.
- Web role dashboards now have role-specific portal screens.

## TODO

- Finish production-ready database migrations and deployment setup.
- Complete guard camera and QR scanner flows.
- Harden authentication, password reset, and session/logout behavior across web and mobile.
- Finish real-time notification behavior end-to-end.
- Continue polishing deeper account/profile settings as backend fields are finalized.
