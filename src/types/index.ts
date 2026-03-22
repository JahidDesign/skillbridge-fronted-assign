export type Role = "STUDENT" | "TUTOR" | "ADMIN";
export type BookingStatus = "CONFIRMED" | "COMPLETED" | "CANCELLED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  isBanned?: boolean;
  createdAt?: string;
  tutorProfile?: TutorProfile;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  _count?: { tutors: number };
}

export interface TutorCategory {
  category: Category;
}

export interface Availability {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface TutorProfile {
  id: string;
  userId?: string;
  bio?: string;
  hourlyRate: number;
  experience: number;
  languages: string[];
  rating: number;
  totalReviews: number;
  isApproved: boolean;
  avatar?: string;
  coverImage?: string;
  user: Pick<User, "id" | "name" | "email" | "avatar">;
  categories: TutorCategory[];
  availability: Availability[];
  reviews?: Review[];
}

export interface Booking {
  id: string;
  studentId: string;
  tutorProfileId: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  notes?: string;
  totalPrice: number;
  createdAt: string;
  student?: Pick<User, "id" | "name" | "avatar" | "email">;
  tutorProfile?: TutorProfile;
  review?: Review;
}

export interface Review {
  id: string;
  studentId: string;
  tutorProfileId: string;
  bookingId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  student?: Pick<User, "name" | "avatar">;
}

export interface AdminStats {
  totalUsers: number;
  totalTutors: number;
  totalStudents: number;
  totalBookings: number;
  completedBookings: number;
  totalRevenue: number;
}