"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, Calendar, CheckCircle, DollarSign, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { bookingsApi } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toaster";
import { formatDate, formatCurrency, getAvatarUrl, getStatusColor } from "@/lib/utils";
import type { Booking } from "@/types";

export default function TutorDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    bookingsApi.getMine()
      .then(setBookings)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const complete = async (id: string) => {
    try {
      await bookingsApi.complete(id);
      toast({ title: "Session marked as complete ✅" });
      load();
    } catch (err: any) {
      toast({ title: "Failed", description: err.message, variant: "destructive" });
    }
  };

  const confirmed = bookings.filter((b) => b.status === "CONFIRMED");
  const completed = bookings.filter((b) => b.status === "COMPLETED");
  const revenue = completed.reduce((sum, b) => sum + b.totalPrice, 0);

  const stats = [
    { label: "Upcoming Sessions", value: confirmed.length, icon: Calendar, color: "text-blue-600" },
    { label: "Completed Sessions", value: completed.length, icon: CheckCircle, color: "text-green-600" },
    { label: "Total Earnings", value: formatCurrency(revenue), icon: DollarSign, color: "text-primary" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Tutor Dashboard</h1>
        <p className="text-muted-foreground text-sm">Welcome back, {user?.name.split(" ")[0]}!</p>
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
        <CardHeader><CardTitle>Upcoming Sessions</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : confirmed.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm">No upcoming sessions. Students will book you soon!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {confirmed.map((b) => (
                <div key={b.id} className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                  <Image
                    src={b.student?.avatar || getAvatarUrl(b.student?.name || "S")}
                    alt={b.student?.name || ""}
                    width={40} height={40}
                    className="rounded-xl"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{b.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {b.student?.name} · {formatDate(b.date)} · {b.startTime}–{b.endTime}
                    </p>
                    <p className="text-xs font-semibold text-primary mt-1">{formatCurrency(b.totalPrice)}</p>
                  </div>
                  <Button size="sm" onClick={() => complete(b.id)}>
                    <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Mark Complete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent completed */}
      {completed.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Recent Completed Sessions</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completed.slice(0, 5).map((b) => (
                <div key={b.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium">{b.subject}</p>
                    <p className="text-xs text-muted-foreground">{b.student?.name} · {formatDate(b.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">{formatCurrency(b.totalPrice)}</p>
                    {b.review && (
                      <div className="flex items-center gap-1 text-xs text-amber-500 justify-end mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400" /> {b.review.rating}/5
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
