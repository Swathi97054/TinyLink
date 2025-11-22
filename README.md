# TinyLink - Take-home scaffold
Minimal Next.js + Prisma starter for the TinyLink assignment.

## What is included
- Next.js pages (API + UI)
- Prisma schema
- Basic pages: Dashboard (`/`), Stats (`/code/:code`), Redirect (`/:code`)
- API endpoints required by the spec

## How to run (local)
1. Install deps:
   ```bash
   npm install
   ```
2. Create a Postgres DB and set `DATABASE_URL` in `.env`:
   See `.env.example`.
3. Run Prisma migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Run dev:
   ```bash
   npm run dev
   ```

## Assignment PDF
The original assignment PDF uploaded is included in the workspace path:
`/mnt/data/Take-Home Assignment_ TinyLink (1) (2).pdf`

