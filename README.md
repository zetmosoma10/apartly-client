# Apartly Client

Apartly Client is a modern web application built with **React + TypeScript + Tailwindcss** and **React Query**.  
It connects to the [Apartly API](../apartly-api) to provide users with a seamless way to browse, filter, and review apartments.

## ✨ Features

- View apartments with filters: search, price, type, pagination,and status
- JWT-based login/register for users
- Role based access control, tenant, landlord and admin
- Tenant can add rating and review comments on apartments
- Landlord can perform CRUD operation for apartments
- Admin can perform CRUD operation on tenants, landlords and landlord's apartments
- View Apartment location on Map with leaflet library
- Image carousel for apartment galleries
- Landlord profiles and contact details
- Client-side routing with React Router
- Responsive and mobile-friendly UI
- Optimistic updates and caching via React Query

## 🧠 Tech Stack

- **React + TypeScript**
- **TailwindCSS**
- **React Router**
- **React Query**
- **React Hook Form + Zod**
- **Axios**
- **React Icons**
- **Leaflet**
- **Zustand**
- **Vite** (for fast builds)

## ⚙️ Environment Variables

Create `.env` in the project root:

```env
VITE_API_BASE_URL=http://localhost:3000/api

# 1️⃣ Install dependencies
npm install

# 2️⃣ Start development server
npm run dev
```
