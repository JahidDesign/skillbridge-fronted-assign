"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { GraduationCap, Eye, EyeOff, Loader2, BookOpen, Briefcase } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

function RegisterForm() {
  const { register } = useAuth();
  const params = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: (params.get("role") as "STUDENT" | "TUTOR") || "STUDENT",
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast({ title: "Account created! Welcome to SkillBridge 🎓" });
    } catch (err: any) {
      toast({ title: "Registration failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-8">
      <h1 className="font-display text-2xl font-bold mb-1">Create your account</h1>
      <p className="text-muted-foreground text-sm mb-6">Start your learning journey today</p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { role: "STUDENT", label: "I want to learn", icon: BookOpen, desc: "Book sessions with tutors" },
          { role: "TUTOR", label: "I want to teach", icon: Briefcase, desc: "Share your expertise" },
        ].map(({ role, label, icon: Icon, desc }) => (
          <button
            key={role}
            type="button"
            onClick={() => set("role", role)}
            className={cn(
              "p-4 rounded-xl border-2 text-left transition-all",
              form.role === role ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
            )}
          >
            <Icon className={cn("w-5 h-5 mb-2", form.role === role ? "text-primary" : "text-muted-foreground")} />
            <p className="text-sm font-semibold">{label}</p>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Jane Smith" value={form.name}
            onChange={(e) => set("name", e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" value={form.email}
            onChange={(e) => set("email", e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input id="password" type={showPw ? "text" : "password"} placeholder="Min. 6 characters"
              value={form.password} onChange={(e) => set("password", e.target.value)} minLength={6} required />
            <button type="button" onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Create Account as {form.role === "STUDENT" ? "Student" : "Tutor"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-2xl">Skill<span className="text-primary">Bridge</span></span>
          </Link>
        </div>
        <Suspense fallback={
          <div className="bg-white rounded-2xl border shadow-sm p-8 flex items-center justify-center h-64">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        }>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
