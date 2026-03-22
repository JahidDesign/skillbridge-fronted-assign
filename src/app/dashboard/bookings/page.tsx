"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, Loader2, X } from "lucide-react";
import { bookingsApi, reviewsApi } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/toaster";
import { formatDate, formatCurrency, getAvatarUrl, getStatusColor } from "@/lib/utils";
import type { Booking } from "@/types";

function ReviewModal({ booking, onClose, onDone }: { booking: Booking; onClose: () => void; onDone: () => void }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      await reviewsApi.create({ bookingId: booking.id, rating, comment });
      toast({ title: "Review submitted! ⭐" });
      onDone();
    } catch (err: any) {
      toast({ title: "Failed to submit review", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-lg font-bold">Leave a Review</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          How was your session with <strong>{booking.tutorProfile?.user.name}</strong>?
        </p>
        <div className="flex gap-1.5 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} onClick={() => setRating(s)}>
              <Star className={`w-8 h-8 transition-colors ${s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
            </button>
          ))}
        </div>
        <Textarea
          placeholder="Share your experience (optional)..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="mb-4"
        />
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button className="flex-1" onClick={submit} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [reviewTarget, setReviewTarget] = useState<Booking | null>(null);

  const load = () => {
    bookingsApi.getMine()
      .then(setBookings)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const cancel = async (id: string) => {
    try {
      await bookingsApi.cancel(id);
      toast({ title: "Booking cancelled" });
      load();
    } catch (err: any) {
      toast({ title: "Failed to cancel", description: err.message, variant: "destructive" });
    }
  };

  const filtered = filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="space-y-6">
      {reviewTarget && (
        <ReviewModal
          booking={reviewTarget}
          onClose={() => setReviewTarget(null)}
          onDone={() => { setReviewTarget(null); load(); }}
        />
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground text-sm">{bookings.length} total sessions</p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="text-center py-16">
            <div className="text-4xl mb-3">📅</div>
            <p className="font-semibold">No bookings found</p>
            <p className="text-muted-foreground text-sm mt-1">Your sessions will appear here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => (
            <Card key={b.id}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <Image
                    src={b.tutorProfile?.user.avatar || getAvatarUrl(b.tutorProfile?.user.name || "T")}
                    alt={b.tutorProfile?.user.name || ""}
                    width={48} height={48}
                    className="rounded-xl"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold">{b.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          with {b.tutorProfile?.user.name}
                        </p>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${getStatusColor(b.status)}`}>
                        {b.status}
                      </span>
                    </div>
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                      <span>📅 {formatDate(b.date)}</span>
                      <span>🕐 {b.startTime}–{b.endTime}</span>
                      <span>💵 {formatCurrency(b.totalPrice)}</span>
                    </div>
                    {b.notes && <p className="text-xs text-muted-foreground mt-1 italic">"{b.notes}"</p>}

                    <div className="flex gap-2 mt-3">
                      {b.status === "CONFIRMED" && (
                        <Button size="sm" variant="outline" onClick={() => cancel(b.id)} className="text-destructive hover:bg-red-50">
                          Cancel
                        </Button>
                      )}
                      {b.status === "COMPLETED" && !b.review && (
                        <Button size="sm" onClick={() => setReviewTarget(b)}>
                          <Star className="w-3.5 h-3.5 mr-1.5" /> Leave Review
                        </Button>
                      )}
                      {b.review && (
                        <div className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                          <Star className="w-3.5 h-3.5 fill-amber-400" /> Reviewed ({b.review.rating}/5)
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
