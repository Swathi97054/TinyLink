# TinyLink – Modern URL Shortener (Next.js + Prisma + Neon + Vercel)

TinyLink is a modern, fast, and lightweight URL shortener built with **Next.js**, **Prisma**, **Neon PostgreSQL**, and deployed on **Vercel**.  
It allows users to shorten long URLs, generate custom short codes, track clicks, and manage links through a clean dashboard.

---

## 🚀 Features

- 🔗 Shorten long URLs  
- ✏️ Custom short codes (6–8 characters)  
- 📊 Click tracking + last-click timestamp  
- 🗑 Delete links instantly  
- 🎨 Clean, elegant UI with TailwindCSS  
- 📦 API-based architecture  
- 🌐 Fully deployed on Vercel  
- 🛢 Serverless database via Neon

---

## 🛠 Tech Stack

### Frontend
- Next.js 13 (Pages Router)
- React
- SWR
- Tailwind CSS

### Backend
- Next.js API Routes  
- Prisma ORM

### Database
- Neon (serverless PostgreSQL)

### Deployment
- Vercel

---

## 📦 Installation & Setup (Local)

### 1. Clone the repository
```sh
git clone https://github.com/Swathi97054/TinyLink.git
cd TinyLink
```
### 2. Install dependencies
```sh
npm install
```
### 3. Create .env file
Create a file named .env in the project root:
```sh
DATABASE_URL="your_neon_postgres_url"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```
### 4. Run Prisma generation & migrations
```sh
npx prisma generate
npx prisma migrate dev --name init
```
### 5. Start local server
```sh
npm run dev
```
### App runs at:

👉 http://localhost:3000 (Dashboard) \n
👉 http://localhost:3000/api/links (List Links) \n 
👉 http://localhost:3000/healthz (Health Endpoint) \n 
👉  http://localhost:3000/code/link (Stats Page)


## 🔐 Environment Variables
```sh
| Variable               | Description                     |
| ---------------------- | ------------------------------- |
| `DATABASE_URL`         | Neon Postgres Connection String |
| `NEXT_PUBLIC_BASE_URL` | Base URL of the application     |
```
## 🚀 Deployment

1. Push project to GitHub
2. Import repo in Vercel
3. Add environment variables:
```sh
DATABASE_URL=your_neon_url
NEXT_PUBLIC_BASE_URL=https://your-project.vercel.app
```
4. Deploy — Vercel builds automatically.

### API Overview
Create Short Link
```POST /api/links```
Get All Links
```GET /api/links```
Delete Link
```DELETE /api/links/:code```
Redirect
```GET /:code```

## License
MIT License
