<p align="center">
  <img src="./docs/showcase-frontend.gif" width="48%" alt="Storefront Navigation & Cart" />
  <img src="./docs/showcase-admin.gif" width="48%" alt="Payload CMS Real-Time Sync" />
</p>

# Rooted Boutique: Headless E-Commerce Workspace

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2.4-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Payload_CMS-3.84.1-111111?style=flat-square&logo=payload" alt="Payload CMS" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TypeScript-6.0.3-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-4169E1?style=flat-square" alt="MIT License" />
</p>

<p align="center">
  <a href="https://rooted-boutique.vercel.app" target="_blank" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/Launch_Live_Demo-Vercel-2c3e30?style=for-the-badge&logo=vercel" alt="Launch Live Demo" />
  </a>
</p>

An enterprise-grade, monorepo e-commerce engine pairing Next.js 16 (App Router) with Payload CMS 3.0 (headless CMS) and PostgreSQL. This workspace resolves the "split-brain" content/transaction problem by unifying the digital storefront and product relationship schemas within a single Next.js application runtime.

---

## 1. Business Value & Core Problem Solved

Traditional headless e-commerce architectures separate the content management system (CMS) from the transaction/inventory server. This separation introduces high HTTP network overhead, inconsistent relational states, synchronization latency, and complex webhook structures. 

This repository solves these issues through:
* **Zero-HTTP Local Queries**: By co-locating the CMS and frontend inside the same Node.js runtime, the storefront queries database records directly via Payload's local Node.js API, eliminating API gateway hop latency.
* **Instant Visual Consistency**: Content modifications or inventory status adjustments (such as stock depletion) immediately synchronize across the admin interface and public storefront on-demand.
* **Deterministic Relational Integrity**: A unified database schema links users, physical product listings, categories, and real-time order states natively, ensuring absolute transaction reliability.

---

## 2. Core Features

* **Headless Storefront:** Full product catalog, category filtering, and real-time stock indicators.
* **State Management:** Client-side cart functionality bridging server-rendered pages.
* **Admin Dashboard:** Complete CRUD interface for products, categories, and dynamic media handling.
* **Image Optimization:** Automated on-the-fly image resizing and compression for fast load times.

---

## 3. Key Architectural Decisions

### 3.1. Unified Next.js + Payload 3.0 Runtime
Unlike traditional decoupled architectures (such as Next.js + external Contentful or Strapi), this project integrates the CMS admin dashboard directly into the Next.js `app/` folder structure:
* **`/src/app/(payload)`**: Hosts the administrative CMS layout, REST API endpoints, and deep relationship drawers.
* **`/src/app/(frontend)`**: Houses the editorial storefront.
This co-location allows the frontend React Server Components (RSC) to access data natively via Payload's Local API (`getPayload`), which establishes a direct connection to the database.

### 3.2. Incremental Cache Invalidation (ISR)
The storefront utilizes Next.js on-demand revalidation to combine static page speeds with real-time dynamic inventory accuracy:
* An `afterChange` hook is attached to the `Products` and `Categories` collections (`src/payload/hooks/revalidateProducts.ts`).
* When a content manager modifies a product or its stock levels inside the CMS, the hook triggers Next.js's native `revalidateTag('products')` internally.
* This on-demand cache invalidation eliminates expensive background polling or fragile external webhooks.

### 3.3. Drizzle ORM & Postgres Adapter
Database interaction is managed via `@payloadcms/db-postgres`, which is built on **Drizzle ORM** and **pg**. Drizzle translates collection definitions (such as `src/payload/collections/Products.ts`) into strongly typed SQL schemas and manages automated relational migrations deterministically.

### 3.4. End-to-End Type Safety
TypeScript types are compiled directly from the Payload schemas to `src/payload/payload-types.ts`. Frontend page routes and UI components import these exact interfaces, preventing runtime hydration mismatches and guaranteeing compile-time validation.

### 3.5. Serverless Cloud Infrastructure
The production environment is optimized for a serverless edge architecture via Vercel. 
* **Database:** Hosted serverless PostgreSQL via Supabase, utilizing an IPv4 Transaction Pooler (`pgbouncer`) to resolve serverless IPv6 connection constraints.
* **Media Storage:** Integrated `@payloadcms/storage-s3` plugin routed to a Supabase S3 bucket, bypassing Vercel's ephemeral file system limitations and optimizing media delivery via `sharp`.

---

## 4. Local Development Guide

### 4.1. Prerequisites
Ensure the following software packages are installed locally:
* **Node.js**: `v18.20.0` or higher
* **Package Manager**: `pnpm` (v8+)
* **Database**: **PostgreSQL** instance (local, Docker container, or hosted)

### 4.2. Local Database Setup (Docker Option)
If you do not have a native PostgreSQL instance running, you can spin up a localized, pre-configured Postgres container using Docker in a single command:

```bash
docker run --name rooted-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=rooted_boutique \
  -p 5432:5432 \
  -d postgres:16-alpine
```

This container is pre-configured to match the default connection parameters provided in our `.env.example` template.

### 4.3. Configuration Environment
Initialize your environment file from the provided repository template:

```bash
# Copy the example environment variables to create your local environment config
cp .env.example .env
```

Open the newly created `.env` file and customize the variables to match your local setup:

```env
# Database Credentials
# Replace with your local PostgreSQL connection string
DATABASE_URI=postgres://postgres:postgres@127.0.0.1:5432/rooted_boutique

# Next.js Server Port Configuration (typically 3000-3002)
PORT=3002

# Encryption Keys (Minimum 24 characters)
PAYLOAD_SECRET=your_32_byte_highly_secure_secret_hash_here

# Payload Internal Environment Variable Routing
PAYLOAD_CONFIG_PATH=src/payload/payload.config.ts
```

### 4.4. Installation and Development Boot
Execute the following commands in order to pull dependencies, compile database mappings, and launch the localized dev environment:

```bash
# 1. Install workspace dependencies
pnpm install

# 2. Run the Next.js and Payload concurrent development server
pnpm dev
```

The development server will boot concurrently. 
* Access the editorial public storefront at: **`http://localhost:3002`**
* Access the Payload administrative dashboard at: **`http://localhost:3002/admin`**

### 4.5. Administrative Account Initialization
Upon accessing the `/admin` portal for the first time, you will be prompted to register the master administrative user accounts. This seed action creates your credentials in the localized PostgreSQL relational database.
