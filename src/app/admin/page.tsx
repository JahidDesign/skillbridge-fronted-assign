"use client";

import { useEffect, useState } from "react";
import { Users, BookOpen, DollarSign, CheckCircle, Loader2, TrendingUp } from "lucide-react";
import { adminApi } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { AdminStats } from "@/types";

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getStats()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = stats ? [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Tutors", value: stats.totalTutors, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Total Students", value: stats.totalStudents, icon: Users, color: "text-teal-600", bg: "bg-teal-50" },
    { label: "Total Bookings", value: stats.totalBookings, icon: BookOpen, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Completed Sessions", value: stats.completedBookings, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { label: "Platform Revenue", value: formatCurrency(stats.totalRevenue), icon: DollarSign, color: "text-primary", bg: "bg-primary/10" },
  ] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Admin Overview</h1>
        <p className="text-muted-foreground text-sm">Platform-wide statistics</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {cards.map(({ label, value, icon: Icon, color, bg }) => (
            <Card key={label}>
              <CardContent className="p-5">
                <div className={`inline-flex p-2.5 rounded-xl ${bg} mb-4`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <p className="font-display text-2xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {stats && (
        <Card>
          <CardHeader><CardTitle>Quick Summary</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Session completion rate</span>
                <span className="font-semibold">
                  {stats.totalBookings > 0
                    ? Math.round((stats.completedBookings / stats.totalBookings) * 100)
                    : 0}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg. revenue per session</span>
                <span className="font-semibold">
                  {stats.completedBookings > 0
                    ? formatCurrency(stats.totalRevenue / stats.completedBookings)
                    : "$0"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tutor to student ratio</span>
                <span className="font-semibold">
                  1:{stats.totalTutors > 0 ? Math.round(stats.totalStudents / stats.totalTutors) : 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
