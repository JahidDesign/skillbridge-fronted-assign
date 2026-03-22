"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { tutorApi, categoriesApi } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

export default function TutorProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    bio: "",
    hourlyRate: "",
    experience: "",
    categoryIds: [] as string[],
  });

  useEffect(() => {
    Promise.all([tutorApi.getProfile(), categoriesApi.getAll()])
      .then(([p, cats]) => {
        setProfile(p);
        setCategories(cats);
        setForm({
          bio: p.bio || "",
          hourlyRate: String(p.hourlyRate),
          experience: String(p.experience),
          categoryIds: p.categories.map((c: any) => c.categoryId),
        });
      })
      .catch(() => toast({ title: "Failed to load profile", variant: "destructive" }))
      .finally(() => setLoading(false));
  }, []);

  const toggleCategory = (id: string) => {
    setForm((f) => ({
      ...f,
      categoryIds: f.categoryIds.includes(id)
        ? f.categoryIds.filter((c) => c !== id)
        : [...f.categoryIds, id],
    }));
  };

  const save = async () => {
    setSaving(true);
    try {
      await tutorApi.updateProfile({
        bio: form.bio,
        hourlyRate: parseFloat(form.hourlyRate),
        experience: parseInt(form.experience),
        categoryIds: form.categoryIds,
      });
      toast({ title: "Profile updated! ✅" });
    } catch (err: any) {
      toast({ title: "Failed to save", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">My Tutor Profile</h1>
        <Button onClick={save} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <Label>Bio</Label>
            <Textarea
              placeholder="Tell students about your background, teaching style, and expertise..."
              rows={5}
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Hourly Rate (USD)</Label>
              <Input
                type="number" min="0" step="5"
                placeholder="e.g. 50"
                value={form.hourlyRate}
                onChange={(e) => setForm((f) => ({ ...f, hourlyRate: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Years of Experience</Label>
              <Input
                type="number" min="0"
                placeholder="e.g. 5"
                value={form.experience}
                onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Subjects You Teach</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const selected = form.categoryIds.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium border-2 transition-all",
                    selected
                      ? "border-primary bg-primary text-white"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  {cat.icon} {cat.name}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
