"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { getAvatarUrl } from "@/lib/utils";
import Image from "next/image";

export default function StudentProfilePage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">My Profile</h1>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-5 mb-6">
            <Image
              src={user.avatar || getAvatarUrl(user.name)}
              alt={user.name}
              width={80} height={80}
              className="rounded-2xl border-2 border-border"
            />
            <div>
              <h2 className="font-display text-xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground text-sm">{user.email}</p>
              <Badge variant="info" className="mt-1">Student</Badge>
            </div>
          </div>

          {editing ? (
            <div className="space-y-4 max-w-sm">
              <div className="space-y-1.5">
                <Label>Full Name</Label>
                <Input defaultValue={user.name} />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input defaultValue={user.email} type="email" />
              </div>
              <div className="flex gap-3">
                <Button onClick={() => setEditing(false)}>Save Changes</Button>
                <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 max-w-sm">
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Role</p>
                <p className="font-medium capitalize">{user.role.toLowerCase()}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setEditing(true)}>Edit Profile</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
