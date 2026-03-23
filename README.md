

<video src="https://drive.google.com/uc?export=download&id=1os1zRso1WN7iDMsLWnVu-r_tR3YmoA_3" width="100%" controls>
  Your browser does not support the video tag.
</video>

# SkillBridge — Frontend

Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui

---

## Quick Start

### Step 1 — Dependencies install করো
```bash
cd skillbridge/frontend
npm install
```

### Step 2 — Environment file তৈরি করো
`frontend` folder এ `.env.local` নামে নতুন file তৈরি করো:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 3 — Development server চালু করো
```bash
npm run dev
```

Frontend চলবে: **http://localhost:3000**

---

## Important — Backend আগে চালু করতে হবে

Frontend কাজ করার জন্য Backend অবশ্যই চলতে হবে।

```bash
# Terminal 1 — Backend
cd skillbridge/backend
npm run dev

# Terminal 2 — Frontend
cd skillbridge/frontend
npm run dev
```

---

## Project Structure

```
frontend/
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── page.tsx                # Home page (/)
│   │   ├── login/page.tsx          # Login (/login)
│   │   ├── register/page.tsx       # Register (/register)
│   │   ├── tutors/
│   │   │   ├── page.tsx            # Browse Tutors (/tutors)
│   │   │   └── [id]/page.tsx       # Tutor Profile (/tutors/:id)
│   │   ├── dashboard/
│   │   │   ├── layout.tsx          # Student dashboard layout
│   │   │   ├── page.tsx            # Student Overview (/dashboard)
│   │   │   ├── bookings/page.tsx   # My Bookings (/dashboard/bookings)
│   │   │   └── profile/page.tsx    # Student Profile (/dashboard/profile)
│   │   ├── tutor/
│   │   │   ├── layout.tsx          # Tutor dashboard layout
│   │   │   ├── dashboard/page.tsx  # Tutor Overview (/tutor/dashboard)
│   │   │   ├── profile/page.tsx    # Tutor Profile (/tutor/profile)
│   │   │   └── availability/page.tsx # Set Availability (/tutor/availability)
│   │   └── admin/
│   │       ├── layout.tsx          # Admin layout
│   │       ├── page.tsx            # Admin Overview (/admin)
│   │       ├── users/page.tsx      # Manage Users (/admin/users)
│   │       ├── bookings/page.tsx   # All Bookings (/admin/bookings)
│   │       └── categories/page.tsx # Categories (/admin/categories)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Navigation bar
│   │   │   └── Footer.tsx          # Footer
│   │   ├── tutors/
│   │   │   └── TutorCard.tsx       # Tutor card component
│   │   └── ui/                     # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── badge.tsx
│   │       ├── select.tsx
│   │       ├── textarea.tsx
│   │       └── toaster.tsx
│   ├── context/
│   │   └── AuthContext.tsx         # Auth state management
│   ├── lib/
│   │   ├── api.ts                  # All API calls
│   │   └── utils.ts                # Helper functions
│   └── types/
│       └── index.ts                # TypeScript types
├── .env.local                      # Environment variables (create this)
├── .env.example                    # Example env file
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Pages and Routes

### Public Routes (Login না করেও দেখা যাবে)
| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero section, categories, how it works |
| `/tutors` | Browse Tutors | Search, filter, sort tutors |
| `/tutors/:id` | Tutor Profile | Full profile, reviews, booking form |
| `/login` | Login | Sign in page |
| `/register` | Register | Sign up as Student or Tutor |

### Student Routes (Student login করলে)
| Route | Page | Description |
|-------|------|-------------|
| `/dashboard` | Dashboard | Overview, upcoming sessions |
| `/dashboard/bookings` | My Bookings | All bookings, cancel, leave review |
| `/dashboard/profile` | Profile | Edit personal info |

### Tutor Routes (Tutor login করলে)
| Route | Page | Description |
|-------|------|-------------|
| `/tutor/dashboard` | Dashboard | Sessions, earnings stats |
| `/tutor/profile` | Profile | Edit bio, rate, subjects |
| `/tutor/availability` | Availability | Set weekly time slots |

### Admin Routes (Admin login করলে)
| Route | Page | Description |
|-------|------|-------------|
| `/admin` | Overview | Platform statistics |
| `/admin/users` | Users | Search, ban/unban users |
| `/admin/bookings` | Bookings | View all bookings |
| `/admin/categories` | Categories | Add/delete categories |

---

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | jhadam904@gmail.com | admin123 |
| Tutor | sarah@skillbridge.com | tutor123 |
| Student | alex@example.com | student123 |

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 | App Router, SSR |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| shadcn/ui | UI components |
| Fraunces | Display font |
| DM Sans | Body font |

---

## NPM Scripts

```bash
npm run dev      # Development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000/api` | Backend API URL |

---

## Common Errors and Fixes

### Error: "Login failed"
**Fix:** Backend চালু আছে কিনা দেখো। `http://localhost:5000/api/health` ব্রাউজারে খোলো।

### Error: "Failed to fetch"
**Fix:** `.env.local` ফাইলে `NEXT_PUBLIC_API_URL` সেট আছে কিনা দেখো।

### Error: Module not found
**Fix:**
```bash
npm install
```

### Error: Port 3000 already in use
**Fix:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# তারপর আবার
npm run dev
```

---

## Deployment (Vercel)

1. [vercel.com](https://vercel.com) এ account খোলো
2. GitHub repo import করো
3. Root directory: `frontend`
4. Environment variable যোগ করো:
   ```
   NEXT_PUBLIC_API_URL = https://your-backend.onrender.com/api
   ```
5. Deploy করো
