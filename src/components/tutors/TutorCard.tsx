"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { TutorProfile } from "@/types";
import { formatCurrency, getAvatarUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

// ─── Category cover images ────────────────────────────────────────────────────
const CATEGORY_COVERS: Record<string, string> = {
  Mathematics: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&h=200&fit=crop",
  Programming: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=200&fit=crop",
  Languages:   "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=200&fit=crop",
  Science:     "https://images.unsplash.com/photo-1532094349884-543559ce09f9?w=600&h=200&fit=crop",
  Music:       "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=200&fit=crop",
  Design:      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=200&fit=crop",
  Business:    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=200&fit=crop",
  History:     "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=200&fit=crop",
};

const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=200&fit=crop";

// ─── Avatar colour pool (deterministic from name) ─────────────────────────────
const AVATAR_PALETTE = [
  { bg: "bg-violet-100 dark:bg-violet-900/60", text: "text-violet-800 dark:text-violet-200" },
  { bg: "bg-sky-100 dark:bg-sky-900/60",       text: "text-sky-800 dark:text-sky-200" },
  { bg: "bg-teal-100 dark:bg-teal-900/60",     text: "text-teal-800 dark:text-teal-200" },
  { bg: "bg-pink-100 dark:bg-pink-900/60",     text: "text-pink-800 dark:text-pink-200" },
  { bg: "bg-amber-100 dark:bg-amber-900/60",   text: "text-amber-800 dark:text-amber-200" },
  { bg: "bg-rose-100 dark:bg-rose-900/60",     text: "text-rose-800 dark:text-rose-200" },
  { bg: "bg-cyan-100 dark:bg-cyan-900/60",     text: "text-cyan-800 dark:text-cyan-200" },
];

function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0] ?? "").slice(0, 2).join("").toUpperCase();
}

function pickPalette(name: string) {
  const code = Array.from(name).reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_PALETTE[code % AVATAR_PALETTE.length];
}

// ─── Avatar component ─────────────────────────────────────────────────────────
// Tries the real photo URL first; on any load error falls back to
// getAvatarUrl() (generated); if that also fails, shows coloured initials.
function TutorAvatar({
  primarySrc,
  fallbackSrc,
  name,
  size = 56,
}: {
  primarySrc: string | null | undefined;
  fallbackSrc: string;
  name: string;
  size?: number;
}) {
  // track which sources have failed
  const [failedPrimary, setFailedPrimary] = useState(false);
  const [failedFallback, setFailedFallback] = useState(false);

  const palette = pickPalette(name);
  const initials = getInitials(name);
  const sizeClass = `w-[${size}px] h-[${size}px]`;

  // Decide what to show
  const showPrimary  = !!primarySrc && !failedPrimary;
  const showFallback = !showPrimary && !failedFallback;
  const showInitials = !showPrimary && !showFallback;

  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl overflow-hidden border-2 border-background group-hover:border-primary transition-colors shadow-md shrink-0"
    >
      {showPrimary && (
        <img
          src={primarySrc!}
          alt={name}
          width={size}
          height={size}
          onError={() => setFailedPrimary(true)}
          className="w-full h-full object-cover object-center"
        />
      )}

      {showFallback && (
        <img
          src={fallbackSrc}
          alt={name}
          width={size}
          height={size}
          onError={() => setFailedFallback(true)}
          className="w-full h-full object-cover object-center"
        />
      )}

      {showInitials && (
        <div
          className={cn(
            "w-full h-full flex items-center justify-center font-semibold select-none",
            palette.bg,
            palette.text
          )}
          style={{ fontSize: size * 0.3 }}
        >
          {initials}
        </div>
      )}
    </div>
  );
}

// ─── Main card ────────────────────────────────────────────────────────────────
export default function TutorCard({ tutor }: { tutor: TutorProfile }) {
  if (!tutor) return null;

  const { user, categories, rating, totalReviews, hourlyRate, experience, bio } = tutor;

  const firstCat = categories?.[0]?.category?.name;
  const coverSrc =
    tutor.coverImage ||
    (firstCat && CATEGORY_COVERS[firstCat]) ||
    DEFAULT_COVER;

  // Primary: real stored photo. Fallback: generated avatar URL.
  const primaryAvatarSrc = tutor.avatar || user?.avatar || null;
  const fallbackAvatarSrc = getAvatarUrl(user?.name ?? "");

  return (
    <Card className="card-hover overflow-hidden group">
      <CardContent className="p-0">

        {/* ── Cover image ─────────────────────────────────────── */}
        {/* Outer wrapper: relative so avatar can overlap; NOT overflow-hidden */}
        <div className="relative">

          {/* Cover image — overflow-hidden only here so it clips the photo */}
          <div className="relative h-32 w-full overflow-hidden">
            <Image
              src={coverSrc}
              alt={`${user?.name} cover`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Verified badge */}
            {tutor.isApproved && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-emerald-500/90 hover:bg-emerald-500 text-white text-[10px] px-2 py-0.5 backdrop-blur-sm">
                  ✓ Verified
                </Badge>
              </div>
            )}
          </div>

          {/* Avatar sits OUTSIDE the overflow-hidden cover div so it's never clipped */}
          <Link
            href={`/tutors/${tutor.id}`}
            className="absolute bottom-0 translate-y-1/2 left-6 block z-10"
          >
            <TutorAvatar
              primarySrc={primaryAvatarSrc}
              fallbackSrc={fallbackAvatarSrc}
              name={user?.name ?? "Tutor"}
              size={56}
            />
          </Link>
        </div>

        {/* ── Card body ────────────────────────────────────────── */}
        <div className="p-6 pt-8">

          {/* Name + price */}
          <div className="flex items-start justify-between mb-1">
            <Link href={`/tutors/${tutor.id}`}>
              <h3 className="font-display font-semibold text-lg leading-tight hover:text-primary transition-colors truncate">
                {user?.name}
              </h3>
            </Link>
            <div className="text-right shrink-0 ml-3">
              <p className="font-display font-bold text-xl text-primary">
                {formatCurrency(hourlyRate)}
              </p>
              <p className="text-xs text-muted-foreground">/hour</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({totalReviews} reviews)</span>
            </div>
            {rating >= 4.8 && (
              <Badge
                variant="secondary"
                className="text-[10px] px-1.5 py-0 bg-amber-100 text-amber-700 border-amber-200"
              >
                Top Rated
              </Badge>
            )}
          </div>

          {/* Bio */}
          {bio && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{bio}</p>
          )}

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {categories.slice(0, 3).map(({ category }) => (
              <span key={category.id} className="badge-category">
                {category.icon} {category.name}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4 border-t pt-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{experience}y exp</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{totalReviews} sessions</span>
            </div>
            {tutor.languages?.slice(0, 2).map((lang) => (
              <Badge
                key={lang}
                variant="outline"
                className="text-[10px] px-1.5 py-0 h-4 font-normal"
              >
                {lang}
              </Badge>
            ))}
          </div>

          <Button asChild className="w-full" size="sm">
            <Link href={`/tutors/${tutor.id}`}>View Profile & Book</Link>
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}