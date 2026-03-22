"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, BookOpen, Users, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { categoriesApi } from "@/lib/api";
import type { Category } from "@/types";

const CAT_CONFIG: Record<string, { color: string; bg: string; border: string; icon: string; cover: string }> = {
  Mathematics: {
    color: "text-violet-700 dark:text-violet-300",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800",
    icon: "🔢",
    cover: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=200&fit=crop",
  },
  Programming: {
    color: "text-sky-700 dark:text-sky-300",
    bg: "bg-sky-50 dark:bg-sky-950/30",
    border: "border-sky-200 dark:border-sky-800",
    icon: "💻",
    cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
  },
  Languages: {
    color: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    icon: "🌍",
    cover: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=200&fit=crop",
  },
  Science: {
    color: "text-cyan-700 dark:text-cyan-300",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    border: "border-cyan-200 dark:border-cyan-800",
    icon: "🔬",
    cover: "https://images.unsplash.com/photo-1532094349884-543559ce09f9?w=400&h=200&fit=crop",
  },
  Music: {
    color: "text-pink-700 dark:text-pink-300",
    bg: "bg-pink-50 dark:bg-pink-950/30",
    border: "border-pink-200 dark:border-pink-800",
    icon: "🎵",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=200&fit=crop",
  },
  Design: {
    color: "text-orange-700 dark:text-orange-300",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-200 dark:border-orange-800",
    icon: "🎨",
    cover: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop",
  },
  Business: {
    color: "text-amber-700 dark:text-amber-300",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    icon: "📊",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
  },
  History: {
    color: "text-rose-700 dark:text-rose-300",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    border: "border-rose-200 dark:border-rose-800",
    icon: "📜",
    cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=200&fit=crop",
  },
};

const DEFAULT_CONFIG = {
  color: "text-muted-foreground",
  bg: "bg-muted/40",
  border: "border-border",
  icon: "📚",
  cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=200&fit=crop",
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoriesApi.getAll()
      .then(setCategories)
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b bg-gradient-to-br from-background via-background to-muted">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-1/4 w-56 h-56 rounded-full bg-accent/10 blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
            <BookOpen className="w-3 h-3" /> All Subjects
          </div>
          <h1 className="font-display text-4xl font-bold mb-3 tracking-tight">
            Browse by Category
          </h1>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Find expert tutors in your subject — from Mathematics to Music, we've got you covered.
          </p>
        </div>
      </div>

      {/* ── Category grid ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => {
              const cfg = CAT_CONFIG[cat.name] || DEFAULT_CONFIG;
              return (
                <Link
                  key={cat.id}
                  href={`/tutors?category=${cat.name}`}
                  className={`group rounded-2xl border ${cfg.border} ${cfg.bg} overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1`}
                >
                  {/* Cover */}
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={cfg.cover}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-2xl">{cat.icon || cfg.icon}</span>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <h3 className={`font-display font-semibold text-base mb-1 ${cfg.color}`}>
                      {cat.name}
                    </h3>
                    {cat.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {cat.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      {cat._count?.tutors !== undefined && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />
                          {cat._count.tutors} tutor{cat._count.tutors !== 1 ? "s" : ""}
                        </span>
                      )}
                      <span className={`flex items-center gap-1 text-xs font-medium ${cfg.color} ml-auto`}>
                        Explore <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}