import Link from "next/link";
import { GraduationCap, Users, Star, BookOpen, Target, Heart, Zap, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const STATS = [
  { label: "Expert Tutors", value: "50+", icon: Users },
  { label: "Subjects Covered", value: "8", icon: BookOpen },
  { label: "Avg Rating", value: "4.8★", icon: Star },
  { label: "Sessions Booked", value: "1,200+", icon: Target },
];

const VALUES = [
  {
    icon: Heart,
    title: "Student-First",
    desc: "Every decision we make puts the learner at the center. Your growth is our mission.",
    color: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
  },
  {
    icon: Star,
    title: "Quality Tutors",
    desc: "Every tutor is verified and reviewed. We only work with the best educators.",
    color: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  },
  {
    icon: Zap,
    title: "Book Instantly",
    desc: "No waiting, no back-and-forth. Find your tutor and book a session in minutes.",
    color: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
  },
  {
    icon: Target,
    title: "Any Subject",
    desc: "From Calculus to Guitar, from Spanish to UI/UX — we cover it all.",
    color: "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400",
  },
];

const TEAM = [
  { name: "Sarah Chen", role: "Mathematics Tutor", avatar: "https://i.pravatar.cc/80?img=47" },
  { name: "James Wright", role: "Programming Tutor", avatar: "https://i.pravatar.cc/80?img=11" },
  { name: "Maria Garcia", role: "Languages Tutor", avatar: "https://i.pravatar.cc/80?img=5" },
  { name: "David Kim", role: "Music Tutor", avatar: "https://i.pravatar.cc/80?img=68" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-background via-background to-muted">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 rounded-full bg-accent/8 blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-5">
            <GraduationCap className="w-3 h-3" /> Our Story
          </div>
          <h1 className="font-display text-5xl font-bold mb-4 tracking-tight">
            Learning, Reimagined
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            SkillBridge connects passionate learners with world-class tutors.
            We believe great education should be accessible, personal, and flexible.
          </p>
          <div className="flex items-center justify-center gap-3 mt-8">
            <Button asChild size="lg">
              <Link href="/tutors">Find a Tutor <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/register">Become a Tutor</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <section className="border-b bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="font-display text-3xl font-bold text-foreground">{value}</p>
                <p className="text-sm text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We started SkillBridge with a simple belief — everyone deserves access to a great teacher.
              Whether you're struggling with algebra, learning a new language, or picking up the guitar,
              the right tutor can change everything.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our platform makes it easy to find, vet, and book expert tutors across all subjects.
              Every tutor on SkillBridge is reviewed, rated, and ready to help you grow.
            </p>
            <Button asChild variant="outline">
              <Link href="/tutors">Browse All Tutors <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>

          {/* Visual grid */}
          <div className="grid grid-cols-2 gap-3">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop"
              alt="Students learning"
              className="rounded-2xl object-cover w-full h-40"
            />
            <img
              src="https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop"
              alt="Mathematics"
              className="rounded-2xl object-cover w-full h-40 mt-6"
            />
            <img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop"
              alt="Programming"
              className="rounded-2xl object-cover w-full h-40 -mt-6"
            />
            <img
              src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=200&fit=crop"
              alt="Music"
              className="rounded-2xl object-cover w-full h-40"
            />
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────── */}
      <section className="bg-muted/30 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold mb-2">What We Stand For</h2>
            <p className="text-muted-foreground">The values that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-background rounded-2xl border border-border p-6 hover:shadow-md transition-shadow">
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-base mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured tutors ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold mb-2">Meet Our Tutors</h2>
          <p className="text-muted-foreground">World-class educators, ready to help you succeed</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {TEAM.map(({ name, role, avatar }) => (
            <div key={name} className="flex flex-col items-center gap-2 text-center">
              <img
                src={avatar}
                alt={name}
                className="w-16 h-16 rounded-full object-cover border-2 border-border shadow-md"
              />
              <p className="font-semibold text-sm">{name}</p>
              <p className="text-xs text-muted-foreground">{role}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild>
            <Link href="/tutors">View All Tutors <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="border-t bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-display text-3xl font-bold mb-3">Ready to Start Learning?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
            Join thousands of students already learning with SkillBridge tutors.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link href="/register">Get Started Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/tutors">Browse Tutors</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}