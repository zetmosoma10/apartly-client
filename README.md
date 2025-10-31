# Apartly Client

Apartly Client is a modern web application built with **React + TypeScript + Tailwindcss** and **React Query**.  
It connects to the [Apartly API](../apartly-api) to provide users with a seamless way to browse, filter, and review apartments.

## ✨ Features

- **User Roles** – Tenant, Landlord, and Admin
- **Apartment Management** – Create, update, delete, and view apartments
- **Advanced Filtering** – Search, sort, and filter by price, type, and status
- **Image Uploads** – Managed via **Cloudinary**
- **Reviews & Ratings** – Tenants can review and rate apartments
- **JWT Authentication** – Secure authentication and token validation
- **Pagination & Metadata** – Efficient listing responses
- **Optimistic update and caching** - Data cache with Tanstack
- **Map Location** - View apartment location on map using **leaflet**
- **View Image Galleries** - View Image galleries with **react-image-gallery**
- **Client-side routing** with **React Router**
- **Responsive and mobile-friendly UI**

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
- **react-hot-toast**
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
