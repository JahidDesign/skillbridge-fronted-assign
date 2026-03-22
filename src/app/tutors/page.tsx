"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, Loader2, ChevronDown, Star, TrendingUp } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TutorCard from "@/components/tutors/TutorCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { tutorsApi, categoriesApi } from "@/lib/api";
import type { TutorProfile, Category } from "@/types";
import { cn } from "@/lib/utils";

const CAT_COLORS: Record<string, string> = {
  Mathematics: "bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-200 dark:bg-violet-900/40 dark:text-violet-300 dark:border-violet-700",
  Programming: "bg-sky-100 text-sky-700 border-sky-200 hover:bg-sky-200 dark:bg-sky-900/40 dark:text-sky-300 dark:border-sky-700",
  Languages: "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700",
  Science: "bg-cyan-100 text-cyan-700 border-cyan-200 hover:bg-cyan-200 dark:bg-cyan-900/40 dark:text-cyan-300 dark:border-cyan-700",
  Music: "bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-200 dark:bg-pink-900/40 dark:text-pink-300 dark:border-pink-700",
  Design: "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-700",
  Business: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700",
  History: "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-700",
};

const DEFAULT_CAT_COLOR = "bg-muted text-muted-foreground border-border hover:bg-muted/80";

function TutorsBrowser() {
  const searchParams = useSearchParams();
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    category: searchParams.get("category") || "",
    minRating: "",
    sort: "rating",
  });

  const setFilter = (k: string, v: string) =>
    setFilters((f) => ({ ...f, [k]: v }));

  // "all" sentinel → actual empty string for API
  const resolveVal = (v: string) => (v === "all" ? "" : v);

  const fetchTutors = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (filters.search) params.search = filters.search;
      if (filters.category) params.category = filters.category;
      if (filters.minRating) params.minRating = filters.minRating;
      if (filters.sort) params.sort = filters.sort;
      const data = await tutorsApi.getAll(params);
      setTutors(data);
    } catch {
      setTutors([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    categoriesApi.getAll().then(setCategories).catch(() => { });
  }, []);

  useEffect(() => {
    const delay = setTimeout(fetchTutors, 300);
    return () => clearTimeout(delay);
  }, [fetchTutors]);

  const clearFilters = () =>
    setFilters({ search: "", category: "", minRating: "", sort: "rating" });

  const hasFilters = filters.search || filters.category || filters.minRating;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">

      {/* ── Search bar ─────────────────────────────────────────── */}
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or subject..."
            className="pl-9 h-10"
            value={filters.search}
            onChange={(e) => setFilter("search", e.target.value)}
          />
        </div>

        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "h-10 gap-2 transition-all",
            showFilters && "border-primary text-primary bg-primary/5"
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", showFilters && "rotate-180")} />
        </Button>

        <Select value={filters.sort} onValueChange={(v) => setFilter("sort", v)}>
          <SelectTrigger className="w-48 h-10">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">⭐ Top Rated</SelectItem>
            <SelectItem value="reviews">💬 Most Reviews</SelectItem>
            <SelectItem value="price_asc">💰 Price: Low → High</SelectItem>
            <SelectItem value="price_desc">💎 Price: High → Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ── Category pills ─────────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap mb-5">
        <button
          onClick={() => setFilter("category", "")}
          className={cn(
            "px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all",
            !filters.category
              ? "bg-foreground text-background border-foreground"
              : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
          )}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter("category", filters.category === cat.name ? "" : cat.name)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all",
              filters.category === cat.name
                ? "ring-2 ring-offset-1 ring-current " + (CAT_COLORS[cat.name] || DEFAULT_CAT_COLOR)
                : CAT_COLORS[cat.name] || DEFAULT_CAT_COLOR
            )}
          >
            {cat.icon && <span className="mr-1">{cat.icon}</span>}
            {cat.name}
          </button>
        ))}
      </div>

      {/* ── Expanded filter panel ──────────────────────────────── */}
      {showFilters && (
        <div className="mb-5 rounded-2xl border border-border bg-muted/30 p-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
              Category
            </label>
            {/* ✅ "all" sentinel — empty string নয় */}
            <Select
              value={filters.category || "all"}
              onValueChange={(v) => setFilter("category", resolveVal(v))}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.name}>
                    {c.icon} {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
              Minimum Rating
            </label>
            {/* ✅ "all" sentinel — empty string নয় */}
            <Select
              value={filters.minRating || "all"}
              onValueChange={(v) => setFilter("minRating", resolveVal(v))}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Any rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any rating</SelectItem>
                <SelectItem value="4.5">4.5+ ⭐ Excellent</SelectItem>
                <SelectItem value="4.0">4.0+ ⭐ Very Good</SelectItem>
                <SelectItem value="3.5">3.5+ ⭐ Good</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {hasFilters && (
            <div className="flex items-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1.5"
              >
                <X className="w-3.5 h-3.5" /> Clear all filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ── Active filter pills ────────────────────────────────── */}
      {hasFilters && (
        <div className="flex gap-2 mb-5 flex-wrap items-center">
          <span className="text-xs text-muted-foreground">Active:</span>
          {filters.category && (
            <span className={cn(
              "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border",
              CAT_COLORS[filters.category] || DEFAULT_CAT_COLOR
            )}>
              {filters.category}
              <button onClick={() => setFilter("category", "")} className="ml-0.5 opacity-60 hover:opacity-100">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.minRating && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border bg-amber-100 text-amber-700 border-amber-200">
              {filters.minRating}+ stars
              <button onClick={() => setFilter("minRating", "")} className="ml-0.5 opacity-60 hover:opacity-100">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.search && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border bg-muted text-muted-foreground border-border">
              "{filters.search}"
              <button onClick={() => setFilter("search", "")} className="ml-0.5 opacity-60 hover:opacity-100">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* ── Results count ──────────────────────────────────────── */}
      {!loading && tutors.length > 0 && (
        <p className="text-sm text-muted-foreground mb-4">
          Showing <span className="font-semibold text-foreground">{tutors.length}</span> tutor{tutors.length !== 1 ? "s" : ""}
          {filters.category && <> in <span className="font-semibold text-foreground">{filters.category}</span></>}
        </p>
      )}

      {/* ── Tutor grid ─────────────────────────────────────────── */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : tutors.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="font-display text-xl font-semibold mb-2">No tutors found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your filters or search term.</p>
          <Button variant="outline" onClick={clearFilters}>Clear all filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TutorsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ── Hero header ──────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b bg-gradient-to-br from-background via-background to-muted">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 left-1/4 w-48 h-48 rounded-full bg-accent/10 blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  <TrendingUp className="w-3 h-3" /> Live tutors
                </span>
              </div>
              <h1 className="font-display text-4xl font-bold mb-2 tracking-tight">
                Find Your Tutor
              </h1>
              <p className="text-muted-foreground text-base">
                Browse expert tutors across all subjects — book in minutes
              </p>
            </div>

            <div className="flex gap-3 shrink-0">
              <div className="flex flex-col items-center px-4 py-2.5 rounded-xl border border-border bg-background/80 backdrop-blur-sm min-w-[72px]">
                <span className="font-bold text-xl text-primary leading-none">50+</span>
                <span className="text-[11px] text-muted-foreground mt-0.5">Tutors</span>
              </div>
              <div className="flex flex-col items-center px-4 py-2.5 rounded-xl border border-border bg-background/80 backdrop-blur-sm min-w-[72px]">
                <span className="font-bold text-xl text-primary leading-none">8</span>
                <span className="text-[11px] text-muted-foreground mt-0.5">Subjects</span>
              </div>
              <div className="flex flex-col items-center px-4 py-2.5 rounded-xl border border-border bg-background/80 backdrop-blur-sm min-w-[72px]">
                <div className="flex items-center gap-0.5">
                  <span className="font-bold text-xl text-primary leading-none">4.8</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mb-0.5" />
                </div>
                <span className="text-[11px] text-muted-foreground mt-0.5">Avg Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }>
        <TutorsBrowser />
      </Suspense>

      <Footer />
    </div>
  );
}