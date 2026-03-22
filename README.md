# SkillBridge — Backend API

Node.js + Express + Prisma + PostgreSQL REST API for the SkillBridge tutoring platform.

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment
```bash
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/skillbridge"
JWT_SECRET="any-long-random-secret-string"
JWT_EXPIRES_IN="7d"
PORT=5000
FRONTEND_URL="http://localhost:3000"
NODE_ENV="development"
```

### 3. Push schema to database
```bash
npx prisma db push
```

### 4. Seed demo data
```bash
npm run db:seed
```

### 5. Start dev server
```bash
npm run dev
```

API runs at: **http://localhost:5000**

---

## Demo Accounts

| Role    | Email                   | Password   |
|---------|-------------------------|------------|
| Admin   | jhadam904@gmail.com     | admin123   |
| Tutor   | sarah@skillbridge.com   | tutor123   |
| Student | alex@example.com        | student123 |

---

## Project Structure

```
backend/
├── prisma/
│   └── schema.prisma        # Database schema (7 models)
├── src/
│   ├── index.js             # Express app entry point
│   ├── lib/
│   │   ├── prisma.js        # Prisma client singleton
│   │   └── seed.js          # Database seeder
│   ├── middleware/
│   │   └── auth.js          # JWT auth + role guard
│   └── routes/
│       ├── auth.js          # /api/auth/*
│       ├── tutors.js        # /api/tutors/*
│       ├── bookings.js      # /api/bookings/*
│       ├── reviews.js       # /api/reviews/*
│       ├── categories.js    # /api/categories/*
│       ├── tutorManage.js   # /api/tutor/*
│       └── admin.js         # /api/admin/*
├── .env.example
├── package.json
└── README.md
```

---

## API Reference

### Authentication
| Method | Endpoint            | Auth    | Body / Params                          |
|--------|---------------------|---------|----------------------------------------|
| POST   | /api/auth/register  | None    | name, email, password, role            |
| POST   | /api/auth/login     | None    | email, password                        |
| GET    | /api/auth/me        | Bearer  | —                                      |

### Tutors (Public)
| Method | Endpoint            | Auth    | Query Params                           |
|--------|---------------------|---------|----------------------------------------|
| GET    | /api/tutors         | None    | search, category, minRate, maxRate, minRating, sort |
| GET    | /api/tutors/:id     | None    | —                                      |

### Categories
| Method | Endpoint            | Auth    | Notes                                  |
|--------|---------------------|---------|----------------------------------------|
| GET    | /api/categories     | None    | —                                      |
| POST   | /api/categories     | Admin   | name, description                      |
| DELETE | /api/categories/:id | Admin   | —                                      |

### Bookings
| Method | Endpoint                    | Auth    | Notes                      |
|--------|-----------------------------|---------|----------------------------|
| POST   | /api/bookings               | Student | Create booking             |
| GET    | /api/bookings               | Student/Tutor | My bookings          |
| GET    | /api/bookings/:id           | Student/Tutor/Admin | —            |
| PATCH  | /api/bookings/:id/cancel    | Student | CONFIRMED → CANCELLED      |
| PATCH  | /api/bookings/:id/complete  | Tutor   | CONFIRMED → COMPLETED      |

### Reviews
| Method | Endpoint      | Auth    | Notes                                  |
|--------|---------------|---------|----------------------------------------|
| POST   | /api/reviews  | Student | Only on COMPLETED bookings, 1 per booking |

### Tutor Self-Management
| Method | Endpoint               | Auth  | Notes                       |
|--------|------------------------|-------|-----------------------------|
| GET    | /api/tutor/profile     | Tutor | Own profile with categories |
| PUT    | /api/tutor/profile     | Tutor | bio, hourlyRate, experience, categoryIds |
| PUT    | /api/tutor/availability| Tutor | Replace all availability slots |

### Admin
| Method | Endpoint              | Auth  | Notes                          |
|--------|-----------------------|-------|--------------------------------|
| GET    | /api/admin/stats      | Admin | Platform statistics            |
| GET    | /api/admin/users      | Admin | ?role=TUTOR&search=name        |
| PATCH  | /api/admin/users/:id  | Admin | { isBanned: true/false }       |
| GET    | /api/admin/bookings   | Admin | ?status=CONFIRMED              |

---

## NPM Scripts

```bash
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production server
npm run db:seed      # Seed demo data
npm run db:push      # Push schema changes to DB
npm run db:migrate   # Run Prisma migrations
npm run db:studio    # Open Prisma Studio (GUI)
npm run db:reset     # Reset DB and re-seed
```

---

## Database Models

| Model           | Description                                   |
|-----------------|-----------------------------------------------|
| User            | Auth + role (STUDENT / TUTOR / ADMIN)         |
| TutorProfile    | Tutor-specific info linked to User            |
| Category        | Subject categories                            |
| TutorCategory   | Many-to-many: tutors ↔ categories             |
| Availability    | Weekly time slots per tutor                   |
| Booking         | Session bookings (CONFIRMED/COMPLETED/CANCELLED) |
| Review          | Student reviews (1 per completed booking)     |

---

## Deployment (Render)

1. Create a **Web Service** on [render.com](https://render.com)
2. Set root directory to `backend/`
3. Build command: `npm install && npx prisma generate`
4. Start command: `npm start`
5. Add environment variables from `.env.example`
6. Use a **PostgreSQL** database (Render or Neon or Supabase)
