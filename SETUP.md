# Setup Guide

## Prerequisites

- Node.js 18+
- A MongoDB database (MongoDB Atlas recommended — free tier works fine)
- A Vercel account (for Blob storage and deployment)

---

## Environment Variables

Create a `.env` file in the project root. Here's what each variable does:

```env
# MongoDB connection string from MongoDB Atlas
DATABASE_URL="mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority&appName=Cluster0"

# Any long random string — used to sign JWT session tokens
# Generate one: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
NEXTAUTH_SECRET="your-random-secret-here"

# Base URL of your app

NEXTAUTH_URL="http://localhost:3000"


# Vercel Blob token for image uploads
# Get this from: Vercel Dashboard → Storage → Blob → your store → .env.local
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxxxxxxxxxxxxx"
```

### Getting each value

**DATABASE_URL**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com) and create a free cluster
2. Click "Connect" → "Drivers" → copy the connection string
3. Replace `<password>` with your DB user password and `<dbname>` with your database name (e.g. `uraerotech`)

**NEXTAUTH_SECRET**
Run this in your terminal and paste the output:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**BLOB_READ_WRITE_TOKEN**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Open your project → Storage tab → Create a Blob store (or use existing) attache you project from drop down and then redeploy in vercel 


---

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma client
npx prisma generate

# 3. Push schema to your MongoDB database
npx prisma db push

# 4. Seed the database with initial data (categories, services, industries, products)
npm run seed

# 5. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Creating an Admin User

1. Register a new account at `/auth/signup`
2. Open [Prisma Studio](https://www.prisma.io/studio) to update the role:
```bash
npx prisma studio
```
3. Find your user in the `User` table → change `role` to `ADMIN` → save

---

## Deploying to Vercel

### 1. Push your code to GitHub

```bash
git add .
git commit -m "initial commit"
git push origin main
```

### 2. Import project in Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import" next to your GitHub repo
3. Leave the build settings as-is (Vercel auto-detects Next.js)
4. Click "Deploy" — it will fail the first time because env vars aren't set yet, that's fine

### 3. Add environment variables

In your Vercel project → Settings → Environment Variables, add:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your MongoDB Atlas connection string |
| `NEXTAUTH_SECRET` | Your random secret string |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` (your actual Vercel URL) |
| `BLOB_READ_WRITE_TOKEN` | Your Vercel Blob token |

> Make sure to set these for **Production**, **Preview**, and **Development** environments.

### 4. Redeploy

Go to Deployments tab → click the three dots on the latest deployment → Redeploy.

### 5. Seed the production database (first time only)

After deploying, run the seed script locally — it connects to the same `DATABASE_URL` so it seeds your production MongoDB:

```bash
npm run seed
```

---

## Common Issues

**Build fails with `DATABASE_URL not found`**
→ The env var isn't set in Vercel. Double-check Settings → Environment Variables.

**Images not uploading**
→ `BLOB_READ_WRITE_TOKEN` is missing or wrong. Make sure it's set in both local `.env` and Vercel env vars.

**`NEXTAUTH_URL` mismatch errors**
→ Make sure `NEXTAUTH_URL` in Vercel matches your actual deployment URL exactly (no trailing slash).

**Prisma client not generated**
→ The build command is `prisma generate && next build` (already set in `package.json`), so this runs automatically on Vercel.
