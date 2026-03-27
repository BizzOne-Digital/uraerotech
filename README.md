# UR Aerotech

A full-stack e-commerce platform for aircraft repair services and aviation parts supply, built with Next.js, TypeScript, MongoDB, and Prisma.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB via Prisma ORM
- **Auth**: NextAuth.js (JWT)
- **Image Storage**: Vercel Blob
- **Styling**: Tailwind CSS
- **Charts**: Recharts

## Features

- Public storefront — products, services, industries, quote requests
- B2C / B2B customer accounts (B2B gets 10% discount)
- Shopping cart and checkout with stock management
- Admin dashboard — full CRUD for products, services, industries, categories, users, orders, quotes
- Image uploads via Vercel Blob
- Role-based access control (PUBLIC, B2C, B2B, ADMIN)

## Quick Start

See [SETUP.md](./SETUP.md) for full local setup and Vercel deployment instructions.

```bash
npm install
cp .env.example .env   # fill in your values
npx prisma generate
npx prisma db push
npm run seed
npm run dev
```

## Project Structure

```
app/
├── api/              # API routes (auth, products, cart, checkout, admin/*)
├── admin/            # Admin dashboard pages
├── auth/             # Sign in / Sign up pages
├── products/         # Product listing + detail
├── services/         # Services listing + detail
├── industries/       # Industries listing + detail
├── cart/             # Cart page
├── quote/            # Quote request page
├── dashboard/        # Customer dashboard
components/           # Shared UI components
lib/                  # Prisma client, auth config
prisma/
├── schema.prisma     # DB schema
└── seed.ts           # Seed script
public/               # Static assets
```

## User Roles

| Role | Description |
|------|-------------|
| B2C | Standard customer |
| B2B | Business customer — 10% discount on all products |
| ADMIN | Full platform management |

## License

Proprietary — UR Aerotech.
