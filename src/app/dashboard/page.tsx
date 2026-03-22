"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Star, BookOpen, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { bookingsApi } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatCurrency, getStatusColor } from "@/lib/utils";
import type { Booking } from "@/types";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingsApi.getMine()
      .then(setBookings)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const upcoming = bookings.filter((b) => b.status === "CONFIRMED");
  const completed = bookings.filter((b) => b.status === "COMPLETED");

  const stats = [
    { label: "Upcoming Sessions", value: upcoming.length, icon: Calendar, color: "text-blue-600" },
    { label: "Completed Sessions", value: completed.length, icon: BookOpen, color: "text-green-600" },
    { label: "Reviews Given", value: bookings.filter((b) => b.review).length, icon: Star, color: "text-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Welcome back, {user?.name.split(" ")[0]}! 👋</h1>
        <p className="text-muted-foreground text-sm mt-1">Here's your learning overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-5">
              <Icon className={`w-5 h-5 ${color} mb-3`} />
              <p className="font-display text-2xl font-bold">{loading ? "—" : value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming sessions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Upcoming Sessions</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard/bookings">View all <ArrowRight className="ml-1 w-3.5 h-3.5" /></Link>
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : upcoming.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm mb-4">No upcoming sessions yet.</p>
              <Button asChild size="sm"><Link href="/tutors">Find a Tutor</Link></Button>
            </div>
          ) : (
            <div className="space-y-3">
              {upcoming.slice(0, 3).map((b) => (
                <div key={b.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                  <div>
                    <p className="font-medium text-sm">{b.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      with {b.tutorProfile?.user.name} · {formatDate(b.date)} · {b.startTime}–{b.endTime}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(b.status)}`}>{b.status}</span>
                    <span className="text-sm font-semibold">{formatCurrency(b.totalPrice)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="card-hover cursor-pointer">
          <CardContent className="p-5">
            <Link href="/tutors" className="block">
              <div className="text-2xl mb-2">🔍</div>
              <p className="font-semibold text-sm">Find a Tutor</p>
              <p className="text-xs text-muted-foreground">Browse 500+ experts</p>
            </Link>
          </CardContent>
        </Card>
        <Card className="card-hover cursor-pointer">
          <CardContent className="p-5">
            <Link href="/dashboard/bookings" className="block">
              <div className="text-2xl mb-2">📅</div>
              <p className="font-semibold text-sm">My Bookings</p>
              <p className="text-xs text-muted-foreground">{bookings.length} total sessions</p>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
