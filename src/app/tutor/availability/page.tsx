"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, Plus, Trash2, Clock } from "lucide-react";
import { tutorApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toaster";
import { DAY_NAMES } from "@/lib/utils";
import { cn } from "@/lib/utils";

const DAYS = [0, 1, 2, 3, 4, 5, 6];

// প্রতিটি দিনের জন্য আলাদা accent color
const DAY_COLORS: Record<number, { bg: string; border: string; label: string; dot: string; badge: string }> = {
  0: { bg: "bg-rose-50 dark:bg-rose-950/20", border: "border-rose-200 dark:border-rose-800", label: "text-rose-600 dark:text-rose-400", dot: "bg-rose-400", badge: "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300" },
  1: { bg: "bg-violet-50 dark:bg-violet-950/20", border: "border-violet-200 dark:border-violet-800", label: "text-violet-600 dark:text-violet-400", dot: "bg-violet-400", badge: "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300" },
  2: { bg: "bg-sky-50 dark:bg-sky-950/20", border: "border-sky-200 dark:border-sky-800", label: "text-sky-600 dark:text-sky-400", dot: "bg-sky-400", badge: "bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300" },
  3: { bg: "bg-emerald-50 dark:bg-emerald-950/20", border: "border-emerald-200 dark:border-emerald-800", label: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-400", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300" },
  4: { bg: "bg-amber-50 dark:bg-amber-950/20", border: "border-amber-200 dark:border-amber-800", label: "text-amber-600 dark:text-amber-400", dot: "bg-amber-400", badge: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" },
  5: { bg: "bg-orange-50 dark:bg-orange-950/20", border: "border-orange-200 dark:border-orange-800", label: "text-orange-600 dark:text-orange-400", dot: "bg-orange-400", badge: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" },
  6: { bg: "bg-pink-50 dark:bg-pink-950/20", border: "border-pink-200 dark:border-pink-800", label: "text-pink-600 dark:text-pink-400", dot: "bg-pink-400", badge: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300" },
};

const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Slot { dayOfWeek: number; startTime: string; endTime: string }

export default function AvailabilityPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    tutorApi.getProfile()
      .then((p) => setSlots(p.availability.map((a: any) => ({
        dayOfWeek: a.dayOfWeek,
        startTime: a.startTime,
        endTime: a.endTime,
      }))))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const addSlot = (day: number) => {
    setSlots((s) => [...s, { dayOfWeek: day, startTime: "09:00", endTime: "17:00" }]);
  };

  const removeSlot = (idx: number) => {
    setSlots((s) => s.filter((_, i) => i !== idx));
  };

  const updateSlot = (idx: number, key: keyof Slot, val: string | number) => {
    setSlots((s) => s.map((slot, i) => i === idx ? { ...slot, [key]: val } : slot));
  };

  const save = async () => {
    setSaving(true);
    try {
      await tutorApi.updateAvailability(slots);
      toast({ title: "Availability saved! ✅" });
    } catch (err: any) {
      toast({ title: "Failed to save", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center py-16">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );

  const totalSlots = slots.length;
  const activeDays = new Set(slots.map((s) => s.dayOfWeek)).size;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Set Availability</h1>
          <p className="text-muted-foreground text-sm mt-1">Choose when students can book you</p>
        </div>
        <Button onClick={save} disabled={saving} className="shrink-0">
          {saving
            ? <Loader2 className="w-4 h-4 animate-spin mr-2" />
            : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      {/* Summary strip */}
      <div className="flex items-center gap-6 px-4 py-3 rounded-xl bg-muted/50 border border-border text-sm">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Active days:</span>
          <span className="font-semibold text-foreground">{activeDays}</span>
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Total slots:</span>
          <span className="font-semibold text-foreground">{totalSlots}</span>
        </div>
        <div className="flex gap-1.5 ml-auto">
          {DAYS.map((d) => {
            const active = slots.some((s) => s.dayOfWeek === d);
            const c = DAY_COLORS[d];
            return (
              <div
                key={d}
                title={DAY_SHORT[d]}
                className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-semibold transition-all",
                  active
                    ? cn(c.badge, "ring-1 ring-offset-1")
                    : "bg-muted text-muted-foreground"
                )}
              >
                {DAY_SHORT[d].slice(0, 1)}
              </div>
            );
          })}
        </div>
      </div>

      {/* Day cards */}
      <div className="space-y-3">
        {DAYS.map((day) => {
          const c = DAY_COLORS[day];
          const daySlots = slots.map((s, i) => ({ ...s, idx: i })).filter((s) => s.dayOfWeek === day);
          const isWeekend = day === 0 || day === 6;
          const isActive = daySlots.length > 0;

          return (
            <div
              key={day}
              className={cn(
                "rounded-xl border transition-all duration-200",
                isActive ? cn(c.bg, c.border, "shadow-sm") : "bg-background border-border",
                isWeekend && !isActive && "opacity-60"
              )}
            >
              <div className="p-4 flex items-start gap-4">

                {/* Day label */}
                <div className="w-24 shrink-0 flex flex-col items-start gap-1 pt-0.5">
                  <div className="flex items-center gap-2">
                    {isActive && (
                      <span className={cn("w-2 h-2 rounded-full shrink-0", c.dot)} />
                    )}
                    <p className={cn(
                      "font-semibold text-sm",
                      isActive ? c.label : "text-muted-foreground"
                    )}>
                      {DAY_NAMES[day]}
                    </p>
                  </div>
                  {isActive ? (
                    <span className={cn("text-[10px] px-1.5 py-0.5 rounded-md font-medium", c.badge)}>
                      {daySlots.length} slot{daySlots.length > 1 ? "s" : ""}
                    </span>
                  ) : (
                    <span className="text-[10px] text-muted-foreground">Unavailable</span>
                  )}
                </div>

                {/* Time slots */}
                <div className="flex-1 space-y-2">
                  {daySlots.map(({ idx, startTime, endTime }) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-lg border flex-1",
                        "bg-background/80 border-border"
                      )}>
                        <Input
                          type="time"
                          value={startTime}
                          onChange={(e) => updateSlot(idx, "startTime", e.target.value)}
                          className="w-28 h-7 border-0 p-0 bg-transparent focus-visible:ring-0 text-sm"
                        />
                        <span className="text-muted-foreground text-xs font-medium">→</span>
                        <Input
                          type="time"
                          value={endTime}
                          onChange={(e) => updateSlot(idx, "endTime", e.target.value)}
                          className="w-28 h-7 border-0 p-0 bg-transparent focus-visible:ring-0 text-sm"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSlot(idx)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}

                  {daySlots.length === 0 && (
                    <p className="text-xs text-muted-foreground py-1">
                      No slots — click Add to set hours
                    </p>
                  )}
                </div>

                {/* Add button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addSlot(day)}
                  className={cn(
                    "shrink-0 h-8 text-xs transition-all",
                    isActive && cn("border-current", c.label)
                  )}
                >
                  <Plus className="w-3 h-3 mr-1" /> Add
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}