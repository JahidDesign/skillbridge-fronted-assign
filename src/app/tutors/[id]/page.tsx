"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star, Clock, BookOpen, Globe, ArrowLeft, Loader2, Calendar, CheckCircle
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { tutorsApi, bookingsApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/toaster";
import { formatCurrency, formatDate, getAvatarUrl, DAY_NAMES, getRatingStars } from "@/lib/utils";
import type { TutorProfile } from "@/types";

export default function TutorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({
    subject: "", date: "", startTime: "", endTime: "", notes: ""
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    tutorsApi.getById(id)
      .then(setTutor)
      .catch(() => toast({ title: "Failed to load tutor", variant: "destructive" }))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast({ title: "Please login to book", variant: "destructive" }); return; }
    if (user.role !== "STUDENT") { toast({ title: "Only students can book sessions", variant: "destructive" }); return; }
    setBookingLoading(true);
    try {
      await bookingsApi.create({ tutorProfileId: id, ...booking });
      setBooked(true);
      toast({ title: "Session booked! ✅", description: "Check your dashboard for details." });
    } catch (err: any) {
      toast({ title: "Booking failed", description: err.message, variant: "destructive" });
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    </div>
  );

  if (!tutor) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold">Tutor not found</p>
        <Button asChild variant="outline"><Link href="/tutors"><ArrowLeft className="mr-2 w-4 h-4" />Back</Link></Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <Link href="/tutors" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to tutors
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-5">
                  <Image
                    src={tutor.user.avatar || getAvatarUrl(tutor.user.name)}
                    alt={tutor.user.name}
                    width={80} height={80}
                    className="rounded-2xl border-2 border-border"
                  />
                  <div className="flex-1">
                    <h1 className="font-display text-2xl font-bold">{tutor.user.name}</h1>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <div className="flex items-center gap-1">
                        {getRatingStars(tutor.rating).map((filled, i) => (
                          <Star key={i} className={`w-4 h-4 ${filled ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                        ))}
                      </div>
                      <span className="font-semibold text-sm">{tutor.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground text-sm">({tutor.totalReviews} reviews)</span>
                    </div>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {tutor.categories.map(({ category }) => (
                        <span key={category.id} className="badge-category">{category.icon} {category.name}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-3xl font-bold text-primary">{formatCurrency(tutor.hourlyRate)}</p>
                    <p className="text-sm text-muted-foreground">/hour</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                  <div className="text-center">
                    <p className="font-bold text-lg">{tutor.experience}+</p>
                    <p className="text-xs text-muted-foreground">Years exp.</p>
                  </div>
                  <div className="text-center border-x">
                    <p className="font-bold text-lg">{tutor.totalReviews}</p>
                    <p className="text-xs text-muted-foreground">Sessions</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg">{tutor.languages.join(", ")}</p>
                    <p className="text-xs text-muted-foreground">Languages</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bio */}
            {tutor.bio && (
              <Card>
                <CardHeader><CardTitle>About</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground leading-relaxed">{tutor.bio}</p></CardContent>
              </Card>
            )}

            {/* Availability */}
            {tutor.availability.length > 0 && (
              <Card>
                <CardHeader><CardTitle>Availability</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tutor.availability.map((a) => (
                      <div key={a.id} className="bg-accent/10 text-accent rounded-lg px-3 py-2 text-sm">
                        <span className="font-medium">{DAY_NAMES[a.dayOfWeek]}</span>
                        <span className="text-xs ml-2 opacity-75">{a.startTime}–{a.endTime}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews */}
            {tutor.reviews && tutor.reviews.length > 0 && (
              <Card>
                <CardHeader><CardTitle>Reviews ({tutor.reviews.length})</CardTitle></CardHeader>
                <CardContent className="space-y-5">
                  {tutor.reviews.map((r) => (
                    <div key={r.id} className="pb-5 border-b last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Image
                          src={r.student?.avatar || getAvatarUrl(r.student?.name || "U")}
                          alt={r.student?.name || "Student"}
                          width={32} height={32}
                          className="rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium">{r.student?.name}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(r.createdAt)}</p>
                        </div>
                        <div className="ml-auto flex">
                          {getRatingStars(r.rating).map((filled, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${filled ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                          ))}
                        </div>
                      </div>
                      {r.comment && <p className="text-sm text-muted-foreground">{r.comment}</p>}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right column — Booking */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book a Session</CardTitle>
              </CardHeader>
              <CardContent>
                {booked ? (
                  <div className="text-center py-6">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <h3 className="font-semibold text-lg mb-1">Session Booked!</h3>
                    <p className="text-sm text-muted-foreground mb-4">Check your dashboard for details.</p>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href="/dashboard/bookings">View Bookings</Link>
                    </Button>
                  </div>
                ) : !user ? (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground mb-4">Sign in to book a session</p>
                    <Button asChild className="w-full"><Link href="/login">Sign In</Link></Button>
                  </div>
                ) : user.role !== "STUDENT" ? (
                  <p className="text-sm text-muted-foreground text-center py-4">Only students can book sessions.</p>
                ) : (
                  <form onSubmit={handleBook} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label>Subject</Label>
                      <Input placeholder="e.g. Calculus, JavaScript..." value={booking.subject}
                        onChange={(e) => setBooking((b) => ({ ...b, subject: e.target.value }))} required />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Date</Label>
                      <Input type="date" value={booking.date} min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setBooking((b) => ({ ...b, date: e.target.value }))} required />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label>Start Time</Label>
                        <Input type="time" value={booking.startTime}
                          onChange={(e) => setBooking((b) => ({ ...b, startTime: e.target.value }))} required />
                      </div>
                      <div className="space-y-1.5">
                        <Label>End Time</Label>
                        <Input type="time" value={booking.endTime}
                          onChange={(e) => setBooking((b) => ({ ...b, endTime: e.target.value }))} required />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Notes (optional)</Label>
                      <Textarea placeholder="What do you want to focus on?" rows={3}
                        value={booking.notes}
                        onChange={(e) => setBooking((b) => ({ ...b, notes: e.target.value }))} />
                    </div>
                    <div className="bg-muted rounded-lg p-3 text-sm">
                      <p className="text-muted-foreground">Rate: <span className="font-semibold text-foreground">{formatCurrency(tutor.hourlyRate)}/hr</span></p>
                    </div>
                    <Button type="submit" className="w-full" disabled={bookingLoading}>
                      {bookingLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Calendar className="w-4 h-4 mr-2" />}
                      Book Session
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
