"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { adminApi } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDate, formatCurrency, getStatusColor } from "@/lib/utils";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    setLoading(true);
    adminApi.getBookings(filter !== "ALL" ? filter : undefined)
      .then(setBookings)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">All Bookings</h1>
          <p className="text-muted-foreground text-sm">{bookings.length} bookings</p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All statuses</SelectItem>
            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">No bookings found</div>
          ) : (
            <div className="divide-y">
              {bookings.map((b) => (
                <div key={b.id} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-sm">{b.subject}</p>
                      <div className="flex gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                        <span>👨‍🎓 {b.student?.name}</span>
                        <span>→</span>
                        <span>👨‍🏫 {b.tutorProfile?.user?.name}</span>
                        <span>📅 {formatDate(b.date)}</span>
                        <span>🕐 {b.startTime}–{b.endTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(b.status)}`}>
                        {b.status}
                      </span>
                      <span className="font-semibold text-sm">{formatCurrency(b.totalPrice)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
