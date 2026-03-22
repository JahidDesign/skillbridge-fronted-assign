import Link from "next/link";
import Image from "next/image";
import { Star, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { TutorProfile } from "@/types";
import { formatCurrency, getAvatarUrl } from "@/lib/utils";

// category অনুযায়ী unique fallback cover image
const CATEGORY_COVERS: Record<string, string> = {
  Mathematics: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&h=200&fit=crop",
  Programming: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=200&fit=crop",
  Languages: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=200&fit=crop",
  Science: "https://images.unsplash.com/photo-1532094349884-543559ce09f9?w=600&h=200&fit=crop",
  Music: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=200&fit=crop",
  Design: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=200&fit=crop",
  Business: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=200&fit=crop",
  History: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=200&fit=crop",
};

const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=200&fit=crop";

export default function TutorCard({ tutor }: { tutor: TutorProfile }) {
  const { user, categories, rating, totalReviews, hourlyRate, experience, bio } = tutor;

  // 1. DB তে coverImage থাকলে সেটা, নাহলে category অনুযায়ী unique cover
  const firstCat = categories?.[0]?.category?.name;
  const coverSrc =
    tutor.coverImage ||
    (firstCat && CATEGORY_COVERS[firstCat]) ||
    DEFAULT_COVER;

  // 2. avatar: tutorProfile.avatar → user.avatar → generated fallback
  const avatarSrc =
    tutor.avatar ||
    user.avatar ||
    getAvatarUrl(user.name);

  return (
    <Card className="card-hover overflow-hidden group">
      <CardContent className="p-0">

        {/* ── Cover image ─────────────────────────────────────── */}
        <div className="relative h-32 w-full overflow-hidden">
          <Image
            src={coverSrc}
            alt={`${user.name} cover`}
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

          {/* Avatar — DB থেকে real photo, cover এর উপর overlap */}
          <Link
            href={`/tutors/${tutor.id}`}
            className="absolute bottom-0 translate-y-1/2 left-6"
          >
            <Image
              src={avatarSrc}
              alt={user.name}
              width={56}
              height={56}
              className="rounded-xl object-cover border-2 border-background group-hover:border-primary transition-colors shadow-md"
            />
          </Link>
        </div>
        {/* ────────────────────────────────────────────────────── */}

        <div className="p-6 pt-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-1">
            <Link href={`/tutors/${tutor.id}`}>
              <h3 className="font-display font-semibold text-lg leading-tight hover:text-primary transition-colors truncate">
                {user.name}
              </h3>
            </Link>
            <div className="text-right shrink-0 ml-3">
              <p className="font-display font-bold text-xl text-primary">{formatCurrency(hourlyRate)}</p>
              <p className="text-xs text-muted-foreground">/hour</p>
            </div>
          </div>

          {/* Rating + Top Rated badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({totalReviews} reviews)</span>
            </div>
            {rating >= 4.8 && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-amber-100 text-amber-700 border-amber-200">
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

          {/* Stats + Language badges */}
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