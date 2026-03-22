import Link from "next/link";
import { Search, Star, Users, BookOpen, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const FEATURED_STATS = [
  { label: "Expert Tutors", value: "500+", icon: Users },
  { label: "Sessions Completed", value: "12,000+", icon: BookOpen },
  { label: "Average Rating", value: "4.8★", icon: Star },
];

const CATEGORIES = [
  { name: "Mathematics", icon: "📐", count: "48 tutors" },
  { name: "Programming", icon: "💻", count: "63 tutors" },
  { name: "Languages", icon: "🌍", count: "91 tutors" },
  { name: "Science", icon: "🔬", count: "37 tutors" },
  { name: "Music", icon: "🎵", count: "29 tutors" },
  { name: "Design", icon: "🎨", count: "22 tutors" },
  { name: "Business", icon: "📊", count: "44 tutors" },
  { name: "History", icon: "📚", count: "18 tutors" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Find Your Tutor", desc: "Browse profiles, read reviews, and filter by subject, price, and availability." },
  { step: "02", title: "Book a Session", desc: "Pick a time that works for you and book instantly. No waiting, no friction." },
  { step: "03", title: "Learn & Grow", desc: "Attend your session and leave a review to help others find great tutors." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6 animate-fade-in">
              <Star className="w-4 h-4 fill-primary" />
              Trusted by 10,000+ learners worldwide
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] mb-6 animate-fade-in-delay-1">
              Learn Anything,{" "}
              <span className="text-primary italic">From Anyone</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl animate-fade-in-delay-2">
              Connect with expert tutors in 50+ subjects. Book sessions instantly and take control of your learning journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-3">
              <Button asChild size="xl" className="shadow-lg shadow-primary/30">
                <Link href="/tutors">
                  Find a Tutor <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/register?role=TUTOR">Become a Tutor</Link>
              </Button>
            </div>

            {/* Trust signals */}
            <div className="flex items-center gap-6 mt-10 text-sm text-muted-foreground animate-fade-in-delay-3">
              {["No subscription required", "Book in 60 seconds", "Instant confirmation"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-foreground text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8">
            {FEATURED_STATS.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex justify-center mb-2">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="font-display text-3xl font-bold text-white">{value}</p>
                <p className="text-sm text-white/60 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Browse by Subject</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From mathematics to music, find an expert in any field you want to master.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/tutors?category=${cat.name}`}
                className="group p-5 rounded-xl border bg-white hover:border-primary hover:shadow-md transition-all duration-200 text-center"
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <p className="font-semibold text-sm group-hover:text-primary transition-colors">{cat.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title mb-4">How SkillBridge Works</h2>
            <p className="text-muted-foreground">Three simple steps to start learning</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="text-6xl font-display font-bold text-primary/10 mb-4">{step}</div>
                <h3 className="font-display font-semibold text-xl mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="section-title mb-4">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of learners who have already found their perfect tutor on SkillBridge.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/register">Get Started Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/tutors">Browse Tutors</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
