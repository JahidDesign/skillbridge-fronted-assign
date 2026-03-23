const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || err.message || "Request failed");
  }
  return res.json();
}

// ─── AUTH ────────────────────────────────────────────────────────────────────
export const authApi = {
  register: (data: { name: string; email: string; password: string; role: string }) =>
    request<{ user: any; token: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    request<{ user: any; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  me: () => request<any>("/auth/me"),
};

// ─── TUTORS ──────────────────────────────────────────────────────────────────
export const tutorsApi = {
  getAll: (params?: Record<string, string>) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request<any[]>(`/tutors${qs}`);
  },

  getById: (id: string) => request<any>(`/tutors/${id}`),
};

// ─── CATEGORIES ──────────────────────────────────────────────────────────────
export const categoriesApi = {
  getAll: () => request<any[]>("/categories"),
  create: (data: { name: string; icon?: string; description?: string }) =>
    request<any>("/categories", { method: "POST", body: JSON.stringify(data) }),
  delete: (id: string) =>
    request<any>(`/categories/${id}`, { method: "DELETE" }),
};

// ─── BOOKINGS ────────────────────────────────────────────────────────────────
export const bookingsApi = {
  create: (data: {
    tutorProfileId: string;
    subject: string;
    date: string;
    startTime: string;
    endTime: string;
    notes?: string;
  }) => request<any>("/bookings", { method: "POST", body: JSON.stringify(data) }),

  getMine: (status?: string) => {
    const qs = status ? `?status=${status}` : "";
    return request<any[]>(`/bookings${qs}`);
  },

  getById: (id: string) => request<any>(`/bookings/${id}`),

  cancel: (id: string) =>
    request<any>(`/bookings/${id}/cancel`, { method: "PATCH" }),

  complete: (id: string) =>
    request<any>(`/bookings/${id}/complete`, { method: "PATCH" }),
};

// ─── REVIEWS ─────────────────────────────────────────────────────────────────
export const reviewsApi = {
  create: (data: { bookingId: string; rating: number; comment?: string }) =>
    request<any>("/reviews", { method: "POST", body: JSON.stringify(data) }),
};

// ─── TUTOR SELF-MANAGE ───────────────────────────────────────────────────────
export const tutorApi = {
  getProfile: () => request<any>("/tutor/profile"),

  updateProfile: (data: {
    bio?: string;
    hourlyRate?: number;
    experience?: number;
    languages?: string[];
    categoryIds?: string[];
  }) => request<any>("/tutor/profile", { method: "PUT", body: JSON.stringify(data) }),

  updateAvailability: (slots: { dayOfWeek: number; startTime: string; endTime: string }[]) =>
    request<any>("/tutor/availability", {
      method: "PUT",
      body: JSON.stringify({ slots }),
    }),
};

// ─── ADMIN ───────────────────────────────────────────────────────────────────
export const adminApi = {
  getStats: () => request<any>("/admin/stats"),
  getUsers: (params?: Record<string, string>) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request<any[]>(`/admin/users${qs}`);
  },
  updateUser: (id: string, data: { isBanned: boolean }) =>
    request<any>(`/admin/users/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  getBookings: (status?: string) => {
    const qs = status ? `?status=${status}` : "";
    return request<any[]>(`/admin/bookings${qs}`);
  },
};
